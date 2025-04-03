import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/reviewPage.css";
import { useAuth } from '../auth/AuthProvider';

const CreateReviewPage = () => {
    const { isLoggedIn, user } = useAuth();
    console.log("Auth status:", isLoggedIn, "User:", user);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(1); // Default rating to 1
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id || !user.username) {
            setError("You must be logged in to submit a review.");
            return;
        }

        const reviewData = {
            title,
            author, // Använd den inloggade användarens namn
            comment,
            rating,
            user_username: user.username,
            user_id: user.id, // Säkerställ att user har ett id
        };

        console.log("Review data being sent to server:", reviewData);

        try {
            const response = await fetch("http://127.0.0.1:8080/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Server response data:", data);

            if (response.ok) {
                navigate("/reviews"); // Navigera tillbaka till reviews-sidan
            } else {
                setError(data.error || "Failed to create review");
            }
        } catch (error) {
            console.error("Error during submission:", error);
            setError("An error occurred while submitting the review.");
        }
    };

    return (
        <div className="create-review-content">
            <h1 className="create-review-title">Create Review</h1>
            {error && <p className="create-review-error">{error}</p>}
            <form className="create-review-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                 <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Write your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Rating ⭐ (1-5)"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="1"
                    max="5"
                />
                <button type="submit" className="create-review-button">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default CreateReviewPage;


