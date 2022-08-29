using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Data
{
	public class DataContext : DbContext
	{
		#region Properties

		public DbSet<Book> Books { get; set; }

		#endregion

		#region Construction

		public DataContext(DbContextOptions options) : base(options)
		{
		}

		#endregion

		#region Private Methods

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Book>().HasData(new Book {Id = 1, Name = "Book 1", Year = 1980, Author = "Author 1", Genre = "Genre 1"});
			modelBuilder.Entity<Book>().HasData(new Book {Id = 2, Name = "Book 2", Year = 1980, Author = "Author 2", Genre = "Genre 2"});
			modelBuilder.Entity<Book>().HasData(new Book {Id = 3, Name = "Book 3", Year = 1980, Author = "Author 3", Genre = "Genre 3"});
		}

		#endregion
	}
}
