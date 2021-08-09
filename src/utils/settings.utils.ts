import { defaultSettings } from "../common/defaultSettings";
import { ErrorCodes } from "../enums/errors.enums";
import { ReturnStates } from "../enums/global.enums";
import useLogger from "../hooks/useLogger";
import {} from "../interfaces/errors.interfaces";
import {
    SettingsIF,
    SortedSettingsIF,
} from "../interfaces/settings.interfaces";

// This function sorts the settings object so we can access settings by its id
export const sortSettings = (settings: SettingsIF): SortedSettingsIF => {
    let settingsTree: SortedSettingsIF = {};
    Object.keys(settings).forEach((type) => {
        Object.keys(settings[type]).forEach((subtype) => {
            Object.keys(settings[type][subtype]).forEach((id) => {
                settingsTree[id] = { type, subtype };
            });
        });
    });
    return settingsTree;
};

// This function returns the settings from local storage
export const getSettings = async (): Promise<ReturnStates | SettingsIF> => {
    try {
        const savedSettings = await chrome.storage.sync.get("settings");
        if (savedSettings) {
            return savedSettings.settings;
        } else {
            return ReturnStates.FAILURE;
        }
    } catch (error) {
        useLogger({
            code: ErrorCodes.IO_ERROR,
            message: error.message,
            name: "Error while retrieving settings",
        });
        return ReturnStates.FAILURE;
    }
};

// This function updates the settings in the local storage
export const saveSettings = async (settings: SettingsIF) => {
    try {
        await chrome.storage.sync.set({ settings: JSON.stringify(settings) });
        return ReturnStates.SUCCESS;
    } catch (error) {
        useLogger({
            code: ErrorCodes.IO_ERROR,
            message: error.message,
            name: "Error while saving settings",
        });
        return ReturnStates.FAILURE;
    }
};
