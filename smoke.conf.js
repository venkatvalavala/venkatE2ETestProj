var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

//  This are added to Takse screen shots and html Report

 var Jasmine2HtmlReporter =require('protractor-jasmine2-html-reporter');
 var dirPath1 = './smoketestresult/screenshots/';

var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
 var reporter = new HtmlScreenshotReporter({
  dest: 'smokehtmlssr/screenshots',
  filename: 'my-report.html',
 cleanDestination: true,
  captureOnlyFailedSpecs: true,
  showSummary: true,
  showConfiguration: false,
  reportTitle: 'Venkat E2E Testing Report'
});

//  This is used to take the screenshot of failed test cases.
const fs = require('fs');

exports.config = {
    allScriptsTimeout: 11000,
    directConnect: true,
    // Setup the report before any tests start
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },
    capabilities: {
        'browserName': 'chrome',
          "chromeOptions": {
        binary: "C:/Users/sreer/AppData/Local/Google/Chrome/Application/chrome.exe",
        args: [],
        extensions: [],
    }
    },
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    specs: ['./smoke/**/*.e2e-spec.ts'],
    baseUrl: 'http://localhost:8100',
    useAllAngular2AppRoots: true,
    beforeLaunch: function() {
 
        require('ts-node').register({
            project: 'smoke'
        });
 
        require('connect')().use(require('serve-static')('www')).listen(8100);
 
    },
    onPrepare: function() {
       browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
        jasmine.getEnv().addReporter(new SpecReporter({
        //  savePath:'./testresult/reports/'
      }));
//   Starting of screenshot taking code for failed test case
        jasmine.getEnv().addReporter({
          specDone: function (result) {
       //   console.log(result)
          //if (result.failedExpectations.length > 0) {
          if (result.status==="failed") {
            browser.getProcessedConfig().then(function (config) {
                browser.takeScreenshot().then(function (png) {
                    var dirPath = './smokefailedtests/screenshots/';
                    if (!fs.existsSync('./smokefailedtests')) {
                        fs.mkdirSync('./smokefailedtests');
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
    //   End of Screenshot taking for failed tests.

        
        //  This is report is Html report
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
           
             specDone: function (result) {
              
                    if (!fs.existsSync('./smoketestresult')) {
                        fs.mkdirSync('./smoketestresult');
                        if (!fs.existsSync(dirPath1))
                            fs.mkdirSync(dirPath1);
                    }
             },
          savePath:dirPath1
      }));


      //  HTML Report 
      jasmine.getEnv().addReporter(reporter);

    },
    
     // Close the report after all tests finish
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
}