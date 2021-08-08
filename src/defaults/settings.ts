import { SettingsInputTypesEnum, SettingsType } from "../types/settingTypes";

export const defaultSettings: SettingsType = {
    general: {
        goals: {
            "0": {
                type: SettingsInputTypesEnum.TEXT,
                title: "No. of hours per unit",
                description:
                    "This setting decides the time period that your goals should divided into.",
                value: "24",
            },
            "1": {
                type: SettingsInputTypesEnum.TEXT,
                title: "Set the no. of goals per unit",
                description:
                    "This setting decided the no. of goals per one unit.",
                value: "5",
            },
            "2": {
                type: SettingsInputTypesEnum.CHECKBOX,
                title: "Show the no. of remaining goals on the icon ",
                value: false,
            },
        },
    },
    notifications: {
        notifications: {
            "3": {
                type: SettingsInputTypesEnum.CHECKBOX,
                title: "Disable notifications",
                value: false,
            },
        },
    },
};
