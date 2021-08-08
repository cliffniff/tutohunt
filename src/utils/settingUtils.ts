import { defaultSettings } from "../defaults/settings";
import { SettingsType, SortedSettingsType } from "../types/settingTypes";

export const initSettings = async (): Promise<SettingsType> => {
    try {
        const savedSettings = await getSettings();
        if (savedSettings) {
            return JSON.parse(savedSettings) as SettingsType;
        } else {
            throw new Error(
                `Saved settings are falsy. Initializing with default settings.`
            );
        }
    } catch (error) {
        console.error(error);
        return defaultSettings;
    }
};

export const sortSettings = (settings: SettingsType): SortedSettingsType => {
    let settingsTree: SortedSettingsType = {};
    Object.keys(settings).forEach((type) => {
        Object.keys(settings[type]).forEach((subtype) => {
            Object.keys(settings[type][subtype]).forEach((id) => {
                settingsTree[id] = { type, subtype };
            });
        });
    });
    return settingsTree;
};

export const getSettings = async (): Promise<string | false> => {
    try {
        const savedSettings = await chrome.storage.sync.get("settings");
        if (savedSettings) {
            return savedSettings.settings as string;
        } else {
            throw new Error(
                `Variable savedSettings is falsy - ${savedSettings}`
            );
        }
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const saveSettings = async (settings: string) => {
    try {
        await chrome.storage.sync.set({ settings: settings });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
