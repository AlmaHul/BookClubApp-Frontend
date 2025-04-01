import jwt_decode from "jwt-decode";

const getUserIdFromToken = () => {
    const token = localStorage.getItem("jwt_token");  // Hämta JWT-token från localStorage
    if (token) {
        const decodedToken = jwt_decode(token);  // Dekoda token
        return decodedToken.user_id;  // Hämta user_id från token
    }
    return null;  // Om token inte finns, returnera null
};

const CreateReviewPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(getUserIdFromToken());  // Hämta user_id från token

    const submitReview = async (e) => {
        e.preventDefault();

        const reviewData = {
            title,
            author,
            rating: parseInt(rating),
            comment,
            user_id: userId,  // Skicka med user_id från token
        };

        try {
            const response = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Review submitted successfully!');
            } else {
                const errorData = await response.json();
                alert('Failed to submit review: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error submitting review.');
        }
    };

    return (
        <div className="create-review-page">
            <h2>Write about a book</h2>
            <form onSubmit={submitReview}>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating: (1-5)</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="comment">Review: </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-review-button">Submit</button>
            </form>
        </div>
    );
};

export default CreateReviewPage;

