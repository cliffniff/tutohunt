import { err, ok, Result } from "neverthrow";
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
        chrome.storage.local.get(["settings"], ({ settings }) => {
            if (settings) {
                resolve(ok(JSON.parse(settings)));
            } else {
                resolve(err(new Error("Settings is " + settings)));
            }
        });
    });
};

// This function updates the settings in the local storage
export const saveSettings = (
    settings: SettingsIF
): Promise<Result<null, undefined>> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ settings: JSON.stringify(settings) }, () => {
            resolve(ok(null));
        });
    });
};
