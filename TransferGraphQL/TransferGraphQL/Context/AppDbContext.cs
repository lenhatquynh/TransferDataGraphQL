using System;
using Microsoft.EntityFrameworkCore;
using TransferGraphQL.Models;

namespace TransferGraphQL.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Resident> Residents { get; set; }
        public DbSet<ProgressNote> ProgressNotes { get; set; }

    }
}

