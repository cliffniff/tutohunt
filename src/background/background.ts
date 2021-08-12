import { SettingsIF } from "../interfaces/settings.interfaces";
import {
    ChromeMessageIF,
    ChromeMessageResponseIF,
} from "../interfaces/messages.interfaces";
import { getSettings, saveSettings } from "../utils/settings.utils";
import { defaultSettings } from "../common/defaultSettings";
import { ChromeMessages } from "../enums/messages.enums";
import { captureTab } from "../utils/chrome.utils";

let settings: SettingsIF = {};

chrome.runtime.onInstalled.addListener(async () => {
    // saveSettings(defaultSettings).then(() => {
    //     getSettings().then((settingsResponse) => {
    //         if (settingsResponse.value) {
    //             settings = settingsResponse.value;
    //         }
    //         if (settingsResponse.error) {
    //             throw settingsResponse.error;
    //         }
    //     });
    // });
    console.log("Installed");
    const savedRes = await saveSettings(defaultSettings);
    if (savedRes.isOk()) {
        console.log("Settings saved succesfully");
        const settingsRes = await getSettings();
        if (settingsRes.isOk()) {
            console.log("Settings retrieved successfully");
            settings = settingsRes.value;
        } else {
            console.error(settingsRes.error);
        }
    } else {
        console.error(savedRes.error);
    }
    console.log(settings);
});

chrome.runtime.onStartup.addListener(async () => {
    // getSettings().then((settingsResponse) => {
    //     if (settingsResponse.value) {
    //         settings = settingsResponse.value;
    //     }
    //     if (settingsResponse.error) {
    //         saveSettings(defaultSettings).then(() => {
    //             getSettings().then((settingsResponse) => {
    //                 if (settingsResponse.value) {
    //                     settings = settingsResponse.value;
    //                 }
    //                 if (settingsResponse.error) {
    //                     throw settingsResponse.error;
    //                 }
    //             });
    //         });
    //     }
    // });
    const settingsRes = await getSettings();
    if (settingsRes.isOk()) {
        settings = settingsRes.value;
    } else {
        console.error(settingsRes.error);
    }
    console.log(settings);
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
        console.log("New message to background.ts", action, payload);

        (async () => {
            switch (action) {
                case ChromeMessages.GET_SETTINGS:
                    console.log("Background", settings);
                    sendResponse({
                        success: true,
                        payload: settings,
                    } as ChromeMessageResponseIF<SettingsIF>);
                    break;
                case ChromeMessages.SET_SETTINGS:
                    const savedRes = await saveSettings(payload as SettingsIF);
                    if (savedRes.isOk()) {
                        settings = payload as SettingsIF;
                        sendResponse({
                            success: true,
                        } as ChromeMessageResponseIF<undefined>);
                    } else {
                        sendResponse({
                            success: false,
                        } as ChromeMessageResponseIF<undefined>);
                        console.error(savedRes.error);
                    }

                    break;
                case ChromeMessages.GET_GOALS:
                    sendResponse({
                        success: true,
                    });
                    break;
                case ChromeMessages.CAPTURE_TAB:
                    const dataURl = await captureTab();
                    if (dataURl.isOk()) {
                        sendResponse({
                            success: true,
                            payload: dataURl.value,
                        } as ChromeMessageResponseIF<string>);
                    } else {
                        sendResponse({
                            success: false,
                            payload: dataURl.error,
                        } as ChromeMessageResponseIF<unknown>);
                        console.error(dataURl.error);
                    }
                    break;
            }
        })();
        return true;
    }
);
