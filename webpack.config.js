const path = require("path");
const Dotenv = require('dotenv-webpack');
// const PACKAGE = require('./package.json');
// const version = PACKAGE.version;

const config = {

    entry: {
        index: './src/index.js',
    },

    // experiments: {
    //     outputModule: true,
    // },

    output: {
        path: path.resolve(__dirname, "./dist"),
        // filename: `chmap-utilities-${version}.js`,
        filename: `chmap-utilities.js`,
        // environment: { module: true },
        library: {
            name: "chmapUtilities",
            type: 'umd',
        }
    },

    externals: {
        bootstrap: true
    },

    // Define development options
    devtool: "source-map",

    performance: {
        hints: false,
    },

    plugins: []

};


module.exports = (webpackEnv, argV) => {

    const isProduction = (argV.mode === "production");

    const dotenvCfg =  { path: "./.env_dev" };

    if (isProduction) {
        config.performance.hints = 'warning';
        dotenvCfg.path = "./.env_prd";
    }

    // Load .env_dev file for environment variables in JS
    config.plugins.push(new Dotenv(dotenvCfg))

    return config;
};
