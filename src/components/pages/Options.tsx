import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import { FiArrowLeft, FiBell, FiSliders } from "react-icons/fi";
import PageContext from "../../contexts/PageContext";
import {
    SettingsActions,
    SettingsContext,
} from "../../contexts/SettingsContext";
import {
    SettingsActionTypes,
    SettingTypes,
} from "../../reducers/settingsReducer";
import "../../styles/options.css";

const navIcons: { [name: string]: React.ReactNode } = {
    general: <FiSliders />,
    notifications: <FiBell />,
};

interface TabContentShape {
    [settingSubType: string]: {
        id: number;
        type: SettingTypes;
        title: string;
        description?: string;
        value: number | string | boolean;
    }[];
}

const Options: React.FC = () => {
    const setPage = useContext(PageContext);
    const { settings, dispatch } = useContext(SettingsContext);
    const settingsTabs: string[] = Object.keys(settings as {});
    const [activeTab, setActiveTab] = useState(settingsTabs[0]);

    const renderTab = () => {
        const tabContent = (settings as { [key: string]: TabContentShape })[
            activeTab
        ];

        for (let [subtitle, data] of Object.entries(tabContent)) {
            return (
                <div className="options-tab-category">
                    <span className="options-tab-subtitle">{subtitle}</span>
                    {data.map(({ id, type, title, value, description }) => {
                        switch (type) {
                            case SettingTypes.INPUT:
                                return (
                                    <div key={id} className="options-tab-item">
                                        <span className="options-tab-item-title">
                                            {title}
                                        </span>
                                        <p className="options-tab-item-description">
                                            {description}
                                        </p>
                                        <input
                                            type="text"
                                            value={value as string}
                                            className="options-tab-item-input"
                                            onChange={(event) => {
                                                (
                                                    dispatch as React.Dispatch<SettingsActions>
                                                )({
                                                    type: SettingsActionTypes.CHANGE_SETTING,
                                                    setting: {
                                                        id,
                                                        value: event.target
                                                            .value,
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                );
                        }
                    })}
                </div>
            );
        }
    };

    return (
        <div className="options-wrapper">
            <div className="options-topbar">
                <div
                    className="options-topbar-btn"
                    onClick={() => {
                        setPage("home");
                    }}
                >
                    <FiArrowLeft />
                </div>
                <div className="options-topbar-title">Options</div>
            </div>
            <div className="options-content">
                <div className="options-navbar">
                    {settingsTabs.map((settingTab) => {
                        return (
                            <div
                                key={settingTab}
                                className={`options-nav-item ${
                                    activeTab === settingTab
                                        ? "options-nav-item-active"
                                        : ""
                                }`}
                                onClick={() => {
                                    setActiveTab(settingTab);
                                }}
                            >
                                <div className="options-nav-item-icon">
                                    {navIcons[settingTab]}
                                </div>
                                <div className="options-nav-item-text">
                                    {settingTab.charAt(0).toUpperCase() +
                                        settingTab.substr(1)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="options-tab-wrapper">{renderTab()}</div>
            </div>
        </div>
    );
};

export default Options;
