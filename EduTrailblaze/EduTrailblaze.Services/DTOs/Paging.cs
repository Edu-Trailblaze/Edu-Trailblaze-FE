namespace EduTrailblaze.Services.DTOs
{
    public class Paging
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string? Sort { get; set; } // Field name
        public string? SortDirection { get; set; } // ASC or DESC
    }

    public class PaginatedList<T>
    {
        public List<T> Items { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);

        public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
        {
            Items = items;
            TotalCount = count;
            PageIndex = pageIndex;
            PageSize = pageSize;
        }

        public bool HasPreviousPage => PageIndex > 1;
        public bool HasNextPage => PageIndex < TotalPages;
    }
}
