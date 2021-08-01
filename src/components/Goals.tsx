import React from "react";
import { FiClock, FiList, FiPlus } from "react-icons/fi";
import styles from "../styles/Goals.module.css";

export interface GoalsProps {}

const Goals: React.FC<GoalsProps> = () => {
    return (
        <div className={styles.goals}>
            <div className={styles.queues}>
                <ul className={styles.queuelist}>
                    <li className={`${styles.queue}  ${styles.active}`}>
                        <span className={styles.queueicon}>
                            <FiClock />
                        </span>
                        <span className={styles.queuetext}>Pending</span>
                    </li>
                    <li className={styles.queue}>
                        <span className={styles.queueicon}>
                            <FiList />
                        </span>
                        <span className={styles.queuetext}>All</span>
                    </li>
                    <li className={styles.queue}>
                        <span className={styles.queueicon}>
                            <FiList />
                        </span>
                        <span className={styles.queuetext}>Completed</span>
                    </li>
                    <li className={styles.queue}>
                        <span className={styles.queueicon}>
                            <FiPlus />
                        </span>
                        <span className={styles.queuetext}>Add</span>
                    </li>
                </ul>
            </div>
            <div className={styles.lists}></div>
        </div>
    );
};

export default Goals;
