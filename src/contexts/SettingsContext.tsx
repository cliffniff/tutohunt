// Imports

import * as React from "react";
import { useEffect, useState, createContext } from "react";
import {
    SettingsType,
    ChangeSettingsMethodType,
    SortedSettingsType,
    SettingsMessagesEnum,
} from "../types/settingTypes";
import { sortSettings } from "../utils/settingUtils";

//Initialiizing Context

export const SettingsContext = createContext<
    Partial<{
        settings: SettingsType;
        updateSettings: ChangeSettingsMethodType;
    }>
>({});

// Context Provider

const SettingsContextProvider: React.FC = ({ children }) => {
    // Initializing settings state

    const [settings, setSettings] = useState<SettingsType>();

    useEffect(() => {
        chrome.runtime.sendMessage(
            { message: SettingsMessagesEnum.GET_SETTINGS },
            ({ message, payload }) => {
                setSettings(payload);
            }
        );
    }, []);

    // Initializing and memoizing the setting index map

    const settingsTree: SortedSettingsType | undefined =
        settings && sortSettings(settings as SettingsType);

    // Initializing settings update funtion

    const updateSettings: ChangeSettingsMethodType = (id, value) => {
        const valuePath = (settingsTree as SortedSettingsType)[id];
        const newSettings: SettingsType = { ...settings };
        newSettings[valuePath.type][valuePath.subtype][id].value = value;

        chrome.runtime.sendMessage({
            message: SettingsMessagesEnum.SAVE_SETTINGS,
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
