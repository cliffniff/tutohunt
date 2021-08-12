import { err, ok, Result } from "neverthrow";

export const getCurrentTab = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            ([currentTab]) => {
                resolve(currentTab);
            }
        );
    });
};

export const captureTab = (): Promise<Result<string, unknown>> => {
    return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab((dataUrl) => {
            if (dataUrl) {
                resolve(ok(dataUrl));
            } else {
                resolve(
                    err(
                        new Error(
                            "DataUrl is " + typeof dataUrl + " - " + dataUrl
                        )
                    )
                );
            }
        });
    });
};

export const getTabTitle = (): Promise<Result<string, unknown>> => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab.title) {
                resolve(ok(tab.title));
            } else {
                resolve(err(new Error("Tab is " + typeof tab)));
            }
        });
    });
};

export const getTabURL = (): Promise<Result<string, unknown>> => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab.url) {
                resolve(ok(tab.url));
            } else {
                resolve(err(new Error("Tab is " + typeof tab)));
            }
        });
    });
};
