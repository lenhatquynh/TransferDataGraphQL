using System;
namespace TransferGraphQL.Models
{
    public class Facility
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
    public class FacilityVM
    {
        public string Name { get; set; }
        public string Address { get; set; }
    }
}

