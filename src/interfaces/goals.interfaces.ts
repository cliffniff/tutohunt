import { GoalReducerActions } from "../enums/goals.enums";

// Interface of a single goal
export interface GoalIF {
    title: string;
    date: string;
    url: string;
    image: string;
    completed: boolean;
    unit_id: number;
}

// Array of "goal_id": {goal information}
export interface GoalsIF {
    [id: number]: GoalIF;
}

// Goal unit map "unit_id" = [array of goal ids]
export interface GoalUnitMapIF {
    [id: number]: string[];
}

// Goal reducer payload types
//ADD_GOAL
export interface GoalsReducerAddGoalIF {
    title: string;
    url: string;
    image: string;
}

//REMOVE_GOAL
export interface GoalsReducerRemoveGoalIF {
    id: number;
}

// CHANGE_TITLE
export interface GoalsReducerChangeTitleIF {
    id: number;
    title: string;
}

// SET_COMPLETED
export interface GoalsReducerSetCompletedIF {
    id: number;
}

// DELAY_GOAL
export interface GoalsReducerDelayGoalIF {
    id: number;
}
