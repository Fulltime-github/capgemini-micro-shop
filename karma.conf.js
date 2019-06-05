module.exports = (config) => {
    config.set({
        frameworks: [ 'jasmine', 'karma-typescript' ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-typescript',
            'karma-spec-reporter'
        ],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json",
        },
        client: {
            // leave Jasmine Spec Runner output visible in browser
            clearContext: false
        },
        files: [
            "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",
            "node_modules/@webcomponents/custom-elements/src/native-shim.js",
            { pattern: 'src/**/*.ts' }
        ],
        preprocessors: {
            'src/**/*.ts': [ 'karma-typescript' ]
        },
        reporters: [ 'spec', 'karma-typescript' ],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ 'Chrome' ],
        singleRun: true
    })
};
