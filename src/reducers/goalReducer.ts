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
import { getCurrentUnit, getNextUnit } from "../utils/goals.utils";

interface GoalsReducerType {
    <
        PayloadType extends
            | GoalsReducerAddGoalIF
            | GoalsReducerRemoveGoalIF
            | GoalsReducerChangeTitleIF
            | GoalsReducerSetCompletedIF
            | GoalsReducerDelayGoalIF
    >(
        state: GoalsIF,
        {
            action,
            payload,
        }: { action: GoalReducerActions; payload: PayloadType }
    ): GoalsIF;
}

const goalReducer: GoalsReducerType = (state, { action, payload }) => {
    if (action === GoalReducerActions.ADD_GOAL) {
        const { title, url, image } = payload as GoalsReducerAddGoalIF;
        const id = Date.now();
        const newGoal: GoalIF = {
            title,
            date: Date.toString(),
            url,
            image,
            completed: false,
            unit_id: getCurrentUnit(),
        };
        return { ...state, [id]: newGoal };
    } else if (action === GoalReducerActions.REMOVE_GOAL) {
        const { id } = payload as GoalsReducerRemoveGoalIF;
        const newState = { ...state };
        delete newState[id];
        return newState;
    } else if (action === GoalReducerActions.DELAY_GOAL) {
        const { id } = payload as GoalsReducerDelayGoalIF;
        const nextUnit = getNextUnit();
        const newState = { ...state };
        newState[id].unit_id = nextUnit;
        return newState;
    } else if (action === GoalReducerActions.CHANGE_TITLE) {
        const { id, title } = payload as GoalsReducerChangeTitleIF;
        const newState = { ...state };
        newState[id].title = title;
        return newState;
    } else if (action === GoalReducerActions.SET_COMPLETED) {
        const { id } = payload as GoalsReducerSetCompletedIF;
        const newState = { ...state };
        newState[id].completed = true;
        return newState;
    }
    return state;
};

export default goalReducer;
