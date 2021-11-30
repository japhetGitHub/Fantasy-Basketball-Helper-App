import React, { useState } from 'react';
import Header from './Header.jsx';
import HomePage from './HomePage.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import HomeLog from './HomeLog.jsx';
import CreateNewTeam from './CreateNewTeam.jsx';
import SpecificTeamOverview from './SpecificTeamOverview.jsx';
import Footer from './utilities/Footer.jsx';
import StartingLineups from './StartingLineups.jsx';
import ManagePlayer from './ManagePlayer.jsx';

import { StyledApplication } from '../style/Application.styles.jsx';


export default function App() {
  const [view, setView] = useState("HomePage");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [login, setLogin] = useState(false);

  return (
    <StyledApplication>
      <Header onClick={setView} setLogin={setLogin} login={login} />
      
      {view === "HomePage" && <HomePage onClick={setView} />}
      {view === "Register" && <Register onClick={setView} />}
      {view === "Login" && <Login onClick={setView} setLogin={setLogin}/>}
      {view === "HomeLog" && <HomeLog onClick={setView} onSelectedTeam={setSelectedTeam} />}
      {view === "CreateNewTeam" && <CreateNewTeam onClick={setView} />}
      {view === "SpecificTeamOverview" && <SpecificTeamOverview onClick={setView}  selectedTeam={selectedTeam} onSelectedTeam={setSelectedTeam} />}
      {view === "StartingLineups" && <StartingLineups onClick={setView} selectedTeam={selectedTeam} />}
      {view === "ManagePlayer" && <ManagePlayer onClick={setView} selectedTeam={selectedTeam} />}

      <Footer/>
    </StyledApplication>
  );
}