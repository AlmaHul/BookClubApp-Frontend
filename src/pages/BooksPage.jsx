import React, { useState } from "react";

function BooksPage() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
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
        alert("❌ " + (errorData.error || "No exact match"));
        return;
      }

      const data = await res.json();
      setSearchResults(data.results);
    } catch (err) {
      alert("🔧 Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl text-center sparkle-bg">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">🔍 Search for a Book</h2>
        
        <div className="flex flex-col gap-4">
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
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Results:</h3>
            <ul className="space-y-3">
              {searchResults.map((book, i) => (
                <li key={i} className="border rounded p-3 bg-gray-100">
                  <strong>{book.title}</strong><br />
                  <span className="text-sm text-gray-600">👤 {book.author}</span><br />
                  <span className="text-sm italic">{book.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BooksPage;