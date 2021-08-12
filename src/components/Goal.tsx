import * as React from "react";
import {
    GoalIF,
    GoalsReducerDelayGoalIF,
    GoalsReducerRemoveGoalIF,
    GoalsReducerSetCompletedIF,
} from "../interfaces/goals.interfaces";
import { GoalsReducerPayloadType } from "../reducers/goalReducer";
import "../styles/goal.css";
import { BsBoxArrowInRight, BsCheck, BsTrash } from "react-icons/bs";
import { GoalReducerActions } from "../enums/goals.enums";
import { useContext } from "react";
import { GoalsContext } from "./Goals";

export interface GoalProps extends GoalIF {
    id: string;
}

const Goal: React.FC<GoalProps> = ({
    id,
    title,
    completed,
    date,
    image,
    unit_id,
    url,
}) => {
    const { goalsDispatch } = useContext(GoalsContext);
    const { getNextUnit } = useContext(GoalsContext);
    return (
        <div className="goals-content-item">
            <span
                className="goals-content-item-title"
                style={{ textDecoration: completed ? "line-through" : "" }}>
                {title}
            </span>
            <a href={url} className="goals-content-item-url">
                {url}
            </a>
            <span className="goals-content-item-date">{date}</span>
            <div className="goals-content-item-icons">
                <div
                    className={`icon-button ${
                        completed && "icon-button-disabled"
                    }`}
                    onClick={() => {
                        goalsDispatch({
                            action: GoalReducerActions.TOGGLE_COMPLETED,
                            payload: {
                                id,
                            } as GoalsReducerSetCompletedIF,
                        });
                    }}>
                    <BsCheck />
                </div>
                <div
                    className="icon-button"
                    onClick={() => {
                        const nextUnit = getNextUnit();
                        goalsDispatch({
                            action: GoalReducerActions.DELAY_GOAL,
                            payload: {
                                id,
                                unit_id: nextUnit,
                            } as GoalsReducerDelayGoalIF,
                        });
                    }}>
                    <BsBoxArrowInRight />
                </div>
                <div
                    className="icon-button"
                    onClick={() => {
                        goalsDispatch({
                            action: GoalReducerActions.REMOVE_GOAL,
                            payload: {
                                id,
                            } as GoalsReducerRemoveGoalIF,
                        });
                    }}>
                    <BsTrash />
                </div>
            </div>
            <div
                className="goals-content-item-image"
                style={{
                    backgroundImage: `url(${image})`,
                }}></div>
        </div>
    );
};

export default Goal;
