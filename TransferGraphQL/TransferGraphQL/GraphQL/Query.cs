using System;
using TransferGraphQL.Context;
using TransferGraphQL.Models;
using Microsoft.EntityFrameworkCore;

namespace TransferGraphQL.GraphQL
{
	public class Query
	{
        private readonly AppDbContext _context;
        public Query(AppDbContext context)
        {
            _context = context;
        }

        //Facility
        public List<Facility> GetFacilities()
        {
            return _context.Facilities.ToList();
        }
        public Facility GetFacility(Guid id)
        {
            var facility = _context.Facilities.FirstOrDefault(f => f.Id == id);
            if (facility == null) throw new Exception($"Facility with ID {id} is not existed!");
            return facility;
        }

        //Resident
        public List<Resident> GetResidents()
        {
            return _context.Residents.Include(r => r.Facility).ToList();
        }
        public Resident GetResident(Guid id)
        {
            var resident = _context.Residents.Include(r => r.Facility).FirstOrDefault(f => f.Id == id);
            if (resident == null) throw new Exception($"Resident with ID {id} is not existed!");
            return resident;
        }

        //ProgressNote
        public List<ProgressNote> GetProgressNotes()
        {
            return _context.ProgressNotes.Include(r => r.Resident).ThenInclude(p => p.Facility).ToList();
        }
        public ProgressNote GetProgressNote(Guid id)
        {
            var progressNote = _context.ProgressNotes.Include(r => r.Resident).ThenInclude(p => p.Facility).FirstOrDefault(f => f.Id == id);
            if (progressNote == null) throw new Exception($"ProgressNote with ID {id} is not existed!");
            return progressNote;
        }
    }
}

