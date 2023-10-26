using System;
namespace TransferGraphQL.Models
{
    public class Resident
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public Guid FacilityId { get; set; }
        public Facility? Facility { get; set; }
    }
    public class ResidentVM
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Dob { get; set; }
        public Guid FacilityId { get; set; }
    }
}

