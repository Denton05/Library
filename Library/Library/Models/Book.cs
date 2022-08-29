using System.ComponentModel.DataAnnotations;

namespace Library.Models
{
	public class Book
	{
		#region Properties

		[Required]
		public string Author { get; set; }

		[Required]
		public string Genre { get; set; }

		public int Id { get; set; }

		public bool IsDeleted { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
		public int Year { get; set; }

		#endregion
	}
}
