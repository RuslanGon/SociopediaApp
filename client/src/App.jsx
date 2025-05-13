import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage/HomePage.jsx';
import LoginPage from './page/LoginPage/LoginPage.jsx';
import ProfilePage from './page/ProfilePage/ProfilePage.jsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import NavbarPage from './page/NavbarPage/NavbarPage.jsx';


const App = () => {
  const mode = useSelector(state => state.auth.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className='app'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavbarPage />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={isAuth ? <HomePage /> : <LoginPage />} />
        <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <LoginPage />} />
      </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
