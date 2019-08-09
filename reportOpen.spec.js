// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');
const proxy = require('selenium-webdriver/proxy')
const fs = require('fs');
const baseURL = fs.readFileSync('site').toString()
const token = fs.readFileSync('token').toString()
const reportID = fs.readFileSync('reportId').toString()

const screen = {
  width: 1440,
  height: 1080
};

describe('ReportOpen', function() {
  this.timeout(150000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder()
      .withCapabilities({acceptInsecureCerts: true})
      .setProxy(proxy.manual({http: 'www-proxy-hqdc.us.oracle.com:80'}))
      .forBrowser('firefox')
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
      .build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('ReportOpen', async function() {
    await driver.get(`${baseURL}/AgentWeb/`)
    await driver.manage().addCookie({name: 'USERSESSION', value: token})
    await driver.get(`${baseURL}/AgentWeb/Bookmark/Report/${reportID}`)
    await driver.executeScript("window.scrollTo(0,0)")
    await waitForElement(driver, By.id(`tabHeader-AC-${reportID}`))
    await sleep(5000)
    await driver.takeScreenshot().then(
      function(image, err) {
          fs.writeFile(`${reportID}.png`, image, 'base64', function(err) {
              console.log(err);
          });
      }
    );
  })

  function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
  }

  async function waitForElement(dr, selector){
    return await dr.wait(async function() {
      let el
      try{
        el = await dr.findElement(selector)
        return el.isDisplayed().then(v => v ? el : null)
      } catch {
        el = null
      }
      return false
    }, 30000)
  }
})
