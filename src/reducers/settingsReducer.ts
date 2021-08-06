import { SettingsActions, SettingsState } from "../contexts/SettingsContext";

export const enum SettingsActionTypes {
    CHANGE_SETTING = "CHANGE_SETTING",
}

export const enum SettingTypes {
    INPUT = "INPUT",
    CHECKBOX = "CHECKBOX",
}

const settingsReducer = (
    state: SettingsState,
    action: SettingsActions
): SettingsState => {
    return {} as SettingsState;
};

export default settingsReducer;
