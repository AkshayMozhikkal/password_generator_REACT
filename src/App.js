import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { CustomNavbar } from "./Components/CustomNavbar";
import { CustomFooter } from "./Components/CustomFooter";

function App() {
  return (
    <div>
      <CustomNavbar></CustomNavbar>
      <div className="flex items-center justify-center">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
      <CustomFooter />
    </div>
  );
}

export default App;
