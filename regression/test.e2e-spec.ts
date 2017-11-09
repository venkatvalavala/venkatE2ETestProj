import { browser, element, by, ElementFinder } from 'protractor';
 
describe('Example E2E Test', () => {
 
  beforeEach(() => {
    browser.get('/');
  });

  // Take a screenshot automatically after each failing test.
afterEach(function() {
 
 // var passed = jasmine.getEnv().currentRunner.name;
 /*
  //var passed = jasmine.getEnv().currentSpec.results().passed();
  if (!passed) {
    browser.takeScreenshot().then(function(png) {
      // Do something with the png...
      console.log("Test case is fialed deteced by venkat");
    });
  } else
  {
      console.log("Test case is Passed deteced by venkat");
  }*/
  console.log("Test case is Passed deteced by venkat" );
});
 
  it('the home tab is displayed by default', () => {
    /*
      expect(element(by.css('[aria-selected=true] .tab-button-text')) // Grab the title of the selected tab
        .getAttribute('innerHTML')) // Get the text content
        .toContain('Home'); // Check if it contains the text "Home"*/
        //expect(element(by.css('app-root h1'))).toContain("venkat");
          expect('venkat').toEqual('Welcome to app!');
  });
 
  it('the user can browse to the contact tab and view the ionic twitter handle', () => {
 
    // Click the 'About' tab
    element(by.css('[aria-controls=tabpanel-t0-2]')).click().then(() => {
 
      // Wait for the page transition
      browser.driver.sleep(1000);
 
      expect(element(by.css('ion-list ion-item ion-label')) // Grab the label of the list item
        .getAttribute('innerHTML')) // Get the text content
        .toContain('@ionicframework'); // Check if it contains the text "@ionicframework"
 
    });
 
  });
 
});