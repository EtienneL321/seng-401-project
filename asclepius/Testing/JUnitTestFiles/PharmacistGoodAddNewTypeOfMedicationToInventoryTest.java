// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class GoodaddNewtypeofmedicationtoinventoryTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //																												//
  //									FUNTIONAL REQUIREMENT RTM ID - (TC-29)										//
  //																												//
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Test
  public void goodaddNewtypeofmedicationtoinventory() {
    // Test name: Good add New type of medication to inventory
    // Step # | name | target | value
    // 1 | open | https://asclepius-client-management.netlify.app/ | 
    driver.get("https://asclepius-client-management.netlify.app/");
    // 2 | click | css=.MuiButtonBase-root | 
    driver.findElement(By.cssSelector(".MuiButtonBase-root")).click();
    // 3 | setWindowSize | 1053x815 | 
    driver.manage().window().setSize(new Dimension(1053, 815));
    // 4 | click | css=.Mui-focused > .MuiInputBase-input | 
    driver.findElement(By.cssSelector(".Mui-focused > .MuiInputBase-input")).click();
    // 5 | type | xpath=//div[@id='root']/main/div/div[2]/div/form/div/div/div/input | Lpjj
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div/div/div/input")).sendKeys("Lpjj");
    // 6 | type | xpath=//div[@id='root']/main/div/div[2]/div/form/div[2]/div/div/input | chocolate
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div[2]/div/div/input")).sendKeys("chocolate");
    // 7 | sendKeys | css=.Mui-focused > .MuiInputBase-input | ${KEY_ENTER}
    driver.findElement(By.cssSelector(".Mui-focused > .MuiInputBase-input")).sendKeys(Keys.ENTER);
    // 8 | verifyElementPresent | css=.nav-btns:nth-child(4) | 
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".nav-btns:nth-child(4)"));
      assert(elements.size() > 0);
    }
    // 9 | click | css=.nav-btns:nth-child(4) | 
    driver.findElement(By.cssSelector(".nav-btns:nth-child(4)")).click();
    // 10 | click | id=filled-required | 
    driver.findElement(By.id("filled-required")).click();
    // 11 | click | id=filled-required | 
    driver.findElement(By.id("filled-required")).click();
    // 12 | click | css=.add-remove-btns | 
    driver.findElement(By.cssSelector(".add-remove-btns")).click();
    // 13 | type | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div/div/div/input | Thioguanine
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div/div/div/input")).sendKeys("Thioguanine");
    // 14 | verifyValue | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div/div/div/input | Thioguanine
    {
      String value = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div/div/div/input")).getAttribute("value");
      assertThat(value, is("Thioguanine"));
    }
    // 15 | click | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[2]/div/div/input | 
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[2]/div/div/input")).click();
    // 16 | type | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[2]/div/div/input | 5
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[2]/div/div/input")).sendKeys("5");
    // 17 | verifyValue | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[2]/div/div/input | 5
    {
      String value = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[2]/div/div/input")).getAttribute("value");
      assertThat(value, is("5"));
    }
    // 18 | click | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[3]/div/div/input | 
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[3]/div/div/input")).click();
    // 19 | type | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[3]/div/div/input | Treat certain types of leukemia
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[3]/div/div/input")).sendKeys("Treat certain types of leukemia");
    // 20 | verifyValue | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[3]/div/div/input | Treat certain types of leukemia
    {
      String value = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[3]/div/div/input")).getAttribute("value");
      assertThat(value, is("Treat certain types of leukemia"));
    }
    // 21 | click | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[4]/div/div/input | 
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[4]/div/div/input")).click();
    // 22 | type | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[4]/div/div/input | May cause nausea
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[4]/div/div/input")).sendKeys("May cause nausea");
    // 23 | verifyValue | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[4]/div/div/input | May cause nausea
    {
      String value = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[4]/div/div/input")).getAttribute("value");
      assertThat(value, is("May cause nausea"));
    }
    // 24 | click | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[5]/div/div/input | 
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[5]/div/div/input")).click();
    // 25 | type | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[5]/div/div/input | 1
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[5]/div/div/input")).sendKeys("1");
    // 26 | verifyValue | xpath=//div[@id='root']/main/div/div[2]/div[2]/div/div/form/div[5]/div/div/input | 1
    {
      String value = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/div[5]/div/div/input")).getAttribute("value");
      assertThat(value, is("1"));
    }
    // 27 | click | css=.MuiButtonBase-root:nth-child(6) > .MuiButton-label | 
    driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(6) > .MuiButton-label")).click();
    // 28 | click | css=.MuiButtonBase-root:nth-child(7) > .MuiButton-label | 
    driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(7) > .MuiButton-label")).click();
    // 29 | verifyText | css=p | Medication has been added!
    assertThat(driver.findElement(By.cssSelector("p")).getText(), is("Medication has been added!"));
    // 30 | click | css=form .MuiButton-label | 
    driver.findElement(By.cssSelector("form .MuiButton-label")).click();
    // 31 | click | css=.nav-btns:nth-child(2) | 
    driver.findElement(By.cssSelector(".nav-btns:nth-child(2)")).click();
    // 32 | verifyText | css=tr:nth-child(5) > td:nth-child(2) | Thioguanine
    assertThat(driver.findElement(By.cssSelector("tr:nth-child(5) > td:nth-child(2)")).getText(), is("Thioguanine"));
    // 33 | close |  | 
    driver.close();
  }
}
