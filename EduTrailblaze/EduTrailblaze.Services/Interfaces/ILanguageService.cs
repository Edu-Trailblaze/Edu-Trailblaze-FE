using EduTrailblaze.Entities;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ILanguageService
    {
        Task<Language?> GetLanguage(int languageId);

        Task<IEnumerable<Language>> GetLanguages();

        Task AddLanguage(Language language);

        Task UpdateLanguage(Language language);

        Task DeleteLanguage(Language language);
    }
}
