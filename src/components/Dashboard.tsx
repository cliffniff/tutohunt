// Importing React
import * as React from "react";

// Importing icons
import { ImCheckmark, ImCross } from "react-icons/im";
import { FaExclamation } from "react-icons/fa";
import { FiHeart, FiSettings } from "react-icons/fi";

// Importing styles
import "../styles/dashboard.css";
import PageContext from "../contexts/PageContext";
import { useContext } from "react";

const Dashboard: React.FC<{}> = () => {
    const setPage = useContext(PageContext);
    return (
        <div className="dashboard-wrapper">
            <div className="topbar-wrapper">
                <div
                    className="topbar-icon icon-button"
                    onClick={() => {
                        setPage("options");
                    }}
                >
                    <FiSettings />
                </div>
                <div className="topbar-icon icon-button">
                    <FiHeart />
                </div>
            </div>
            <div className="progress-wrapper">
                <div className="progress-inner">
                    <div className="progress-inner-icon">
                        {/* <ImCheckmark /> */}
                        {/* <ImCross /> */}
                        <FaExclamation />
                    </div>
                </div>
                <div className="progress-left"></div>
                <div className="progress-right"></div>
                <div className="progress-right-placeholder"></div>
            </div>
            <div className="goals-info-wrapper">
                <span className="goals-info-fraction">5/10</span>goals completed
            </div>
            <div className="goals-points-wrapper">
                <span className="goals-points-text">10 points</span>
            </div>
        </div>
    );
};

export default Dashboard;
