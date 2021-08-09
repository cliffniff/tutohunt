import * as React from "react";
import { useState } from "react";
import { createContext } from "react";
import { GenericErrorIF } from "../interfaces/errors.interfaces";

export interface LoggerSetErrorInterface {
    (error: GenericErrorIF): void;
}

// Logger context will contain the function to set an error.
export const LoggerContext = createContext<Partial<LoggerSetErrorInterface>>(
    {}
);

const LoggerContextProvider: React.FC = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    let lastError: Partial<GenericErrorIF> = {};

    const setError: LoggerSetErrorInterface = (error: GenericErrorIF) => {
        lastError = error;
        setHasError(true);
    };

    return (
        <LoggerContext.Provider value={setError}>
            {hasError && (
                <div className="error-wrapper">
                    <div className="error-title">Something went wrong!</div>
                    <div className="error-name">
                        {lastError.code} - {lastError.name}
                    </div>
                    <div className="error-message">{lastError.message}</div>
                    <button className="error-button" onClick={window.close}>
                        Close
                    </button>
                </div>
            )}
            {children}
        </LoggerContext.Provider>
    );
};

export default LoggerContextProvider;
