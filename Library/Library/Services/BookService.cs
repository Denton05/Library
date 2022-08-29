using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.Data;
using Library.Models;
using Microsoft.EntityFrameworkCore;

namespace Library.Services
{
	public class BookService : IBookService
	{
		#region  Fields

		private readonly DataContext _context;

		#endregion

		#region Construction

		public BookService(DataContext context) => _context = context;

		#endregion

		#region Private Methods

		private IQueryable<Book> AvailableBooks() => _context.Books.Where(b => !b.IsDeleted);

		#endregion

		#region Public Methods

		public async Task Add(Book book)
		{
			_context.Books.Add(book);
			await _context.SaveChangesAsync();
		}

		public async Task Delete(Book book)
		{
			book.IsDeleted = true;
			await _context.SaveChangesAsync();
		}

		public async Task<Book> Get(int id) => await AvailableBooks().SingleOrDefaultAsync(b => b.Id == id);

		public async Task<IEnumerable<Book>> GetAll() => await AvailableBooks().ToListAsync();

		public async Task Update(Book storedBook, Book book)
		{
			storedBook.Name = book.Name;
			storedBook.Year = book.Year;
			storedBook.Author = book.Author;
			storedBook.Genre = book.Genre;
			await _context.SaveChangesAsync();
		}

		#endregion
	}
}
