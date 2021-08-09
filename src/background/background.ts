import { SettingsIF } from "../interfaces/settings.interfaces";
import { ChromeMessageIF } from "../interfaces/messages.interfaces";
import { getSettings, saveSettings } from "../utils/settings.utils";
import { defaultSettings } from "../common/defaultSettings";
import { ChromeMessages } from "../enums/messages.enums";
import { ReturnStates } from "../enums/global.enums";

let settings: SettingsIF;

chrome.runtime.onInstalled.addListener(async () => {
    saveSettings(defaultSettings);
    const settingsResponse = await getSettings();
    settings = settingsResponse as SettingsIF;
});

chrome.runtime.onStartup.addListener(async () => {
    let settingsResponse = await getSettings();
    if (!settingsResponse) {
        await saveSettings(defaultSettings);
        settingsResponse = await getSettings();
    }
    settings = settingsResponse as SettingsIF;
});

chrome.runtime.onMessage.addListener(
    ({ action, payload }: ChromeMessageIF, sender, sendResponse) => {
        switch (action) {
            case ChromeMessages.GET_SETTINGS:
                sendResponse({
                    message: ReturnStates.SUCCESS,
                    payload: settings,
                });
                break;
            case ChromeMessages.SET_SETTINGS:
                saveSettings(payload as SettingsIF);
                settings = payload as SettingsIF;
                break;
            case ChromeMessages.GET_GOALS:
                break;
        }
    }
);
