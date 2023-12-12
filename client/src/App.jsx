import React, { useState, useEffect } from 'react';
import './css/App.css';
import Cookies from 'js-cookie';
import {
  BrowserRouter as
  Router,
  Routes,
  Route,
} from 'react-router-dom';
import categoryData from './MockData/mockCategoryData';
import LandingPage from './components/LandingPage';
import CameraCapture from './components/CameraCapture';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profile';
import SuccessfulSubmission from './components/SuccessfulSubmission/SuccessfulSubmission';
import Register from './components/Register/Register';
import Login from './components/Register/Login';

export default function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = Cookies.get('userData');
    setUserData(JSON.parse(user));
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/capture" element={<CameraCapture />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {userData && <Route path="/profile" element={<Profile user={userData} />} />}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login user={userData} />} />
          <Route path="/success" element={<SuccessfulSubmission type={categoryData.plastic} />} />
        </Routes>
      </Router>
    </div>
  );
}
