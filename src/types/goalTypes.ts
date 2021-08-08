export enum GoalsActionsEnum {
    ADD_GOAL,
    REMOVE_GOAL,
    CHANGE_TITLE,
    SET_COMPLETED,
    DELAY_GOAL,
}

export interface GoalsUnitsType {
    [id: number]: string[];
}

export interface GoalsItemType {
    title: string;
    date: string;
    url: string;
    image: string;
    completed: boolean;
    unit_id: number;
}

export interface GoalsType {
    [id: number]: GoalsItemType;
}

//ADD_GOAL
export interface GoalsPayloadAddGoalType {
    title: string;
    url: string;
    image: string;
}

//REMOVE_GOAL
export interface GoalsPayloadRemoveGoalType {
    id: number;
}

// CHANGE_TITLE
export interface GoalsPayloadChangeTitleType {
    id: number;
    title: string;
}

// SET_COMPLETED
export interface GoalsPayloadSetCompletedType {
    id: number;
}

// DELAY_GOAL
export interface GoalsPayloadDelayGoalType {
    id: number;
}
export interface GoalsReducerType {
    <
        PayloadType extends
            | GoalsPayloadAddGoalType
            | GoalsPayloadRemoveGoalType
            | GoalsPayloadChangeTitleType
            | GoalsPayloadSetCompletedType
            | GoalsPayloadDelayGoalType
    >(
        state: GoalsType,
        { action, payload }: { action: GoalsActionsEnum; payload: PayloadType }
    ): GoalsType;
}
