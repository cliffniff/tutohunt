// Import React
import * as React from "react";

// Import styles
import "../styles/goals.css";

// Import icons
import {
    FiClock,
    FiPlus,
    FiMenu,
    FiChevronUp,
    FiChevronDown,
} from "react-icons/fi";
import { useState } from "react";
import { useReducer } from "react";
import goalReducer, { GoalsReducerPayloadType } from "../reducers/goalReducer";
import {
    GoalIF,
    GoalsIF,
    GoalsReducerAddGoalIF,
    UnitsIF,
} from "../interfaces/goals.interfaces";
import { useRef } from "react";
import { useEffect } from "react";
import {
    ChromeMessageIF,
    ChromeMessageResponseIF,
} from "../interfaces/messages.interfaces";
import { ChromeMessages } from "../enums/messages.enums";
import { GoalReducerActions } from "../enums/goals.enums";
import { getTabTitle, getTabURL } from "../utils/chrome.utils";
import Goal from "./Goal";
import { createContext } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { getSettingValueIF, SettingsContext } from "../contexts/SettingContext";
import { SettingsIds } from "../enums/settings.enums";
import Modal from "./Modal";
interface GoalsContextValuesIF {
    activeTab: string;
    goals: GoalsIF;
    units: UnitsIF;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    goalsDispatch: React.Dispatch<GoalsReducerPayloadType>;
    setUnits: React.Dispatch<React.SetStateAction<UnitsIF>>;
    goalEntries: [string, GoalIF][];
    unitKeys: string[];
    getCurrentUnit: () => string;
    getNextUnit: () => string;
    getPrevUnit: () => string;
    createUnit: () => void;
}

export const GoalsContext = createContext<GoalsContextValuesIF>(
    {} as GoalsContextValuesIF
);

const GoalGroups: React.FC<{}> = () => {
    const { activeTab, setActiveTab } = useContext(GoalsContext);
    return (
        <div className="goals-groups">
            <div className="goals-groups-nav">
                <div
                    className={`goals-groups-item ${
                        activeTab === "all" ? "goals-groups-item-active" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("all");
                    }}>
                    <div className="goals-groups-item-icon">
                        <FiMenu />
                    </div>
                    <div className="goals-groups-item-text">All</div>
                </div>
                <div
                    className={`goals-groups-item ${
                        activeTab === "completed"
                            ? "goals-groups-item-active"
                            : ""
                    }`}
                    onClick={() => {
                        setActiveTab("completed");
                    }}>
                    <div className="goals-groups-item-icon">
                        <FiMenu />
                    </div>
                    <div className="goals-groups-item-text">Completed</div>
                </div>
                <div
                    className={`goals-groups-item ${
                        activeTab === "pending"
                            ? "goals-groups-item-active"
                            : ""
                    }`}
                    onClick={() => {
                        setActiveTab("pending");
                    }}>
                    <div className="goals-groups-item-icon">
                        <FiClock />
                    </div>
                    <div className="goals-groups-item-text">Pending</div>
                </div>
            </div>
            <div className="goals-groups-item goals-groups-item-add">
                <div className="goals-groups-item-icon">
                    <FiPlus />
                </div>
                <div className="goals-groups-item-text">Add</div>
            </div>
        </div>
    );
};

const CreateGoalModal: React.FC<{}> = () => {
    const { goalsDispatch, getCurrentUnit } = useContext(GoalsContext);

    const [isCreateGoalOpen, setCreateGoalOpen] = useState(false);

    const titleInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);

    const createGoalImage = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            chrome.runtime.sendMessage<ChromeMessageIF<undefined>>(
                { action: ChromeMessages.CAPTURE_TAB },
                ({
                    success,
                    payload,
                }: ChromeMessageResponseIF<string | unknown>) => {
                    if (success) {
                        (
                            createGoalImage.current as HTMLDivElement
                        ).style.backgroundImage = `url('${payload}')`;
                        (imageInput.current as HTMLInputElement).value =
                            payload as string;
                    } else {
                        throw payload;
                    }
                }
            );
            const titlePromise = getTabTitle();
            const urlPromise = getTabURL();
            const [title, url] = await Promise.all([titlePromise, urlPromise]);
            if (title.isOk()) {
                (titleInput.current as HTMLInputElement).value = title.value;
            }
            if (url.isOk()) {
                (urlInput.current as HTMLInputElement).value = url.value;
            }
        })();
    }, []);

    return (
        <div
            className={`goals-create-wrapper ${
                isCreateGoalOpen ? "" : "goals-create-wrapper-hidden"
            }`}>
            <div
                className="goals-create-topbar"
                onClick={() => {
                    setCreateGoalOpen(!isCreateGoalOpen);
                }}>
                <div className="goals-create-topbar-icon">
                    {isCreateGoalOpen ? <FiChevronDown /> : <FiChevronUp />}
                </div>
                <div className="goals-create-topbar-text">Add new goal</div>
            </div>
            <div className="goals-create-hidden">
                <div
                    ref={createGoalImage}
                    className="goals-create-hidden-image"></div>
                <input
                    ref={titleInput}
                    type="text"
                    placeholder="Title"
                    className="goals-create-hidden-input"
                />
                <input
                    ref={urlInput}
                    type="url"
                    placeholder="URL"
                    className="goals-create-hidden-input"
                />
                <input ref={imageInput} type="hidden" />
                <div
                    className="goals-create-hidden-button-wrapper"
                    onClick={() => {
                        const currentUnit = getCurrentUnit();
                        goalsDispatch({
                            action: GoalReducerActions.ADD_GOAL,
                            payload: {
                                image: imageInput.current?.value,
                                title: titleInput.current?.value,
                                url: urlInput.current?.value,
                                unit_id: currentUnit,
                            } as GoalsReducerAddGoalIF,
                        });
                    }}>
                    <div className="goals-create-hidden-button-icon">
                        <FiPlus />
                    </div>
                    <span className="goals-create-hidden-span">Add goal</span>
                </div>
            </div>
        </div>
    );
};

const ActiveTabAll: React.FC<{}> = () => {
    const { goals, goalEntries } = useContext(GoalsContext);
    return (
        <div className="goals-content-category">
            <div className="goals-content-subtitle">All Goals</div>
            <div className="goals-content-list">
                {goalEntries.length === 0 ? (
                    <div className="goals-content-empty">Empty</div>
                ) : (
                    ""
                )}
                {goalEntries.map(([id, values]) => {
                    return <Goal key={id} id={id} {...values} />;
                })}
            </div>
        </div>
    );
};

const ActiveTabCompleted: React.FC<{}> = () => {
    const { goals, goalEntries } = useContext(GoalsContext);
    const completedGoals = useMemo(
        () => goalEntries.filter(([id, { completed }]) => completed),
        [goals]
    );
    return (
        <div className="goals-content-category">
            <div className="goals-content-subtitle">Completed</div>
            <div className="goals-content-list">
                {completedGoals.length === 0 ? (
                    <div className="goals-content-empty">Empty</div>
                ) : (
                    ""
                )}
                {completedGoals.map(([id, values]) => {
                    return <Goal key={id} id={id} {...values} />;
                })}
            </div>
        </div>
    );
};

const ActiveTabPending: React.FC<{}> = () => {
    const { goals, goalEntries, getCurrentUnit, getNextUnit, getPrevUnit } =
        useContext(GoalsContext);

    const pendingGoals = useMemo(
        () => goalEntries?.filter(([id, { completed }]) => !completed),
        [goals]
    );

    const currentUnit = getCurrentUnit();
    const nextUnit = getNextUnit();
    const prevUnit = getPrevUnit();

    const sortedGoals: { [unitName: string]: [id: string, goal: GoalIF][] } = {
        previous: [],
        current: [],
        next: [],
    };

    pendingGoals.map(([id, goal]) => {
        if (goal.unit_id === currentUnit) {
            sortedGoals.current.push([id, goal]);
        } else if (goal.unit_id === nextUnit) {
            sortedGoals.next.push([id, goal]);
        } else if (goal.unit_id === prevUnit) {
            sortedGoals.previous.push([id, goal]);
        }
    });

    return (
        <div className="goals-content-category">
            {pendingGoals.length === 0 ? (
                <>
                    <div className="goals-content-subtitle">Pending</div>
                    <div className="goals-content-list">
                        <div className="goals-content-empty">Empty</div>
                    </div>
                </>
            ) : (
                ""
            )}
            {Object.keys(sortedGoals).map((unitName) => {
                const unitContent = sortedGoals[unitName];
                if (unitContent.length > 0) {
                    return (
                        <>
                            <div className="goals-content-subtitle">
                                {unitName.charAt(0).toUpperCase() +
                                    unitName.substr(1)}{" "}
                                unit
                            </div>
                            <div className="goals-content-list">
                                {unitContent.map(([id, goalValues]) => {
                                    return (
                                        <Goal
                                            key={id}
                                            id={id}
                                            {...goalValues}
                                        />
                                    );
                                })}
                            </div>
                        </>
                    );
                }
            })}
        </div>
    );
};

const GoalContent: React.FC<{}> = () => {
    const { activeTab, goals } = useContext(GoalsContext);

    const getActiveTabComponent = (): JSX.Element => {
        switch (activeTab) {
            case "all":
                return <ActiveTabAll />;
            case "completed":
                return <ActiveTabCompleted />;
            case "pending":
                return <ActiveTabPending />;
            default:
                return <ActiveTabAll />;
        }
    };

    const activeTabComponent: JSX.Element = useMemo(getActiveTabComponent, [
        activeTab,
    ]);

    return (
        <div className="goals-content">
            <div className="goals-content-wrapper">{activeTabComponent}</div>
            <CreateGoalModal />
        </div>
    );
};

const Goals: React.FC = () => {
    // Active tab state
    const [activeTab, setActiveTab] = useState<string>("all");
    const { getSettingValue } = useContext(SettingsContext);
    // Goal Reducer
    const [goals, goalsDispatch] = useReducer(goalReducer, {});
    // Units state
    const [units, setUnits] = useState<UnitsIF>({});

    const goalEntries = useMemo(() => Object.entries(goals), [goals]);
    const unitKeys = useMemo(() => Object.keys(units), [units]);

    useEffect(() => {
        chrome.storage.local.get(["goals"], ({ goals: savedGoals }) => {
            if (savedGoals) {
                goalsDispatch({
                    action: GoalReducerActions.REPLACE_STATE,
                    payload: JSON.parse(savedGoals),
                });
            }
        });

        chrome.storage.local.get(["units"], ({ units: savedUnits }) => {
            if (savedUnits) {
                setUnits(JSON.parse(savedUnits));
            } else {
                setUnits({ [Date.now().toString()]: [] });
            }
        });
    }, []);

    useEffect(() => {
        if (unitKeys.length !== 0) {
            chrome.storage.local.set({ units: JSON.stringify(units) }, () => {
                console.log("Saved units to local storage", units);
            });
        }
    }, [units]);

    useEffect(() => {
        if (goalEntries.length !== 0) {
            chrome.storage.local.set({ goals: JSON.stringify(goals) }, () => {
                console.log("Saved goals to local storage", goals);
            });
        }
    }, [goals]);

    const getCurrentUnit = () => {
        // Current unit is no. of goals divided by no. of goals per unit
        const noGoalsPerUnit = getSettingValue?.(
            SettingsIds.NO_OF_GOALS_PER_UNIT
        ) as number;
        const currentUnit = Math.floor(goalEntries.length / noGoalsPerUnit);
        return unitKeys[currentUnit];
    };

    const getNextUnit = () => {
        const currentUnit = getCurrentUnit();
        const nextUnit = unitKeys[unitKeys.indexOf(currentUnit) + 1];
        if (unitKeys.length <= 1 || !nextUnit) {
            return createUnit();
        } else {
            return nextUnit;
        }
    };

    const getPrevUnit = () => {
        const currentUnit = getCurrentUnit();
        const prevUnit = unitKeys[unitKeys.indexOf(currentUnit) - 1];
        return prevUnit;
    };

    const createUnit = () => {
        const unit_id = Date.now().toString();
        setUnits({ ...units, [unit_id]: [] });
        return unit_id;
    };

    return (
        <GoalsContext.Provider
            value={{
                activeTab,
                goals,
                units,
                setActiveTab,
                goalsDispatch,
                setUnits,
                goalEntries,
                unitKeys,
                getCurrentUnit,
                getNextUnit,
                getPrevUnit,
                createUnit,
            }}>
            <div className="goals-wrapper">
                <GoalGroups />
                <GoalContent />
            </div>
        </GoalsContext.Provider>
    );
};

export default Goals;
