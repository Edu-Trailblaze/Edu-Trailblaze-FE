namespace EduTrailblaze.API.Domain.Interfaces
{
    public interface IDateTracking
    {
        DateTimeOffset CreatedAt { get; set; }
        DateTimeOffset? UpdatedAt { get; set; }
    }
}
