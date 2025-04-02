import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/reviewPage.css";
import { useAuth } from '../auth/AuthProvider';

const MyReviewsPage = () => {
    const { isLoggedIn, user } = useAuth();
    console.log("Auth status:", isLoggedIn, "User:", user); // Debug-logg

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyReviews = async () => {
            if (!isLoggedIn || !user || !user.id) {
                setError("You must be logged in to view your reviews.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8080/api/review/user/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (!Array.isArray(data)) throw new Error("Invalid data format: expected an array");

                    // Sortera recensionerna så att de nyaste kommer först
                    const sortedReviews = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setReviews(sortedReviews);
                } else {
                    setError("Failed to fetch your reviews.");
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setError("An error occurred while fetching your reviews.");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMyReviews();
        }
    }, [user, isLoggedIn]);

    // Funktion för att radera en recension
    const handleDeleteReview = async (reviewId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://127.0.0.1:8080/api/review/${reviewId}`, { method: "DELETE" });
            if (response.ok) {
                setReviews(reviews.filter(review => review.id !== reviewId));
            } else {
                alert("Failed to delete the review.");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    // Funktion för att navigera till uppdateringssidan
    const handleUpdateReview = (reviewId) => {
        navigate(`/update-review/${reviewId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="main-content">
            <h1 className="book-review">My Reviews</h1>
            <button onClick={() => navigate("/create-review")} className="add-review">
                Add New Review
            </button>
            <button onClick={() => navigate("/reviews")} className="add-review">
                All Reviews
            </button>

            <div className="review-box">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="mb-6 p-4 border rounded-lg shadow-md bg-white">
                            <div className="left-header">
                                <h3 className="book-title">{review.title}</h3>
                                <h3 className="author">By: {review.author}</h3>
                            </div>

                            <div className="right-header">
                                <p className="text-gray-500">Username: {review.username ?? "Unknown"}</p>
                                <p className="text-yellow-500 mt-2">Rating: ⭐ {review.rating}</p>
                            </div>

                            <div className="main-text">
                                <p className="mt-2">{review.comment}</p>
                            </div>

                            <p className="mt-2 text-gray-500">
                                Reviewed at: {review.created_at ? new Date(review.created_at).toLocaleString() : "N/A"}
                            </p>

                            {/* Uppdatera & Radera-knappar */}
                            <div className="review-buttons">
                                <button
                                    className="update-btn"
                                    onClick={() => handleUpdateReview(review.id)}
                                >
                                    ✏️ Update
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteReview(review.id)}
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">You have not created any reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyReviewsPage;
