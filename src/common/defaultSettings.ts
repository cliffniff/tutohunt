import { SettingsValueTypes } from "../enums/settings.enums";
import { SettingsIF } from "../interfaces/settings.interfaces";

export const defaultSettings: SettingsIF = {
    general: {
        goals: {
            "0": {
                type: SettingsValueTypes.TEXT,
                title: "No. of hours per unit",
                description:
                    "This setting decides the time period that your goals should divided into.",
                value: "24",
            },
            "1": {
                type: SettingsValueTypes.TEXT,
                title: "Set the no. of goals per unit",
                description:
                    "This setting decided the no. of goals per one unit.",
                value: "5",
            },
            "2": {
                type: SettingsValueTypes.CHECKBOX,
                title: "Show the no. of remaining goals on the icon ",
                value: false,
            },
        },
    },
    notifications: {
        notifications: {
            "3": {
                type: SettingsValueTypes.CHECKBOX,
                title: "Disable notifications",
                value: false,
            },
        },
    },
};
