
const CreateReviewPage = () => {


    return (
        <div className="create-review-page">
            <h2>Write about a book</h2>
            <form>
                <div className="form-group">
                    <label for="title">Titel: </label>
                    <input
                        type="text"
                        id="title"
                    />
                </div>

                <div className="form-group">
                    <label for="author">Author: </label>
                    <input
                        type="text"
                        id="author"

                    />
                </div>

                 <div className="form-group">
                    <label htmlFor="rating">Rating: (1-5)</label>
                    <input
                        type="number"
                        id="rating"
                        min="1"
                        max="5"

                    />
                </div>

                <div className="form-group">
                    <label for="comment">Review: </label>
                    <textarea
                        id="comment"

                    />
                </div>





                <button type="submit" className="submit-review-button">Submit</button>
            </form>
        </div>

    );
};

export default CreateReviewPage;
