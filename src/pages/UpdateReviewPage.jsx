import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/reviewPage.css";  // För att hålla stilen konsistent

const UpdateReviewPage = () => {
    const { reviewId } = useParams(); // Hämta review ID från URL
    const [review, setReview] = useState({
        title: "",
        author: "",
        comment: "",
        rating: 1,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Hämta recensionen från servern
    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/api/review/${reviewId}`);
                if (response.ok) {
                    const data = await response.json();
                    setReview(data.review);
                } else {
                    setError("Review not found.");
                }
            } catch (error) {
                setError("Error fetching review.");
            } finally {
                setLoading(false);
            }
        };

        fetchReview();
    }, [reviewId]);

    // Hantera ändringar i formulär
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    // Uppdatera recensionen
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/review/${reviewId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(review),
            });

            if (response.ok) {
                navigate("/my-reviews"); // Navigera tillbaka till "My Reviews"-sidan efter uppdatering
            } else {
                setError("Failed to update the review.");
            }
        } catch (error) {
            setError("Error updating the review.");
        }
    };

    // Ladda sidinnehåll eller visa fel
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="main-content">
            <h1>Update Review</h1>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={review.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        value={review.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <textarea
                        name="comment"
                        value={review.comment}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={review.rating}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Update Review</button>
            </form>
        </div>
    );
};

export default UpdateReviewPage;


