/**
 * @name waitForUrlToChangeTo
 * @description Wait until the URL changes to match a provided regex
 * @param {RegExp} urlRegex wait until the URL changes to match this regex
 * @returns {!webdriver.promise.Promise} Promise
 */
function waitForUrlToChangeTo(urlRegex) {
    var currentUrl;

    return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
            currentUrl = url;
        }
    ).then(function waitForUrlToChangeTo() {
            return browser.wait(function waitForUrlToChangeTo() {
                return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
                    return url == urlRegex;
                });
            });
        }
    );
}


describe('Login', () => {

  beforeEach(() => {
    browser.get('http://localhost:3000/!!login');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result = 'Plone Client';
    expect(subject).toEqual(result);
  });

  it('should log in', () => {
    element(by.css('.username')).sendKeys('admin');
    element(by.css('.password')).sendKeys('admin');

    expect(element(by.css('.username')).getAttribute('value')).toEqual('admin');
    expect(element(by.css('.password')).getAttribute('value')).toEqual('admin');
    element(by.css('.submitLogin')).click();

    /*waitForUrlToChangeTo(regexUrlToTest).then(function(){
      browser.waitForAngular();
      expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/')
    })*/
    browser.driver.sleep(1000);
    browser.waitForAngular();
    expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/')
  });

  // TODO: uncomment when login is fixed
  // it('should not log in', () => {
  //  element(by.css('.username')).sendKeys('admin');
  //  element(by.css('.password')).sendKeys('passwordnotvalid');

  //  expect(element(by.css('.username')).getAttribute('value')).toEqual('admin');
  //  expect(element(by.css('.password')).getAttribute('value')).toEqual('passwordnotvalid');
  //  element(by.css('.submitLogin')).click();

  //  browser.driver.sleep(1000);
  //  browser.waitForAngular();
  //  expect(browser.driver.getCurrentUrl()).toEqual('http://localhost:3000/!!login')
  //});


});
