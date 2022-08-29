using System.Collections.Generic;
using System.Threading.Tasks;
using Library.Models;

namespace Library.Services
{
	public interface IBookService
	{
		Task Add(Book book);

		Task Delete(Book book);

		Task<Book> Get(int id);

		Task<IEnumerable<Book>> GetAll();

		Task Update(Book storedBook, Book book);
	}
}
