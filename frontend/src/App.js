import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';

function App() {
  const [questions, setQuestions] = useState([]);
  const [pubkey,setpubkey]=useState("");
  

  const addQuestion = async (newQuestion) => {
    
  };

  return (
    <div className="App"> 
    <Home setpubkey={setpubkey}/>
    </div>
  );
}

export default App;
