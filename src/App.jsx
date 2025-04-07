import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import "tailwindcss";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import RecipeFeed from './pages/RecipeFeed';
import RecipeDetails from './Pages/RecipeDetails';
import Profile from './Pages/Profile';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Favorites from './Pages/Favorites';
import AddRecipe from './Pages/AddRecipe';

const AppWrapper = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/' || location.pathname === '/login';

  return (
    <div
      style={{
        backgroundImage: 'url(/images/Logo/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      }}
    >
      {!isLoginRoute && (
        <>
          <Header />
          <Navbar />
        </>
      )}

      <div
        style={{
          minHeight: isLoginRoute ? '100vh' : 'calc(100vh - 220px)',
          padding: isLoginRoute ? '0' : '160px 0 60px',
          display: isLoginRoute ? 'flex' : 'block',
          alignItems: isLoginRoute ? 'center' : 'flex-start',
          justifyContent: isLoginRoute ? 'center' : 'flex-start',
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category/:category" element={<RecipeFeed />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
        </Routes>
      </div>

      {!isLoginRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;