import {
    SettingsMessagesType,
    SettingsMessagesEnum,
    SettingsType,
} from "../types/settingTypes";
import { getSettings, initSettings, saveSettings } from "../utils/settingUtils";

let settings: SettingsType;

chrome.runtime.onInstalled.addListener(async () => {
    settings = await initSettings();
});

chrome.runtime.onStartup.addListener(async () => {
    settings = await initSettings();
});

chrome.runtime.onMessage.addListener(
    ({ message, payload }: SettingsMessagesType, sender, sendResponse) => {
        switch (message) {
            case SettingsMessagesEnum.GET_SETTINGS:
                sendResponse({ message: "", payload: settings });
                break;
            case SettingsMessagesEnum.SAVE_SETTINGS:
                saveSettings(JSON.stringify(payload));
                settings = payload;
                break;
        }
    }
);
