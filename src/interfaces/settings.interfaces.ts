// import { MessagesEnum } from "./message.types";

import { SettingsValueTypes } from "../enums/settings.enums";

// Move this to a new file

export interface SettingsIF {
    [settingType: string]: SubSettingIF;
}

export interface SortedSettingsIF {
    [id: string]: {
        type: string;
        subtype: string;
        value: string | boolean;
    };
}

export interface SubSettingIF {
    [settingSubType: string]: {
        [id: string]: {
            type: SettingsValueTypes;
            title: string;
            description?: string;
            value: string | boolean;
        };
    };
}
