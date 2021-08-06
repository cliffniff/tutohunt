import { SettingsState } from "./contexts/SettingsContext";
import { SettingTypes } from "./reducers/settingsReducer";

const initialSettings: SettingsState = {
    general: {
        goals: [
            {
                id: 0,
                type: SettingTypes.INPUT,
                title: "No. of hours per unit",
                description:
                    "This setting decides the time period that your goals should divided into.",
                value: 24,
            },
            {
                id: 1,
                type: SettingTypes.INPUT,
                title: "Set the no. of goals per unit",
                description:
                    "This setting decided the no. of goals per one unit.",
                value: 5,
            },
            {
                id: 2,
                type: SettingTypes.CHECKBOX,
                title: "Show the no. of remaining goals on the icon ",
                value: false,
            },
        ],
    },
    notifications: {
        notifications: [
            {
                id: 3,
                type: SettingTypes.CHECKBOX,
                title: "Disable notifications",
                value: false,
            },
        ],
    },
};

export default initialSettings;
