namespace EduTrailblaze.Services.Helper
{
    public static class DateTimeHelper
    {
        public static DateTime GetVietnamTime()
        {
            TimeZoneInfo vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            DateTime vietnamTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, vietnamTimeZone);
            return vietnamTime;
        }
    }
}
