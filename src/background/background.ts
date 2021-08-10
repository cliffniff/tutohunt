import { SettingsIF } from "../interfaces/settings.interfaces";
import {
    ChromeMessageIF,
    ChromeMessageResponseIF,
} from "../interfaces/messages.interfaces";
import { getSettings, saveSettings } from "../utils/settings.utils";
import { defaultSettings } from "../common/defaultSettings";
import { ChromeMessages } from "../enums/messages.enums";

try {
    let settings: SettingsIF = {};

    chrome.runtime.onInstalled.addListener(() => {
        saveSettings(defaultSettings).then(() => {
            getSettings().then((settingsResponse) => {
                if (settingsResponse.value) {
                    settings = settingsResponse.value;
                }
                if (settingsResponse.error) {
                    throw settingsResponse.error;
                }
            });
        });
    });

    chrome.runtime.onStartup.addListener(() => {
        getSettings().then((settingsResponse) => {
            if (settingsResponse.value) {
                settings = settingsResponse.value;
            }
            if (settingsResponse.error) {
                saveSettings(defaultSettings).then(() => {
                    getSettings().then((settingsResponse) => {
                        if (settingsResponse.value) {
                            settings = settingsResponse.value;
                        }
                        if (settingsResponse.error) {
                            throw settingsResponse.error;
                        }
                    });
                });
            }
        });
    });

    chrome.runtime.onMessage.addListener(
        (
            { action, payload }: ChromeMessageIF<unknown>,
            sender: chrome.runtime.MessageSender,
            sendResponse: ({
                success,
                payload,
            }: ChromeMessageResponseIF<unknown>) => void
        ) => {
            switch (action) {
                case ChromeMessages.GET_SETTINGS:
                    sendResponse({
                        success: true,
                        payload: settings,
                    } as ChromeMessageResponseIF<SettingsIF>);
                    break;
                case ChromeMessages.SET_SETTINGS:
                    saveSettings(payload as SettingsIF).then(() => {
                        settings = payload as SettingsIF;
                        sendResponse({
                            success: true,
                        } as ChromeMessageResponseIF<undefined>);
                    });
                    break;
                case ChromeMessages.GET_GOALS:
                    sendResponse({
                        success: true,
                    });
                    break;
            }
            return true;
        }
    );
} catch (error) {
    console.error(error);
}
