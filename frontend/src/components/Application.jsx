import React, { useState } from 'react';
import '../style/Application.css';
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import HomeLog from './HomeLog.jsx';




export default function App() {
  const [view, setView] = useState("HomePage");
  const [showLiveGame, setShowLiveGame] = useState(true);

  return (
    <div className="Application">
      <Header live={showLiveGame} />
      {view === "HomePage" && <HomePage onClick={setView} />}
      {view === "Register" && <Register onClick={setView} />}
      {view === "Login" && <Login onClick={setView} />}
      {view === "HomeLog" && <HomeLog onClick={setShowLiveGame} />}
    </div>
  );
}