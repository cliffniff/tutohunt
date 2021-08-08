import * as React from "react";
import { useState, useContext, useMemo } from "react";
import { FiArrowLeft, FiBell, FiSliders } from "react-icons/fi";
import PageContext from "../contexts/PageContext";
import { SettingsContext } from "../contexts/SettingsContext";
import {
    ChangeSettingsMethodType,
    SettingsType,
    SettingsSubType,
} from "../types/settingTypes";
import "../styles/options.css";

const navIcons: { [name: string]: React.ReactNode } = {
    general: <FiSliders />,
    notifications: <FiBell />,
};

const Options: React.FC = () => {
    const setPage = useContext(PageContext);
    const { settings, updateSettings } = useContext(SettingsContext);

    const settingsTabs: string[] = useMemo(() => {
        return Object.keys(settings as {});
    }, []);

    console.log("Setting tabs -", settingsTabs);

    const [activeTab, setActiveTab] = useState(settingsTabs[0]);

    const renderTab = () => {
        const tabContent = (settings as { [key: string]: SettingsSubType })[
            activeTab
        ];

        console.log(activeTab, tabContent);

        for (let [subtitle, data] of Object.entries(tabContent)) {
            return (
                <div className="options-tab-category">
                    <span className="options-tab-subtitle">
                        {subtitle.charAt(0).toUpperCase() + subtitle.substr(1)}
                    </span>
                    <div className="options-tab-content">
                        {Object.keys(data).map((id) => {
                            let { title, type, value, description } = (
                                settings as SettingsType
                            )[activeTab][subtitle][id];
                            return (
                                <div key={id} className="options-tab-item">
                                    <span className="options-tab-item-title">
                                        {title}
                                    </span>
                                    {description && (
                                        <p className="options-tab-item-description">
                                            {description}
                                        </p>
                                    )}
                                    {typeof value === "string" ? (
                                        <input
                                            type={type}
                                            value={value as string}
                                            className="options-tab-item-input"
                                            onChange={(event) => {
                                                (
                                                    updateSettings as ChangeSettingsMethodType
                                                )(id, event.target.value);
                                            }}
                                        />
                                    ) : (
                                        <input
                                            type={type.toLowerCase()}
                                            checked={value as boolean}
                                            className="options-tab-item-input"
                                            onChange={(event) => {
                                                (
                                                    updateSettings as ChangeSettingsMethodType
                                                )(id, event.target.checked);
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
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
