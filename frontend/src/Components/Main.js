import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import axios from 'axios';
import './style.css';

const Main = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      onSearch(search);
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=' +
          search +
          '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU' +
          '&maxResults=40'
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/recommend">Recommend</Link>
      </nav>

      <div className="header">
        <div className="left-section">
          <h1>
            A room without books is like
            <br /> a body without a soul.
          </h1>
        </div>
        <div className="right-section">
          <h2>Find Your Book</h2>
          <div className="search">
            <input
              type="text"
              placeholder="Enter Your Book Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={searchBook}
            />
            <button onClick={() => onSearch(search)}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <img src="./images/bg2.png" alt="" />
        </div>
      </div>

      <div className="container">
        {bookData.length > 0 && <Card book={bookData} />}
      </div>
    </>
  );
};

export default Main;
