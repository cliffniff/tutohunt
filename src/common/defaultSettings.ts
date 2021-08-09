import { SettingsInputTypes } from "../enums/settings.enums";
import { SettingsIF } from "../interfaces/settings.interfaces";

export const defaultSettings: SettingsIF = {
    general: {
        goals: {
            "0": {
                type: SettingsInputTypes.TEXT,
                title: "No. of hours per unit",
                description:
                    "This setting decides the time period that your goals should divided into.",
                value: "24",
            },
            "1": {
                type: SettingsInputTypes.TEXT,
                title: "Set the no. of goals per unit",
                description:
                    "This setting decided the no. of goals per one unit.",
                value: "5",
            },
            "2": {
                type: SettingsInputTypes.CHECKBOX,
                title: "Show the no. of remaining goals on the icon ",
                value: false,
            },
        },
    },
    notifications: {
        notifications: {
            "3": {
                type: SettingsInputTypes.CHECKBOX,
                title: "Disable notifications",
                value: false,
            },
        },
    },
};
