using System.Security.Cryptography;
using System.Text;

namespace Services.Helper
{
    public static class HashUtil
    {
        public static string HmacSHA256(string secretKey, string data)
        {
            byte[] secretKeyBytes = Encoding.UTF8.GetBytes(secretKey);
            byte[] dataBytes = Encoding.UTF8.GetBytes(data);
            using (var hmac = new HMACSHA256(secretKeyBytes))
            {
                var hashBytes = hmac.ComputeHash(dataBytes);
                string hex = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
                return hex;
            }
        }

        public static async Task<string> SendHttpRequest(string url, object payload)
        {
            using (var httpClient = new HttpClient())
            {
                var jsonPayload = Newtonsoft.Json.JsonConvert.SerializeObject(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
                var response = await httpClient.PostAsync(url, content);

                response.EnsureSuccessStatusCode();

                return await response.Content.ReadAsStringAsync();
            }
        }

        public static string GenerateRandomId(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var result = new char[length];

            for (int i = 0; i < length; i++)
            {
                result[i] = chars[random.Next(chars.Length)];
            }

            return new string(result);
        }
    }
}
