using EduTrailblaze.Entities;
using EduTrailblaze.Services.DTOs;

namespace EduTrailblaze.Services.Interfaces
{
    public interface ILanguageService
    {
        Task<Language?> GetLanguage(int languageId);

        Task<IEnumerable<Language>> GetLanguages();

        Task AddLanguage(Language language);

        Task UpdateLanguage(Language language);

        Task DeleteLanguage(Language language);

        Task UpdateLanguage(UpdateLanguageRequest language);

        Task AddLanguage(CreateLanguageRequest language);
    }
}
