import React, { useState } from "react";
import Constants from "../utilities/Constants";
import bookValidation from "../utilities/bookValidation";

export default function BookCreateForm(props) {
  const [formData, setFromData] = useState([]);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookToCreate = {
      id: 0,
      name: formData.name,
      year: parseInt(formData.year),
      author: formData.author,
      genre: formData.genre,
    };

    if (!bookValidation(formData)) return;

    const url = Constants.API_URL_BOOKS;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    props.onBookCreated(bookToCreate);
  };

  return (
    <div>
      <form className="w-100 px-5">
        <h1 className="mt-5">Create new book</h1>
        <div className="mt-5">
          <label className="h3 form-label">Book name</label>
          <input
            value={formData.name || ""}
            name="name"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <label className="h3 form-label">Book year</label>
          <input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={formData.year || ""}
            name="year"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <label className="h3 form-label">Book author</label>
          <input
            value={formData.author || ""}
            name="author"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <label className="h3 form-label">Book genre</label>
          <input
            value={formData.genre || ""}
            name="genre"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-dark btn-lg w-100 mt-5"
        >
          Submit
        </button>

        <button
          onClick={() => props.onBookCreated(null)}
          className="btn btn-secondary btn-lg w-100 mt-3"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
