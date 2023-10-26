using System;
namespace TransferGraphQL.Models
{
    public class ProgressNote
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid ResidentId { get; set; }
        public Resident? Resident { get; set; }
    }
    public class ProgressNoteVM
    {
        public string Content { get; set; }
        public string Type { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid ResidentId { get; set; }
    }
}

