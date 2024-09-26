import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ListingPage from "./components/ListingPage";
import EditPage from "./components/EditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={LoginPage} />
        <Route path="/listing" Component={ListingPage} />
        <Route path="/edit/:id" Component={EditPage} />
      </Routes>
    </Router>
  );
}

export default App;
