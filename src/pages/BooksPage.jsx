import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BooksPage() {
  // State for search input
  const [searchTitle, setSearchTitle] = useState("");
  // State to store search results from Libris
  const [searchResults, setSearchResults] = useState([]);
  // State to store books saved by the logged-in user
  const [myBooks, setMyBooks] = useState([]);
  // State for showing messages to the user
  const [message, setMessage] = useState("");
  // State for book currently being edited
  const [editBook, setEditBook] = useState(null);
  // State for book currently being viewed in detail
  const [viewBook, setViewBook] = useState(null);
  // Retrieve JWT token from local storage
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Load user's books on first render
  useEffect(() => {
    fetchMyBooks();
  }, []);

  // Fetch books that belong to the current user
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

  // Handle search request for books using Libris API
  const handleSearch = async () => {
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/books/search-book-from-libris", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: searchTitle }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage("❌ " + (errorData.error || "Search failed"));
        setSearchResults([]);
        return;
      }

      const data = await res.json();
      setSearchResults(data.results);
    } catch (err) {
      setMessage("❌ An error occurred during search");
    }
  };

  // Add selected book from search results to user's collection
  const handleAddBook = async (book) => {
    setMessage("");
    try {
      const res = await fetch("http://localhost:8080/api/books/add-from-selection", {
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

  // Delete book by ID
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

  // Save updates after editing a book
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">📚 Search & Manage Your Books</h2>

        {/* Search Input Section */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="📖 Enter exact book title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition duration-300"
          >
            🔍 Search
          </button>
        </div>

        {/* Message output */}
        {message && <p className="mb-4 text-sm text-gray-700">{message}</p>}

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold mb-3 text-purple-600">🎯 Exact Matches:</h3>
            <ul className="space-y-4">
              {searchResults.map((book, i) => (
                <li key={i} className="border rounded p-4 bg-gray-100 shadow-sm">
                  <p className="font-bold text-purple-800">{book.title}</p>
                  <p className="text-sm text-gray-700">👤 {book.author}</p>
                  <p className="text-sm italic mb-2">{book.description}</p>
                  <button
                    onClick={() => handleAddBook(book)}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md text-sm transition"
                  >
                    ➕ Add this book
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* My Books Section */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-3 text-purple-600">📚 My Books:</h3>
          <ul className="space-y-4">
            {myBooks.map((book) => (
              <li key={book.id} className="border rounded p-4 bg-gray-50 shadow-sm">
                {editBook?.id === book.id ? (
                  // Edit mode
                  <div className="space-y-2">
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
                  // View mode
                  <div>
                    <p className="font-bold text-purple-800">{book.title}</p>
                    <p className="text-sm text-gray-700">👤 {book.author}</p>
                    <p className="text-sm italic mb-2">{book.description}</p>
                    <button onClick={() => setViewBook(null)} className="text-sm text-blue-500 mt-2">Close</button>
                  </div>
                ) : (
                  // Normal mode
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
    </div>
  );
}

export default BooksPage;
