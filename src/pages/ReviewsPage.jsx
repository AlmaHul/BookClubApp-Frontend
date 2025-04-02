import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/reviewPage.css";
import { useAuth } from '../auth/AuthProvider';

const ReviewsPage = () => {
    const { isLoggedIn } = useAuth();

  const [reviews, setReviews] = useState([]); // För att spara alla recensioner
  const [loading, setLoading] = useState(true); // För att hantera laddning
  const [error, setError] = useState(""); // För att hantera eventuella fel
  const navigate = useNavigate();

  // Hämta recensioner när komponenten laddas
useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/review");
      if (response.ok) {
        const data = await response.json();

        // Sortera recensionerna så att de nyaste kommer först
        const sortedReviews = data.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setReviews(sortedReviews); // Sätt de sorterade recensionerna
      } else {
        setError("Failed to fetch reviews");
      }
    } catch (error) {
      setError("An error occurred while fetching reviews");
    } finally {
      setLoading(false); // Sätt loading till false när hämtningen är klar
    }
  };



    fetchReviews();
}, []); // Tom array innebär att useEffect körs bara en gång vid mount




  // Funktion för att navigera till skapa recension-sidan
  const handleAddReview = () => {
    navigate("/create-review");
  };

  // Visa laddningsmeddelande eller felmeddelande
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="main-content">
      <h1 className="book-review">Book reviews</h1>

      <div className="review-add-my">
      <button
        onClick={handleAddReview}
        className="add-review"
      >
        Add Review
      </button>
      <button
                className="add-review"
                onClick={() => navigate("/my-reviews")}
            >
                My Reviews
            </button>
            </div>

      <div className="review-box">
        {/* Visa alla recensioner som kort */}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="mb-6 p-4 border rounded-lg shadow-md bg-white"
            >
            <div className="review-header">
            <div className="left-header">
              <h3 className="book-title">{review.title}</h3>
              <h3 className="author">By: {review.author}</h3>
              </div>

              <div className="right-header">
              <p className="text-gray-500">Username: {review.username || "Unknown"}</p>
              <p className="text-yellow-500 mt-2">Rating: ⭐ {review.rating}</p>
              </div>
              </div>

              <div className="main-text">
              <p className="mt-2">{review.comment}</p>
              </div>

              <p className="mt-2 text-gray-500">
                Reviewed at: {review.created_at ? new Date(review.created_at).toLocaleString() : "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available.</p>
        )}
      </div>


    </div>
  );
};

export default ReviewsPage;
