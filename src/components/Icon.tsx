import React from "react";

const Icon = ({ name }: { name: string }) => {
    return (
        <svg>
            <use href={"../static/icons.svg#" + name} />
        </svg>
    );
};

export default Icon;
