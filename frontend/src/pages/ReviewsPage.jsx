import React, { useEffect, useState } from 'react';
import "../styles/ReviewsPage.css";
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]); // State för att lagra recensionerna
    const [loading, setLoading] = useState(true); // State för att hantera laddning

    // Funktion för att hämta recensioner från backend
    const fetchReviews = async () => {
        try {
            const response = await fetch('/api/review');
            if (response.ok) {
                const data = await response.json();
                setReviews(data.reviews);  // Sätt recensionerna i state
            } else {
                console.error("Failed to fetch reviews:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false); // När hämtingen är klar (lyckad eller ej), sätt loading till false
        }
    };

    // Använd useEffect för att hämta recensionerna när komponenten laddas
    useEffect(() => {
        fetchReviews();
    }, []);

    // Om recensionerna fortfarande laddas, visa en laddningsindikator
    if (loading) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div className="reviews-page">
            {/* Knapp för att skapa en recension */}
            <Link to="/create-review" className="create-review-link">
                Write a review
            </Link>

            {/* Recensioner */}
            <div className="reviews-container">
                {reviews.map((review) => (
                    <div className="review-card" key={review.id}>
                        <div className="review-header">
                            <div className="review-left">
                                <h2 className="review-title">{review.title}</h2>
                                <p className="review-author"><strong>Author:</strong> {review.author}</p>
                            </div>

                            <div className="review-right">
                                <p className="review-user"><strong>User</strong>: {review.user}</p>
                                <p className="review-rating"><strong>Rating:</strong> {review.rating}</p>
                            </div>
                        </div>

                        <p className="review-comment">{review.comment}</p>

                        <div className="review-created-at">
                            <p><strong>Created at:</strong> {review.created_at}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
