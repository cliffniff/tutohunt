import {
    GoalsActionsEnum,
    GoalsItemType,
    GoalsPayloadAddGoalType,
    GoalsPayloadChangeTitleType,
    GoalsPayloadDelayGoalType,
    GoalsPayloadRemoveGoalType,
    GoalsPayloadSetCompletedType,
    GoalsReducerType,
} from "../types/goalTypes";
import { getCurrentUnit, getNextUnit } from "../utils/goalsUtils";

const goalReducer: GoalsReducerType = (state, { action, payload }) => {
    if (action === GoalsActionsEnum.ADD_GOAL) {
        const { title, url, image } = payload as GoalsPayloadAddGoalType;
        const id = Date.now();
        const newGoal: GoalsItemType = {
            title,
            date: Date.toString(),
            url,
            image,
            completed: false,
            unit_id: getCurrentUnit(),
        };
        return { ...state, [id]: newGoal };
    } else if (action === GoalsActionsEnum.REMOVE_GOAL) {
        const { id } = payload as GoalsPayloadRemoveGoalType;
        const newState = { ...state };
        delete newState[id];
        return newState;
    } else if (action === GoalsActionsEnum.DELAY_GOAL) {
        const { id } = payload as GoalsPayloadDelayGoalType;
        const nextUnit = getNextUnit();
        const newState = { ...state };
        newState[id].unit_id = nextUnit;
        return newState;
    } else if (action === GoalsActionsEnum.CHANGE_TITLE) {
        const { id, title } = payload as GoalsPayloadChangeTitleType;
        const newState = { ...state };
        newState[id].title = title;
        return newState;
    } else if (action === GoalsActionsEnum.SET_COMPLETED) {
        const { id } = payload as GoalsPayloadSetCompletedType;
        const newState = { ...state };
        newState[id].completed = true;
        return newState;
    }
    return state;
};
