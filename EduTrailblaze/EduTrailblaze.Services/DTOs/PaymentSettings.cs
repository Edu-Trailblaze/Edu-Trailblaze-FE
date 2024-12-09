namespace EduTrailblaze.Services.DTOs
{
    public class VNPAYSettings
    {
        public string VnPayUrl { get; set; }
        public string VnPayReturnUrl { get; set; }
        public string VnPayQueryUrl { get; set; }
        public string VnPayTmnCode { get; set; }
        public string VnPayHashSecret { get; set; }
    }

    public class MoMoSettings
    {
        public string MoMoEndpoint { get; set; }
        public string MoMoSecretKey { get; set; }
        public string MoMoAccessKey { get; set; }
        public string MoMoReturnUrl { get; set; }
        public string MoMoNotifyUrl { get; set; }
        public string MoMoPartnerCode { get; set; }
        public string MoMoRequestType { get; set; }
        public string MoMoPartnerName { get; set; }
        public string MoMoStoreId { get; set; }
        public string MoMoLang { get; set; }
        public string MoMoExtraData { get; set; }
    }
}