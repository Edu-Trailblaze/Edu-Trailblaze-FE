using PayPal.Api;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace EduTrailblaze.Services
{
    internal class PayPalService
    {
        private readonly string _clientId;
        private readonly string _clientSecret;

        public PayPalService(IConfiguration configuration)
        {
            // Retrieve PayPal credentials from configuration
            _clientId = configuration["PayPal:ClientID"];
            _clientSecret = configuration["PayPal:Secret"];
        }

        // Method to get API Context
        private APIContext GetAPIContext()
        {
            var config = new Dictionary<string, string>
            {
                { "mode", "sandbox" } // Change to "live" for production
            };

            string accessToken = new OAuthTokenCredential(_clientId, _clientSecret, config).GetAccessToken();
            return new APIContext(accessToken);
        }

        // Method to Create a Payment
        public string CreatePayment(string returnUrl, string cancelUrl, decimal total, string currency = "USD")
        {
            var apiContext = GetAPIContext();

            // Create a new payment object
            var payment = new Payment
            {
                intent = "sale",
                payer = new Payer { payment_method = "paypal" },
                transactions = new List<Transaction>
                {
                    new Transaction
                    {
                        description = "Purchase from EduTrailblaze",
                        invoice_number = Guid.NewGuid().ToString(),
                        amount = new Amount
                        {
                            currency = currency,
                            total = total.ToString("F2") // Format the total as a string
                        }
                    }
                },
                redirect_urls = new RedirectUrls
                {
                    cancel_url = cancelUrl,
                    return_url = returnUrl
                }
            };

            // Create payment on PayPal
            var createdPayment = payment.Create(apiContext);

            // Return the approval URL
            return createdPayment.links.First(link => link.rel == "approval_url").href;
        }

        // Method to Execute a Payment
        public Payment ExecutePayment(string paymentId, string payerId)
        {
            var apiContext = GetAPIContext();

            var paymentExecution = new PaymentExecution { payer_id = payerId };
            var payment = new Payment { id = paymentId };

            // Execute the payment
            return payment.Execute(apiContext, paymentExecution);
        }
    }
}
