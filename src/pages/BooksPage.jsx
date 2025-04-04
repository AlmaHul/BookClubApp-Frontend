import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/booksPage.css";

function BooksPage() {
 
  const [searchTitle, setSearchTitle] = useState("");
  
  const [searchResults, setSearchResults] = useState([]);
  
  const [myBooks, setMyBooks] = useState([]);
  
  const [message, setMessage] = useState("");
 
  const [editBook, setEditBook] = useState(null);
  
  const [viewBook, setViewBook] = useState(null);
  
  const token = localStorage.getItem("token");
  console.log("JWT Token:", token);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBooks();
  }, []);

  
  const fetchMyBooks = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMyBooks(data);
    } catch (err) {
      setMessage("❌ Failed to fetch your books");
    }
  };

const handleSearch = async () => {
  setMessage("");
  try {
    const res = await fetch("http://localhost:8080/api/books/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ title: searchTitle }),
    });

    console.log("API response status:", res.status); 

    const responseData = await res.json();
    console.log("API response body:", responseData);

    if (!res.ok) {
      setMessage("❌ " + (responseData.error || "Search failed"));
      setSearchResults([]);
      return;
    }

    setSearchResults(responseData.results);
  } catch (err) {
    console.error("Fetch error:", err);
    setMessage("❌ An error occurred during search");
  }
};





  const handleAddBook = async (book) => {
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage("❌ " + (errorData.error || "Failed to add book"));
        return;
      }

      const result = await res.json();
      setMessage("✅ Book added: " + result.book.title);
      fetchMyBooks(); // Refresh list
    } catch (err) {
      setMessage("❌ Error adding book");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMessage("🗑️ " + data.message);
      fetchMyBooks();
    } catch (err) {
      setMessage("❌ Failed to delete book");
    }
  };

  
  const handleEditSave = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/books/${editBook.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editBook),
      });
      const data = await res.json();
      setMessage("✏️ " + data.message);
      setEditBook(null); // Exit edit mode
      fetchMyBooks();
    } catch (err) {
      setMessage("❌ Failed to update book");
    }
  };

  return (
      <div className="main-content">
    <div className="book-search">

        <h2 className="books-title">📚 Search & Manage Your Books</h2>

        {/* Search Input Section */}
        <div className="search-book">
          <input
            type="text"
            placeholder="📖 Enter exact book title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSearch}
            className="search-book"
          >
            🔍 Search
          </button>
        </div>

       
        {message && <p className="mb-4 text-sm text-gray-700">{message}</p>}

      
        {searchResults.length > 0 && (
          <div className="results-box">
            <h3 className="text-lg font-semibold mb-3 text-purple-600">🎯 Exact Matches:</h3>
            <ul className="list-book">
              {searchResults.map((book, i) => (
                <li key={i} className="border rounded p-4 bg-gray-100 shadow-sm">
                  <p className="font-bold text-purple-800">{book.title}</p>
                  <p className="text-sm text-gray-700">👤 {book.author}</p>
                  <p className="text-sm italic mb-2">{book.description}</p>
                  <button
                    onClick={() => handleAddBook(book)}
                    className="add-book"
                  >
                    ➕ Add this book
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

       
        <div className="my-books-box">
          <h3 className="text-lg font-semibold mb-3 text-purple-600">📚 My Books:</h3>
          <ul className="space-y-4">
            {myBooks.map((book) => (
              <li key={book.id} className="border rounded p-4 bg-gray-50 shadow-sm">
                {editBook?.id === book.id ? (
                 
                  <div className="edit-box">
                    <input
                      value={editBook.title}
                      onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                      className="w-full border p-1 rounded"
                    />
                    <input
                      value={editBook.author}
                      onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                      className="w-full border p-1 rounded"
                    />
                    <textarea
                      value={editBook.description}
                      onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
                      className="w-full border p-1 rounded"
                    />
                    <button onClick={handleEditSave} className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-sm">
                      💾 Save
                    </button>
                    <button onClick={() => setEditBook(null)} className="ml-2 text-sm text-red-500">Cancel</button>
                  </div>
                ) : viewBook?.id === book.id ? (
                  
                  <div>
                    <p className="font-bold text-purple-800">{book.title}</p>
                    <p className="text-sm text-gray-700">👤 {book.author}</p>
                    <p className="text-sm italic mb-2">{book.description}</p>
                    <button onClick={() => setViewBook(null)} className="text-sm text-blue-500 mt-2">Close</button>
                  </div>
                ) : (
                  
                  <>
                    <p className="font-bold text-purple-800">{book.title}</p>
                    <p className="text-sm text-gray-700">👤 {book.author}</p>
                    <p className="text-sm italic mb-2">{book.description}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditBook(book)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md text-sm"
                      >
                        🗑️ Delete
                      </button>
                      <button
                        onClick={() => setViewBook(book)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm"
                      >
                        🔍 View
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>


      </div>
    </div>
    </div>

  );
}

export default BooksPage;
