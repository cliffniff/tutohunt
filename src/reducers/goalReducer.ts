import { GoalReducerActions } from "../enums/goals.enums";
import {
    GoalIF,
    GoalsReducerAddGoalIF,
    GoalsReducerChangeTitleIF,
    GoalsReducerDelayGoalIF,
    GoalsReducerRemoveGoalIF,
    GoalsReducerSetCompletedIF,
    GoalsIF,
} from "../interfaces/goals.interfaces";
export interface GoalsReducerPayloadType {
    action: GoalReducerActions;
    payload:
        | GoalsReducerAddGoalIF
        | GoalsReducerChangeTitleIF
        | GoalsReducerDelayGoalIF
        | GoalsReducerRemoveGoalIF
        | GoalsReducerSetCompletedIF
        | GoalsIF;
}
export interface GoalsReducerType {
    (state: GoalsIF, { action, payload }: GoalsReducerPayloadType): GoalsIF;
}

const goalReducer: GoalsReducerType = (state, { action, payload }) => {
    if (action === GoalReducerActions.ADD_GOAL) {
        const { title, url, image, unit_id } = payload as GoalsReducerAddGoalIF;
        const id = Date.now();
        const date = new Date();
        console.log(unit_id);
        const newGoal: GoalIF = {
            title,
            date: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
            url,
            image,
            completed: false,
            unit_id,
        };
        return { ...state, [id]: newGoal };
    } else if (action === GoalReducerActions.REMOVE_GOAL) {
        const { id } = payload as GoalsReducerRemoveGoalIF;
        const newState = { ...state };
        delete newState[id];
        return newState;
    } else if (action === GoalReducerActions.DELAY_GOAL) {
        const { id, unit_id } = payload as GoalsReducerDelayGoalIF;
        const newState = { ...state };
        newState[id].unit_id = unit_id;
        return newState;
    } else if (action === GoalReducerActions.CHANGE_TITLE) {
        const { id, title } = payload as GoalsReducerChangeTitleIF;
        const newState = { ...state };
        newState[id].title = title;
        return newState;
    } else if (action === GoalReducerActions.TOGGLE_COMPLETED) {
        const { id } = payload as GoalsReducerSetCompletedIF;
        const newState = { ...state };
        newState[id].completed = !newState[id].completed;
        return newState;
    } else if (action === GoalReducerActions.REPLACE_STATE) {
        return payload as GoalsIF;
    }
    return state;
};

export default goalReducer;
