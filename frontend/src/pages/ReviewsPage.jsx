import React from 'react';
import "../styles/ReviewsPage.css";

const ReviewsPage = () => {
    // Här hårdkodar vi en recension
    const reviews = [
        {
            id: 1,
            title: "Test Boktitel",
            author: "Test Author",
            comment: "Det här är en testkommentar för att visa hur recensionen ser ut. Jag tycker att denna bok var fantastisk och mycket intressant att läsa. Rekommenderas!Det här är en testkommentar för att visa hur recensionen ser ut. Jag tycker att denna bok var fantastisk och mycket intressant att läsa. Rekommenderas!",
            user: "Test User",
            rating: 5,
            created_at: "2025-03-27"
        }
    ];

    const handleCreateReview = () => {
        // Här kan du lägga till logik för att navigera till en sida för att skriva en recension
        console.log('Navigating to create review page...');
    };

    return (
        <div className="reviews-page">
            {/* Knapp för att skapa en recension */}
           <a href="#" className="create-review-link" onClick={handleCreateReview}>
    Write a review
</a>

            {/* Recensioner */}
            <div className="reviews-container">
                {reviews.map((review) => (
                    <div className="review-card" key={review.id}>
                        <div className="review-header">
                            <div className="review-left">
                                <h2 className="review-title">{review.title}</h2>
                                <p className="review-author"><strong>Författare:</strong> {review.author}</p>
                            </div>

                            <div className="review-right">
                                <p className="review-user"><strong>Användare:</strong> {review.user}</p>
                                <p className="review-rating"><strong>Betyg:</strong> {review.rating}</p>
                            </div>
                        </div>

                        <p className="review-comment">{review.comment}</p>

                        <div className="review-created-at">
                            <p><strong>Skapad:</strong> {review.created_at}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewsPage;
