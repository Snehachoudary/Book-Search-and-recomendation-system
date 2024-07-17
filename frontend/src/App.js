import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import Main from './Components/Main';
import Recommend from './BookRecomendation/Recommend';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/main" element={<Main onSearch={handleSearch} />} />
      <Route path="/recommend" element={<Recommend searchTerm={searchTerm} />} />
    </Routes>
  );
}

export default App;
