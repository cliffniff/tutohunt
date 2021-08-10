import { ChromeMessages } from "../enums/messages.enums";
export interface ChromeMessageIF<T> {
    action: ChromeMessages;
    payload?: T;
}

export interface ChromeMessageResponseIF<T> {
    success: boolean;
    payload?: T;
}
