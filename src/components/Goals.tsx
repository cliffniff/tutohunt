// Import React
import * as React from "react";

// Import styles
import "../styles/goals.css";

// Import icons
import { FiClock, FiPlus, FiMenu } from "react-icons/fi";
import { useState } from "react";

const Dashboard: React.FC<{}> = () => {
    // const [goals, setGoals] = useSta
    const [activeTab, setActiveTab] = useState();

    return (
        <div className="goals-wrapper">
            <div className="goals-groups">
                <div className="goals-groups-nav">
                    <div className="goals-groups-item">
                        <div className="goals-groups-item-icon">
                            <FiMenu />
                        </div>
                        <div className="goals-groups-item-text">All</div>
                    </div>
                    <div className="goals-groups-item">
                        <div className="goals-groups-item-icon">
                            <FiMenu />
                        </div>
                        <div className="goals-groups-item-text">Completed</div>
                    </div>
                    <div className="goals-groups-item">
                        <div className="goals-groups-item-icon">
                            <FiClock />
                        </div>
                        <div className="goals-groups-item-text">Pending</div>
                    </div>
                </div>
                <div className="goals-groups-item goals-groups-item-add">
                    <div className="goals-groups-item-icon">
                        <FiPlus />
                    </div>
                    <div className="goals-groups-item-text">Add</div>
                </div>
            </div>
            <div className="goals-content"></div>
        </div>
    );
};

export default Dashboard;
