module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
            { pattern: "**/*.unit.js", type: "module", included: true },
            { pattern: "**/*.js", type: "module", included: false },
            { pattern: "node_modules/**/*.js", type: "module", included: false }
        ],
        exclude: [],
        preprocessors: {},
        reporters: ["spec"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: true,
        concurrency: Infinity
    });
};
