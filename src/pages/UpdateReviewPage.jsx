import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "../styles/reviewPage.css";

const UpdateReview = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { reviewId } = useParams(); // Use the reviewId from the URL

  const [review, setReview] = useState({
    title: "",
    author: "",
    comment: "",
    rating: 1,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      if (!isLoggedIn || !user || !user.id) {
        setError("You must be logged in to update a review.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8080/api/review/${reviewId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setReview(data); // Fill the form with existing review data
        } else {
          setError("Failed to fetch review.");
        }
      } catch (error) {
        setError("An error occurred while fetching the review.");
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [reviewId, isLoggedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn || !user || !user.id) {
      setError("You must be logged in to update a review.");
      return;
    }

    if (review.rating < 1 || review.rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8080/api/review/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: review.title,
          author: review.author,
          comment: review.comment,
          rating: review.rating,
        }),
      });

      if (response.ok) {
        navigate("/my-reviews"); // Redirect to MyReviews page after successful update
      } else {
        setError("Failed to update the review.");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      setError("An error occurred while updating the review.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
 <div className="create-review-content">
  <h1 className="create-review-title">Update Review</h1>

    <form onSubmit={handleSubmit} className="create-review-form">

        <input
          type="text"
          placeholder="Title"
          name="title"
          value={review.title}
          onChange={handleChange}
          required
        />




        <input
          type="text"
          placeholder="Author"
          name="author"
          value={review.author}
          onChange={handleChange}
          required
        />




        <textarea
          name="comment"
          placeholder="Comment"
          value={review.comment}
          onChange={handleChange}
          required
        />




        <input
          type="number"
          name="rating"
          placeholder="Rating ⭐ (1-5)"
          value={review.rating}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />


      <button type="submit" className="create-review-button">
        Save Changes
      </button>
    </form>
  </div>



  );
};

export default UpdateReview;
