import React from 'react';
import "../styles/ReviewsPage.css";
import { Link } from 'react-router-dom';

const ReviewsPage = () => {
    // Här hårdkodar vi en recension
    const reviews = [
        {
            id: 1,
            title: "Boktitel",
            author: "Author",
            comment: "Det här är en testkommentar för att visa hur recensionen ser ut. Jag tycker att denna bok var fantastisk och mycket intressant att läsa. Rekommenderas!Det här är en testkommentar för att visa hur recensionen ser ut. Jag tycker att denna bok var fantastisk och mycket intressant att läsa. Rekommenderas!",
            user: "Username",
            rating: 5,
            created_at: "2025-03-27"
        },
    {
            id: 2,
            title: "Boktitel",
            author: "Author",
            comment: "Det här är en testkommentar för att visa hur recensionen ser ut. Jag tycker att denna bok var fantastisk och mycket intressant att läsa. Rekommenderas!Det här är en testkommentar för att visa hur recensionen ser ut. Jag tycker att denna bok var fantastisk och mycket intressant att läsa. Rekommenderas!",
            user: "Username",
            rating: 5,
            created_at: "2025-03-27"
        },
    ];

    const handleCreateReview = () => {
        // Här kan du lägga till logik för att navigera till en sida för att skriva en recension
        console.log('Navigating to create review page...');
    };

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
                                <p className="review-author"><strong></strong> {review.author}</p>
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
