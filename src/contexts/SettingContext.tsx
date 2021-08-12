// Imports

import * as React from "react";
import { useEffect, useState, createContext } from "react";
import {
    SettingsIF,
    SortedSettingsIF,
} from "../interfaces/settings.interfaces";
import { sortSettings } from "../utils/settings.utils";
import { ChromeMessages } from "../enums/messages.enums";
import {
    ChromeMessageIF,
    ChromeMessageResponseIF,
} from "../interfaces/messages.interfaces";
import { defaultSettings } from "../common/defaultSettings";
import { SettingsIds } from "../enums/settings.enums";
import { useMemo } from "react";

//Initialiizing Context

export const SettingsContext = createContext<
    Partial<{
        settings: SettingsIF;
        updateSettings: UpdateSettingsIF;
        getSettingValue: getSettingValueIF;
    }>
>({});

export interface UpdateSettingsIF {
    (id: string, value: string | boolean | number): void;
}

export interface getSettingValueIF {
    (id: SettingsIds): string | boolean | number;
}

// Context Provider

const SettingsContextProvider: React.FC = ({ children }) => {
    // Initializing settings state

    const [settings, setSettings] = useState<SettingsIF>(defaultSettings);

    useEffect(() => {
        chrome.runtime.sendMessage<ChromeMessageIF<undefined>>(
            { action: ChromeMessages.GET_SETTINGS },
            ({ success, payload }: ChromeMessageResponseIF<SettingsIF>) => {
                if (success) {
                    console.log("Settings Context", payload);
                    setSettings(payload!);
                } else {
                    console.error("Retrieving settings payload");
                }
            }
        );
    }, []);

    // Initializing and memoizing the setting index map

    const sortedSettings: SortedSettingsIF = useMemo(
        () => sortSettings(settings),
        [settings]
    );

    console.log(sortedSettings);

    // Initializing settings update funtion

    const updateSettings: UpdateSettingsIF = (id, value) => {
        console.log(id, typeof value);
        const valuePath = sortedSettings[id];
        const newSettings: SettingsIF = { ...settings };
        newSettings[valuePath.type][valuePath.subtype][id].value = value;

        chrome.runtime.sendMessage(
            {
                action: ChromeMessages.SET_SETTINGS,
                payload: newSettings,
            },
            ({ success }: ChromeMessageResponseIF<undefined>) => {
                if (success) {
                    setSettings(newSettings);
                } else {
                    throw new Error(`Error while saving settings`);
                }
            }
        );
    };

    const getSettingValue: getSettingValueIF = (id) => {
        console.log(sortedSettings);
        return sortedSettings[id].value;
    };

    return (
        <SettingsContext.Provider
            value={{ settings, updateSettings, getSettingValue }}>
            {settings && children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
