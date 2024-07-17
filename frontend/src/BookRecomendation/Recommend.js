import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card'; // Ensure this path is correct
import './Recommend.css';
import { useSearchParams } from 'react-router-dom';

const Recommend = ({ searchTerm }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchTerm || '');
  const [bookData, setData] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const term = searchParams.get('search') || searchTerm;
    if (term) {
      setSearch(term);
      axios.post('http://localhost:5000/recommend', { book_name: term })
        .then(response => {
          setRecommendedBooks(response.data.recommended_books);
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the recommended books!", error);
          setLoading(false);
        });
    }
  }, [searchTerm, searchParams]);

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      setLoading(true);
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=' +
          search +
          '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' +
          '&maxResults=40'
        )
        .then((res) => {
          setData(res.data.items);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recommend-container">
      <h1>Book Recommendations</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter Your Book Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={searchBook}
        />
      </div>
      <div className="container">
        {bookData.length > 0 ? (
          <Card book={bookData} />
        ) : (
          recommendedBooks.length > 0 && <Card book={recommendedBooks} />
        )}
      </div>
    </div>
  );
};

export default Recommend;
