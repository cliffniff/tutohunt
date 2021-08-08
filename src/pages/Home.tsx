import * as React from "react";
import "../styles/home.css";
import Dashboard from "../components/Dashboard";
import Goals from "../components/Goals";

const Home: React.FC = () => {
    return (
        <div className="home-wrapper">
            <Dashboard />
            <Goals />
        </div>
    );
};

export default Home;
