import React from "react";

export default function  Header (props) {
  const {live} = props;
  let liveGame = "";
  if(live){liveGame = "Live game here, props.live = true";}
   return(
     <div className="header">
       <h1>Our website name</h1>
       <div className="liveGameBanner">{liveGame}</div>
     </div>
   );
}