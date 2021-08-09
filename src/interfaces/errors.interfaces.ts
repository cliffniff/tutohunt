import { ErrorCodes } from "../enums/errors.enums";

export interface GenericErrorIF {
    name: string;
    code: ErrorCodes;
    message: string;
    trace?: string;
}
