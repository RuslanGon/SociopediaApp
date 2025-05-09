import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage/HomePage.jsx';
import LoginPage from './page/LoginPage/LoginPage.jsx';
import ProfilePage from './page/ProfilePage/ProfilePage.jsx';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
