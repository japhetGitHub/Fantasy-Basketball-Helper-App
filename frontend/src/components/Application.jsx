import React from "react";
import '../style/Application.css';
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';


function App() {
  return (
    <div className="Application">
      <Header live={true} />
      <HomePage />
    </div>
  );
}

export default App;
