// import { MessagesEnum } from "./message.types";

import { SettingsInputTypes } from "../enums/settings.enums";

// Move this to a new file

export interface SettingsIF {
    [settingType: string]: SubSettingIF;
}

export interface SortedSettingsIF {
    [id: string]: {
        type: string;
        subtype: string;
    };
}

export interface SubSettingIF {
    [settingSubType: string]: {
        [id: string]: {
            type: SettingsInputTypes;
            title: string;
            description?: string;
            value: string | boolean;
        };
    };
}
