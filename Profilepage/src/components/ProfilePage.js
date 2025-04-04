import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch('/api/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(err => console.error(err));
    }, []);

    if (!profile) return <p>Loading...</p>;

    return (
        <div>
            <h2>Welcome, {profile.user.username}!</h2>
            <h3>Your Books:</h3>
            <ul>
                {profile.books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author} 
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const handleDelete = (bookId) => {
    fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(() => window.location.reload())
    .catch(err => console.error(err));
};

export default ProfilePage;