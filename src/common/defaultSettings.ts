import { SettingsIds, SettingsValueTypes } from "../enums/settings.enums";
import { SettingsIF } from "../interfaces/settings.interfaces";

export const defaultSettings: SettingsIF = {
    general: {
        goals: {
            [SettingsIds.NO_OF_HOURS_PER_UNIT]: {
                type: SettingsValueTypes.TEXT,
                title: "No. of hours per unit",
                description:
                    "This setting decides the time period that your goals should divided into.",
                value: 24,
            },
            [SettingsIds.NO_OF_GOALS_PER_UNIT]: {
                type: SettingsValueTypes.TEXT,
                title: "Set the no. of goals per unit",
                description:
                    "This setting decided the no. of goals per one unit.",
                value: 5,
            },
            [SettingsIds.SHOW_NO_OF_GOALS_ON_ICON]: {
                type: SettingsValueTypes.CHECKBOX,
                title: "Show the no. of remaining goals on the icon ",
                value: false,
            },
        },
    },
    notifications: {
        notifications: {
            [SettingsIds.DISABLE_NOTIFICATIONS]: {
                type: SettingsValueTypes.CHECKBOX,
                title: "Disable notifications",
                value: false,
            },
        },
    },
};
