import "react-devtools";
import * as React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";
import { PageContextProvider } from "./contexts/PageContext";
import SettingsContextProvider from "./contexts/SettingContext";
import "./styles/popup.css";
import ErrorBoundary from "./components/ErrorBoundary";

const Popup: React.FC = () => {
    const [page, setPage] = useState("home");

    const renderPage = () => {
        switch (page) {
            case "home":
                return <Home />;
            case "options":
                return (
                    <SettingsContextProvider>
                        <Options />
                    </SettingsContextProvider>
                );
        }
    };

    return (
        <div className="popup-wrapper">
            <ErrorBoundary>
                <PageContextProvider value={setPage}>
                    {renderPage()}
                </PageContextProvider>
            </ErrorBoundary>
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
