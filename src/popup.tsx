import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = () => {
    return (
        <div className="root">
            <h1>Hello World</h1>
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Popup />
    </React.StrictMode>,
    document.getElementById("root")
);
