import * as React from "react";
import "../styles/errorBoundary.css";

class ErrorBoundary extends React.Component<{ children?: React.ReactNode }> {
    state: {
        hasError: boolean;
        error: unknown;
    };
    constructor(props: { children?: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: new Error() };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-wrapper">
                    <h1 className="error-title">Something went wrong.</h1>
                    <p className="error-name">
                        {(this.state.error as Error).name as string}
                    </p>
                    <p className="error-message">
                        {(this.state.error as Error).message as string}
                    </p>
                    <p className="error-stack">
                        <div id="error-stack-info" hidden>
                            {btoa(
                                `Stack:${
                                    (this.state.error as Error).stack
                                }, Message:${
                                    (this.state.error as Error).message
                                }`
                            )}
                        </div>
                        <button
                            onClick={() => {
                                const text =
                                    document.getElementById(
                                        "error-stack-info"
                                    )?.innerText;
                                navigator.clipboard
                                    .writeText(text as string)
                                    .then(() => {
                                        (
                                            document.getElementById(
                                                "error-copied-notice"
                                            ) as HTMLElement
                                        ).hidden = false;
                                    });
                            }}
                        >
                            Copy technical information
                        </button>
                        <p id="error-copied-notice" hidden>
                            Text copied to clipboard!
                        </p>
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
