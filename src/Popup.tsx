import React from "react";
import ReactDOM from "react-dom";
import styles from "./Popup.module.css";

import Dashboard from "./components/Dashboard";
import Goals from "./components/Goals";
import { FiSettings, FiHeart } from "react-icons/fi";

const Popup: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <div className="icondiv">
                    <FiSettings />
                </div>
                <div className="icondiv">
                    <FiHeart />
                </div>
            </div>
            <Dashboard />
            <Goals />
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);
