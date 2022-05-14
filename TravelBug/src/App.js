import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./WebPages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
