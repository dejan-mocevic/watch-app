using Microsoft.EntityFrameworkCore;

namespace WatchesAPI.Data
{
    public class DataContext : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Watch> Watches { get; set; }

        public DbSet<WatchStyle> WatchStyles { get; set; }

        public DbSet<User> Users { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Watch>().HasRequired<WatchStyle>(ws => ws.WatchStyle).WithMany(w => w.Watch).HasForeignKey<int>(i => i.StyleId);
        //}

    }

    
}
