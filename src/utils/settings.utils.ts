import { Result } from "../interfaces/common.interfaces";
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
                const value = settings[type][subtype][id].value;
                settingsTree[id] = { type, subtype, value };
            });
        });
    });
    return settingsTree;
};

// This function returns the settings from local storage
export const getSettings = (): Promise<Result<SettingsIF, Error>> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("settings", ({ settings }) => {
            if (settings) {
                resolve({ value: JSON.parse(settings) });
            } else {
                reject({ error: new Error("Error while reading settings") });
            }
        });
    });
};

// This function updates the settings in the local storage
export const saveSettings = (
    settings: SettingsIF
): Promise<Result<boolean, undefined>> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set({ settings: JSON.stringify(settings) }, () => {
            resolve({ value: true });
        });
    });
};
