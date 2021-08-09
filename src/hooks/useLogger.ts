import { useContext } from "react";
import {
    LoggerContext,
    LoggerSetErrorInterface,
} from "../contexts/LoggerContext";
import { ErrorCodes } from "../enums/errors.enums";
import { GenericErrorIF } from "../interfaces/errors.interfaces";

const useLogger = (payload: GenericErrorIF | string) => {
    const setError = useContext(LoggerContext);

    const trace = new Error().stack as string;

    const logError = (code: ErrorCodes, message: string, name: string) => {
        (setError as LoggerSetErrorInterface)({ code, message, name, trace });
    };

    const logMessage = (message: string) => {
        console.log(message, trace);
    };

    if (typeof payload === "object") {
        payload = payload as GenericErrorIF;
        logError(payload.code, payload.message, payload.name);
    } else {
        logMessage(payload as string);
    }
};

export default useLogger;
