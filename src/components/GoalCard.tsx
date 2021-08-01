import React from "react";
import styles from "../styles/GoalCard.module.css";

interface GoalCardProps {
    title: string;
    date: Date;
    type: string;
    image: string;
}

const GoalCard: React.FC<GoalCardProps> = () => {
    return <div className={styles.goalcard}></div>;
};

export default GoalCard;
