import { ChromeMessages } from "../enums/messages.enums";
import { GoalsIF } from "./goals.interfaces";
import { SettingsIF } from "./settings.interfaces";

export interface ChromeMessageIF {
    action: ChromeMessages;
    payload?: GoalsIF | SettingsIF;
}
