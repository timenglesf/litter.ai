import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { categoryData } from '../src/DummyData/sampleCategoryData.js'

import LandingPage from './Components/LandingPage';
import CameraCapture from './Components/CameraCapture';
import Leaderboard from './Components/Leaderboard';
import CategoryDescription from './Components/CategoryDescription';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/capture' element={<CameraCapture />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/recycle' element={<CategoryDescription type={categoryData.recycle}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
