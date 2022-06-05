import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/employee/" element={<Home />} />
        <Route exact path="employee/addUser" element={<AddUser />} />
        <Route exact path="/editUser/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
