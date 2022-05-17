import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage, LoginPage, Signup } from "./WebPages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
