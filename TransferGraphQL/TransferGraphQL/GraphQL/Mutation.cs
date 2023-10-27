using System;
using TransferGraphQL.Context;
using TransferGraphQL.Models;
using Microsoft.EntityFrameworkCore;

namespace TransferGraphQL.GraphQL
{
	public class Mutation
	{
        private readonly AppDbContext _context;
        public Mutation(AppDbContext context)
        {
            _context = context;
        }

        //Facility
        public async Task<Facility> UpdateFacility(Guid id, FacilityVM facilityVM)
        {
            var facility = await _context.Facilities.FirstOrDefaultAsync(f => f.Id == id);
            if (facility == null) throw new Exception($"Facility with ID {id} not found!");

            facility.Name = facilityVM.Name;
            facility.Address = facilityVM.Address;
            _context.Facilities.Update(facility);
            _context.SaveChanges();

            return facility;
        }
        public async Task<Facility> AddFacility(FacilityVM facilityVM)
        {
            var facility = new Facility()
            {
                Id = Guid.NewGuid(),
                Name = facilityVM.Name,
                Address = facilityVM.Address
            };
            await _context.Facilities.AddAsync(facility);
            await _context.SaveChangesAsync();
            return facility;
        }
        public async Task<Facility> DeleteFacility(Guid id)
        {
            var facility = _context.Facilities.FirstOrDefault(f => f.Id == id);

            if (facility == null)
            {
                throw new Exception($"Facility with ID {id} not found!");
            }

            _context.Facilities.Remove(facility);
            _context.SaveChanges();

            return facility;
        }

        //Resident
        public Resident UpdateResident(Guid id, ResidentVM residentVM)
        {
            var resident = _context.Residents.FirstOrDefault(f => f.Id == id);
            var facility = _context.Facilities.FirstOrDefault(f => f.Id == residentVM.FacilityId);

            if (facility == null) throw new Exception($"Facility with ID {residentVM.FacilityId} is not existed!");
            if (resident == null) throw new Exception($"Resident with ID {id} not found!");

            resident.FirstName = residentVM.FirstName;
            resident.LastName = residentVM.LastName;
            resident.Dob = residentVM.Dob;
            resident.FacilityId = residentVM.FacilityId;
            _context.Residents.Update(resident);
            _context.SaveChanges();
            resident.Facility = facility;
            return resident;
        }

        public async Task<Resident> AddResident(ResidentVM residentVM)
        {
            var facility = await _context.Facilities.FirstOrDefaultAsync(f => f.Id == residentVM.FacilityId);

            if (facility == null) throw new Exception($"Facility with ID {residentVM.FacilityId} is not existed!");

            var resident = new Resident()
            {
                Id = Guid.NewGuid(),
                FirstName = residentVM.FirstName,
                LastName = residentVM.LastName,
                Dob = residentVM.Dob,
                FacilityId = residentVM.FacilityId,
            };

            await _context.Residents.AddAsync(resident);
            await _context.SaveChangesAsync();
            resident.Facility = facility;
            return resident;
        }

        public async Task<Resident> DeleteResident(Guid id)
        {
            var resident = await _context.Residents.Include(r => r.Facility).FirstOrDefaultAsync(f => f.Id == id);

            if (resident == null) throw new Exception($"Resident with ID {id} not found!");

            _context.Residents.Remove(resident);
            _context.SaveChanges();

            return resident;
        }

        //ProgressNote
        public async Task<ProgressNote> UpdateProgressNote(Guid id, ProgressNoteVM progressNoteVM)
        {
            var progressNote = await _context.ProgressNotes.FirstOrDefaultAsync(f => f.Id == id);
            var resident = await _context.Residents.FirstOrDefaultAsync(f => f.Id == progressNoteVM.ResidentId);

            if (progressNote == null) throw new Exception($"ProgressNote with ID {id} not found!");
            if (resident == null) throw new Exception($"Resident with ID {progressNoteVM.ResidentId} is not existed!");

            progressNote.Content = progressNoteVM.Content;
            progressNote.Type = progressNoteVM.Type;
            progressNote.CreatedDate = progressNoteVM.CreatedDate;
            progressNote.ResidentId = progressNoteVM.ResidentId;

            _context.ProgressNotes.Update(progressNote);
            _context.SaveChanges();
            progressNote.Resident = resident;

            return progressNote;
        }

        public async Task<ProgressNote> AddProgressNote(ProgressNoteVM progressNoteVM)
        {
            var resident = await _context.Residents.FirstOrDefaultAsync(f => f.Id == progressNoteVM.ResidentId);

            if (resident == null) throw new Exception($"Resident with ID {progressNoteVM.ResidentId} is not existed!");

            var progressNote = new ProgressNote()
            {
                Id = Guid.NewGuid(),
                Content = progressNoteVM.Content,
                Type = progressNoteVM.Content,
                CreatedDate = progressNoteVM.CreatedDate,
                ResidentId = progressNoteVM.ResidentId,
            };

            await _context.ProgressNotes.AddAsync(progressNote);
            await _context.SaveChangesAsync();
            progressNote.Resident = resident;
            return progressNote;
        }

        public async Task<ProgressNote> DeleteProgressNote(Guid id)
        {
            var progressNote = await _context.ProgressNotes.Include(r => r.Resident).ThenInclude(p => p.Facility).FirstOrDefaultAsync(f => f.Id == id);

            if (progressNote == null) throw new Exception($"ProgressNote with ID {id} not found!");

            _context.ProgressNotes.Remove(progressNote);
            _context.SaveChanges();

            return progressNote;
        }
    }
}

