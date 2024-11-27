import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/Dashboard";
import "./assests/Screenshot 2024-11-27 234340.png"

const App = () => {
    return (
        <div>
        <Routes>

            <Route
                path="/"
                element={
                        <DashboardPage />
                }
            /> 
        </Routes>
        </div>
       
    );
};

export default App;
