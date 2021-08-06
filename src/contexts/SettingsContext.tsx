import * as React from "react";
import { useReducer } from "react";
import { createContext } from "react";
import initialSettings from "../initialSettings";
import settingsReducer, {
    SettingsActionTypes,
    SettingTypes,
} from "../reducers/settingsReducer";

export interface SettingsState {
    [settingType: string]: {
        [settingSubType: string]: {
            id: number;
            type: SettingTypes;
            title: string;
            description?: string;
            value: number | string | boolean;
        }[];
    };
}

export interface SettingsActions {
    type: SettingsActionTypes;
    setting: {
        id: number;
        value: string;
    };
}

export const SettingsContext = createContext<
    Partial<{
        settings: SettingsState;
        dispatch: React.Dispatch<SettingsActions>;
    }>
>({});

const SettingsContextProvider: React.FC = ({ children }) => {
    const [settings, dispatch] = useReducer(
        settingsReducer,
        {} as SettingsState,
        (state) => {
            let savedSettings = initialSettings;
            chrome.storage.sync.get(["settings"], ({ settings }) => {
                if (settings) {
                    savedSettings = JSON.parse(settings);
                }
            });
            return savedSettings;
        }
    );

    return (
        <SettingsContext.Provider value={{ settings, dispatch }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContextProvider;
