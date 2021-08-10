const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const src = path.join(__dirname, "src");

module.exports = {
    resolve: { extensions: [".js", ".ts", ".tsx"] },
    entry: {
        popup: path.join(src, "Popup.tsx"),
        content_script: path.join(src, "content-script/contentScript.tsx"),
        background: path.join(src, "background/background.ts"),
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            chunks: "initial",
            name: "vendor",
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css?$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "static" }],
        }),
    ],
};
