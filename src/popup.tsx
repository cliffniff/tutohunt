import React from "react";
import ReactDOM from "react-dom";
import Icon from "./components/Icon";
import styles from "./popup.module.css";

const Popup = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <div className={styles.icondiv}>
                    <Icon name="settings" />
                </div>
                <div className={styles.icondiv}>
                    <Icon name="heart" />
                </div>
            </div>
            <div className={styles.dashboard}>
                <div className={styles.progress}>
                    <div className={styles.circle}></div>
                    <div className={styles.inner}>
                        <Icon name="exclamation" />
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
            <div className={styles.goals}>
                <div className={styles.queues}>
                    <ul className={styles.queuelist}>
                        <li className={`${styles.queue}  ${styles.active}`}>
                            <span className={styles.queueicon}>
                                <Icon name="clock" />
                            </span>
                            <span className={styles.queuetext}>Pending</span>
                        </li>
                        <li className={styles.queue}>
                            <span className={styles.queueicon}>
                                <Icon name="hamburger" />
                            </span>
                            <span className={styles.queuetext}>All</span>
                        </li>
                        <li className={styles.queue}>
                            <span className={styles.queueicon}>
                                <Icon name="hamburger" />
                            </span>
                            <span className={styles.queuetext}>Completed</span>
                        </li>
                        <li className={styles.queue}>
                            <span className={styles.queueicon}>
                                <Icon name="plus" />
                            </span>
                            <span className={styles.queuetext}>Add</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.lists}></div>
            </div>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);
