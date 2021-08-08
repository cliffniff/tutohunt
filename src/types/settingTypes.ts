export const enum SettingsInputTypesEnum {
    TEXT = "TEXT",
    CHECKBOX = "CHECKBOX",
}

export interface SettingsMessagesType {
    message: SettingsMessagesEnum;
    payload?: any;
}

export type SettingsType = {
    [settingType: string]: SettingsSubType;
};

export type SortedSettingsType = {
    [id: string]: {
        type: string;
        subtype: string;
    };
};

export type ChangeSettingsMethodType = (
    id: string,
    value: string | boolean
) => void;

export type SettingsSubType = {
    [settingSubType: string]: {
        [id: string]: {
            type: SettingsInputTypesEnum;
            title: string;
            description?: string;
            value: string | boolean;
        };
    };
};

export enum SettingsMessagesEnum {
    SAVE_SETTINGS,
    GET_SETTINGS,
}
