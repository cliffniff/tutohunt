import * as React from "react";
import { useState, useContext, useMemo } from "react";
import { FiArrowLeft, FiBell, FiSliders } from "react-icons/fi";
import PageContext from "../contexts/PageContext";
import { SettingsContext, UpdateSettingsIF } from "../contexts/SettingContext";
import { SettingsIF, SubSettingIF } from "../interfaces/settings.interfaces";
import "../styles/options.css";

const navIcons: { [name: string]: React.ReactNode } = {
    general: <FiSliders />,
    notifications: <FiBell />,
};

const OptionsNavbar: React.FC<{
    settingsTabs: string[];
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}> = ({ settingsTabs, activeTab, setActiveTab }) => {
    return (
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
                        }}>
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
    );
};

const OptionsContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
    const { settings, updateSettings } = useContext(SettingsContext);

    console.log(settings);

    const renderTab = () => {
        const tabContent = settings![activeTab];

        for (let [subtitle, data] of Object.entries(tabContent)) {
            return (
                <div className="options-tab-category">
                    <span className="options-tab-subtitle">
                        {subtitle.charAt(0).toUpperCase() + subtitle.substr(1)}
                    </span>
                    <div className="options-tab-content">
                        {Object.keys(data).map((id) => {
                            let { title, type, value, description } =
                                settings![activeTab][subtitle][id];
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
                                    {console.log(value)}
                                    {typeof value !== "boolean" ? (
                                        <input
                                            type={type}
                                            value={value as string}
                                            className="options-tab-item-input"
                                            onChange={(event) => {
                                                updateSettings!(
                                                    id,
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    ) : (
                                        <input
                                            type={type.toLowerCase()}
                                            checked={value as boolean}
                                            className="options-tab-item-input"
                                            onChange={(event) => {
                                                console.log(
                                                    typeof event.target.checked
                                                );
                                                updateSettings!(
                                                    id,
                                                    event.target.checked
                                                );
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
    return <div className="options-tab-wrapper">{renderTab()}</div>;
};

const Options: React.FC = () => {
    const setPage = useContext(PageContext);
    const { settings } = useContext(SettingsContext);

    const settingsTabs: string[] = useMemo(() => {
        return Object.keys(settings!);
    }, [settings]);

    const [activeTab, setActiveTab] = useState(settingsTabs[0]);

    return (
        <div className="options-wrapper">
            <div className="options-topbar">
                <div
                    className="options-topbar-btn"
                    onClick={() => setPage("home")}>
                    <FiArrowLeft />
                </div>
                <div className="options-topbar-title">Options</div>
            </div>
            <div className="options-content">
                <OptionsNavbar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    settingsTabs={settingsTabs}
                />
                <OptionsContent activeTab={activeTab} />
            </div>
        </div>
    );
};

export default Options;
