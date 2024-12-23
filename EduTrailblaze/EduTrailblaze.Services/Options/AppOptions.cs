namespace EduTrailblaze.Services.Options
{
    public class EmailConfig
    {
        public string FromEmail { get; set; }
    }

    public class RedisConfig
    {
        public string Host { get; set; }
        public string Port { get; set; }
        public string Password { get; set; }
        public string Ssl { get; set; }
        public string AbortOnConnectFail { get; set; }
    }

}
