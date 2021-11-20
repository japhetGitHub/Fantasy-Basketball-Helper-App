import React, { useState } from "react";
import '../style/Application.css';
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';


function App() {
  const [view, setView] = useState("HomePage")
  // need to pass setShowLiveGame to some view to set it as false when we dont show the live games
  const [showLiveGame, setShowLiveGame] = useState(true) 
  return (
    <div className="Application">
      <Header live={showLiveGame} />
      {view === "HomePage" && <HomePage onClick={setView} />}
      {view === "Register" && <Register onClick={setView} />}
      {view === "Login" && <Login onClick={setView} />}
    </div>
  );
}

export default App;
