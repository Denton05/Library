import React, { useState } from "react";
import Constants from "./utilities/Constants";
import BookCreateForm from "./components/BookCreateForm";
import BookUpdateForm from "./components/BookUpdateForm";

export default function App() {
  const [books, setBooks] = useState([]);
  const [showingCreateNewBookForm, setShowingCreateNewBookForm] =
    useState(false);
  const [bookCurrentlyBeingUpdated, setBookCurrentlyBeingUpdated] =
    useState(null);

  function getBooks() {
    const url = Constants.API_URL_BOOKS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((bookFromServer) => {
        setBooks(bookFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  function deleteBook(id) {
    const url = Constants.API_URL_BOOKS + `/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onBookDeleted(id);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {showingCreateNewBookForm === false &&
            bookCurrentlyBeingUpdated === null && (
              <div>
                <h1 align="center">Library</h1>
                <div className="mt-5">
                  <button
                    onClick={getBooks}
                    className="btn btn-dark btn-lg w-100"
                  >
                    Get Books from server
                  </button>
                  <button
                    onClick={() => setShowingCreateNewBookForm(true)}
                    className="btn btn-secondary btn-lg w-100 mt-4"
                  >
                    Create new Book
                  </button>
                </div>
              </div>
            )}

          {books.length > 0 &&
            showingCreateNewBookForm === false &&
            bookCurrentlyBeingUpdated === null &&
            renderBooksTable()}

          {showingCreateNewBookForm && (
            <BookCreateForm onBookCreated={onBookCreated} />
          )}

          {bookCurrentlyBeingUpdated !== null && (
            <BookUpdateForm
              book={bookCurrentlyBeingUpdated}
              onBookUpdated={onBookUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );

  function renderBooksTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">BookId (PK)</th>
              <th scope="col">Name</th>
              <th scope="col">Year</th>
              <th scope="col">Author</th>
              <th scope="col">Genre</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.name}</td>
                <td>{book.year}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <button
                    onClick={() => setBookCurrentlyBeingUpdated(book)}
                    className="btn btn-dark bth-lg mx-3 my-3"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete the book named "${book.name}"?`
                        )
                      )
                        deleteBook(book.id);
                    }}
                    className="btn btn-secondary bth-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function onBookCreated(createdBook) {
    setShowingCreateNewBookForm(false);

    if (createdBook === null) return;

    alert(
      `Book successfully created. After clicking OK, your new book named "${createdBook.name}" will show up in the table below.`
    );

    getBooks();
  }

  function onBookUpdated(updatedBook) {
    setBookCurrentlyBeingUpdated(null);

    if (updatedBook === null) {
      return;
    }

    let booksCopy = [...books];

    const index = booksCopy.findIndex((booksCopyBook, currentIndex) => {
      if (booksCopyBook.id === updatedBook.id) {
        return true;
      }
    });

    if (index !== -1) booksCopy[index] = updatedBook;

    setBooks(booksCopy);

    alert(
      `Book successfully updated. After clicking OK, look for the book with the name "${updatedBook.name}" in the table bellow to see the updates.`
    );
  }

  function onBookDeleted(deletedBookId) {
    let booksCopy = [...books];

    const index = booksCopy.findIndex((booksCopyBook, currentIndex) => {
      if (booksCopyBook.id === deletedBookId) {
        return true;
      }
    });

    if (index !== -1) booksCopy.splice(index, 1);

    setBooks(booksCopy);

    alert(
      `Book successfully deleted. After clicking OK, look at the table below to see your book disappear.`
    );
  }
}
