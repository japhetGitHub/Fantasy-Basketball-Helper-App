import React from "react";

// creates a button wich is takes multiple form around the application
export default function Button(props) {
   const {onClick, text} = props;
   return <button onClick={onClick}> {text} </button>;
}