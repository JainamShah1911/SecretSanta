using Microsoft.EntityFrameworkCore;
using SecretSanta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecretSanta.Data
{
    public class SecretSantaContext : DbContext
    {
        public SecretSantaContext(DbContextOptions<SecretSantaContext> options)
            : base(options)
        {
        }

        public DbSet<Person> persons { get; set; }
       // public DbSet<Group> groups { get; set; }
    }
}
