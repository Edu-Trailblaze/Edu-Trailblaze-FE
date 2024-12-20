using EduTrailblaze.Services.DTOs;
using EduTrailblaze.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Services.Helper;
using System.Web;

namespace EduTrailblaze.Services
{
    public class MoMoService : IMoMoService
    {
        private readonly IOrderService _orderService;
        private readonly IPaymentService _paymentService;
        private readonly MoMoSettings _momoSettings;

        public MoMoService(IOrderService orderService, IPaymentService paymentService, IConfiguration configuration)
        {
            _orderService = orderService;
            _paymentService = paymentService;
            _momoSettings = configuration.GetSection("MoMoSettings").Get<MoMoSettings>();
        }

        public async Task<string> CreatePaymentUrl(decimal amount, int orderId, int paymentId)
        {
            try
            {
                string requestId = Guid.NewGuid().ToString(); // Unique request ID
                string orderInfo = "EduTrailblaze"; // Order information
                // Ensure the amount is formatted correctly
                long formattedAmount = (long)(amount * 1000); // Convert to VND
                string customOrderId = "O-" + orderId.ToString() + "-" + Guid.NewGuid().ToString();

                // Create raw signature string
                string rawHash = $"accessKey={_momoSettings.MoMoAccessKey}&amount={formattedAmount}&extraData={_momoSettings.MoMoExtraData}&ipnUrl={_momoSettings.MoMoNotifyUrl}&orderId={customOrderId}&orderInfo={orderInfo}&partnerCode={_momoSettings.MoMoPartnerCode}&redirectUrl={_momoSettings.MoMoReturnUrl}&requestId={requestId}&requestType={_momoSettings.MoMoRequestType}&paymentId={paymentId}";
                string signature = HashUtil.HmacSHA256(_momoSettings.MoMoSecretKey, rawHash);

                // Build request payload
                var paymentRequest = new
                {
                    _momoSettings.MoMoPartnerCode,
                    _momoSettings.MoMoPartnerName,
                    _momoSettings.MoMoStoreId,
                    requestId,
                    amount = formattedAmount.ToString(),
                    orderId,
                    orderInfo,
                    redirectUrl = _momoSettings.MoMoReturnUrl,
                    ipnUrl = _momoSettings.MoMoNotifyUrl,
                    _momoSettings.MoMoExtraData,
                    _momoSettings.MoMoRequestType,
                    signature,
                    _momoSettings.MoMoLang,
                    paymentId // Custom field for PaymentId
                };

                // Send POST request to MoMo API
                string response = await HashUtil.SendHttpRequest(_momoSettings.MoMoEndpoint, paymentRequest);

                // Parse response and extract payment URL
                var jsonResponse = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(response);
                if (jsonResponse.ContainsKey("payUrl"))
                {
                    return jsonResponse["payUrl"].ToString();
                }
                else
                {
                    throw new Exception($"Error creating payment URL: {jsonResponse["message"]}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error processing payment: {ex.Message}", ex);
            }
        }



        public async Task<PaymentResponse> ValidatePaymentResponse(string queryString)
        {
            try
            {
                var queryParameters = HttpUtility.ParseQueryString(queryString);
                string requestId = queryParameters["requestId"];
                int orderId = int.Parse(queryParameters["orderId"].Split('-')[1]);
                string amount = queryParameters["amount"];
                string resultCode = queryParameters["resultCode"];
                string signature = queryParameters["signature"];
                int paymentId = int.Parse(queryParameters["paymentId"]);

                var order = await _orderService.GetOrder(orderId);
                if (order == null || order.OrderStatus != "Processing")
                {
                    return new PaymentResponse { IsSuccessful = false, RedirectUrl = "https://localhost:3000/reject" };
                }

                if (resultCode == "0") // MoMo Success Result Code
                {
                    UpdatePaymentRequest updatePaymentRequest = new()
                    {
                        PaymentId = paymentId,
                        PaymentStatus = "Success",
                    };

                    await _paymentService.UpdatePayment(updatePaymentRequest);

                    order.OrderStatus = "Completed";

                    await _orderService.UpdateOrder(order);

                    return new PaymentResponse
                    {
                        IsSuccessful = true,
                        RedirectUrl = $"https://localhost:3000/confirm?orderId={orderId}"
                    };
                }
                else
                {
                    UpdatePaymentRequest updatePaymentRequest = new()
                    {
                        PaymentId = paymentId,
                        PaymentStatus = "Failed",
                    };

                    await _paymentService.UpdatePayment(updatePaymentRequest);

                    return new PaymentResponse
                    {
                        IsSuccessful = false,
                        RedirectUrl = $"https://localhost:3000/reject?orderId={orderId}"
                    };
                }
            }
            catch (Exception ex)
            {
                return new PaymentResponse { IsSuccessful = false, RedirectUrl = "https://localhost:3000/reject" };
            }
        }
    }
}
