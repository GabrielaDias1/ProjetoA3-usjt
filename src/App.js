import "./assents/styles/global.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home.js";
import Resposta from "./components/resposta.js";
import Header from './components/pages/header.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/response" element={<Resposta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
