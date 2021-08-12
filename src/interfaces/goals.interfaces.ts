import { GoalReducerActions } from "../enums/goals.enums";

// Interface of a single goal
export interface GoalIF {
    title: string;
    date: string;
    url: string;
    image: string;
    completed: boolean;
    unit_id: string;
}

// Array of "goal_id": {goal information}
export interface GoalsIF {
    [id: string]: GoalIF;
}

// Goal unit map "unit_id" = [array of goal ids]
export interface UnitsIF {
    [id: string]: string[];
}

// Goal reducer payload types
//ADD_GOAL
export interface GoalsReducerAddGoalIF {
    title: string;
    url: string;
    image: string;
    unit_id: string;
}

//REMOVE_GOAL
export interface GoalsReducerRemoveGoalIF {
    id: string;
}

// CHANGE_TITLE
export interface GoalsReducerChangeTitleIF {
    id: string;
    title: string;
}

// SET_COMPLETED
export interface GoalsReducerSetCompletedIF {
    id: string;
}

// DELAY_GOAL
export interface GoalsReducerDelayGoalIF {
    id: string;
    unit_id: string;
}
