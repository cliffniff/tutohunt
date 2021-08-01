import React from "react";
import styles from "../styles/Dashboard.module.css";
import { FaCheck, FaCross, FaExclamation } from "react-icons/fa";

export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.progress}>
                <div className={styles.circle}></div>
                <div className={styles.inner}>
                    <FaExclamation />
                    {/* <FaCheck /> */}
                    {/* <FaCross /> */}
                </div>
                <div className={styles.left}></div>
                <div className={styles.right}></div>
            </div>
            <div className={styles.stats}>
                <div className={styles.fraction}>
                    <span className={styles.frnumber}>5/10</span>
                    <span className={styles.frtext}>tasks completed</span>
                </div>
                <div className={styles.points}>
                    <span
                        className={`${styles.pointstext} ${styles.goodpoints}`}
                    >
                        10 points
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
