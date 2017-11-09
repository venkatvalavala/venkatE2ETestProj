// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const fs = require('fs');
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(
  {specDone: function (result) {
    console.log(result)
        //if (result.failedExpectations.length > 0) {
          if (result.status==="failed") {
            browser.getProcessedConfig().then(function (config) {
                browser.takeScreenshot().then(function (png) {
                    var dirPath = './reports/screenshots/';
                    if (!fs.existsSync('./reports')) {
                        fs.mkdirSync('./reports');
                        if (!fs.existsSync(dirPath))
                            fs.mkdirSync(dirPath);
                    }
                    //var fileName = (config.capabilities.browserName + '-' + result.fullName).replace(/[\/\\]/g, ' ').substring(0, 230);
                    var fileName = (result.id + '-' + result.description);
                    var stream = fs.createWriteStream(dirPath + fileName + '.png');
                    stream.write(new Buffer(png, 'base64'));
                    stream.end();
                }, function (error) {
                    console.log("failed to take screenshot");
                })
            })
        }}
    });
  }
};
