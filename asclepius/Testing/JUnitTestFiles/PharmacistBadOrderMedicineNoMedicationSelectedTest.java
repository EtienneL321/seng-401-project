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
public class BadOrderMedicineNomedicationselectedTest {
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
  //									FUNTIONAL REQUIREMENT RTM ID - (TC-25)										//
  //																												//
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Test
  public void badOrderMedicineNomedicationselected() {
    // Test name: Bad Order Medicine (No medication selected)
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
    // 8 | verifyElementPresent | css=.nav-btns:nth-child(3) | 
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".nav-btns:nth-child(3)"));
      assert(elements.size() > 0);
    }
    // 9 | click | css=.nav-btns:nth-child(3) | 
    driver.findElement(By.cssSelector(".nav-btns:nth-child(3)")).click();
    // 10 | verifyElementPresent | css=.MuiInputBase-input | 
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".MuiInputBase-input"));
      assert(elements.size() > 0);
    }
    // 11 | click | css=.MuiInputBase-input | 
    driver.findElement(By.cssSelector(".MuiInputBase-input")).click();
    // 12 | type | css=.MuiInputBase-input | 100
    driver.findElement(By.cssSelector(".MuiInputBase-input")).sendKeys("100");
    // 13 | verifyValue | css=.MuiInputBase-input | 100
    {
      String value = driver.findElement(By.cssSelector(".MuiInputBase-input")).getAttribute("value");
      assertThat(value, is("100"));
    }
    // 14 | click | css=.MuiButton-contained > .MuiButton-label | 
    driver.findElement(By.cssSelector(".MuiButton-contained > .MuiButton-label")).click();
    // 15 | assertAlert | Please choose a medication to order. | 
    assertThat(driver.switchTo().alert().getText(), is("Please choose a medication to order."));
    // 16 | close |  | 
    driver.close();
  }
}
