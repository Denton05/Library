using System.Collections.Generic;
using System.Threading.Tasks;
using Library.Models;
using Library.Services;
using Microsoft.AspNetCore.Mvc;

namespace Library.Controllers
{
	[Route("/api/[controller]")]
	public class BooksController : Controller
	{
		#region  Fields

		private readonly IBookService _bookService;

		#endregion

		#region Construction

		public BooksController(IBookService bookService)
		{
			_bookService = bookService;
		}

		#endregion

		#region Public Methods

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(int id)
		{
			var book = await _bookService.Get(id);

			if(book == null) return NotFound();
			await _bookService.Delete(book);
			return Ok();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<Book>>> Get() => Ok(await _bookService.GetAll());

		[HttpGet("{id}")]
		public async Task<ActionResult<Book>> Get(int id)
		{
			var book = await _bookService.Get(id);

			if(book == null) return NotFound();
			return Ok(book);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] Book book)
		{
			if(!ModelState.IsValid) return BadRequest(ModelState);

			await _bookService.Add(book);
			return CreatedAtAction(nameof(Get), new {id = book.Id}, book);
		}

		[HttpPut]
		public async Task<IActionResult> Put([FromBody] Book book)
		{
			if(!ModelState.IsValid) return BadRequest(ModelState);

			var storedBook = await _bookService.Get(book.Id);
			if(storedBook == null) return NotFound();

			await _bookService.Update(storedBook, book);
			return Ok(storedBook);
		}

		#endregion
	}
}
