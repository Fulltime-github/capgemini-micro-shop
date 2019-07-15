module.exports = (config) => {
    //var sourcePreprocessors = 'coverage';
    function isDebug(argument) {
        return argument === '--debug';
    }
    //sourcePreprocessors = [];


    config.set({
        frameworks: [ 'jasmine', 'karma-typescript' ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-typescript',
            'karma-spec-reporter',
            'karma-sourcemap-loader',
            'karma-coverage'
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
           // 'index.js': sourcePreprocessors,
            'src/**/*.ts': [ 'karma-typescript', 'sourcemap', 'coverage']
        },
        reporters: [ 'spec', 'karma-typescript' ],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [ 'Chrome' ],
        singleRun: false,
        coverageReporter: {
            includeAllSources: true,
            dir: 'coverage/',
            reporters: [
                { type: "html", subdir: "html" },
                { type: 'text-summary' }
            ]
        }
    })
};
