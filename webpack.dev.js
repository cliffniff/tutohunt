const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = merge(
    {
        mode: "development",
        devtool: "inline-source-map",
    },
    commonConfig
);
