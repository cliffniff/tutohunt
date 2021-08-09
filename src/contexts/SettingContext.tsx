// Imports

import * as React from "react";
import { useEffect, useState, createContext } from "react";
import {
    SettingsIF,
    SortedSettingsIF,
} from "../interfaces/settings.interfaces";
import { sortSettings } from "../utils/settings.utils";
import { ChromeMessages } from "../enums/messages.enums";

//Initialiizing Context

export const SettingsContext = createContext<
    Partial<{
        settings: SettingsIF;
        updateSettings: UpdateSettingsIF;
    }>
>({});

export interface UpdateSettingsIF {
    (id: string, value: string | boolean): void;
}

// Context Provider

const SettingsContextProvider: React.FC = ({ children }) => {
    // Initializing settings state

    const [settings, setSettings] = useState<SettingsIF>();

    useEffect(() => {
        chrome.runtime.sendMessage(
            { message: ChromeMessages.GET_SETTINGS },
            ({ message, payload }) => {
                setSettings(payload);
            }
        );
    }, []);

    // Initializing and memoizing the setting index map

    const settingsTree: SortedSettingsIF | undefined =
        settings && sortSettings(settings as SettingsIF);

    // Initializing settings update funtion

    const updateSettings: UpdateSettingsIF = (id, value) => {
        const valuePath = (settingsTree as SortedSettingsIF)[id];
        const newSettings: SettingsIF = { ...settings };
        newSettings[valuePath.type][valuePath.subtype][id].value = value;

        chrome.runtime.sendMessage({
            message: ChromeMessages.SET_SETTINGS,
            payload: newSettings,
        });

        setSettings(newSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {settings && children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
