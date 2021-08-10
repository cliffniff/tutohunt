const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const path = require("path");
const src = path.join(__dirname, "src");

module.exports = merge(
    {
        mode: "development",
        devtool: "inline-source-map",
    },
    commonConfig
);
