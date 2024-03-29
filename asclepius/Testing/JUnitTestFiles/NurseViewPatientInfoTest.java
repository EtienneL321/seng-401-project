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
public class ViewPatientInfoTest {
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
  //									FUNTIONAL REQUIREMENT RTM ID - (TC-21)										//
  //																												//
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @Test
  public void viewPatientInfo() {
    // Test name: View Patient Info
    // Step # | name | target | value
    // 1 | open | https://asclepius-client-management.netlify.app/ | 
    driver.get("https://asclepius-client-management.netlify.app/");
    // 2 | click | css=.MuiButton-label | 
    driver.findElement(By.cssSelector(".MuiButton-label")).click();
    // 3 | type | xpath=//div[@id='root']/main/div/div[2]/div/form/div/div/div/input | hotNurseGF
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div/div/div/input")).sendKeys("hotNurseGF");
    // 4 | type | xpath=//div[@id='root']/main/div/div[2]/div/form/div[2]/div/div/input | orange
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div[2]/div/div/input")).sendKeys("orange");
    // 5 | sendKeys | css=.Mui-focused > .MuiInputBase-input | ${KEY_ENTER}
    driver.findElement(By.cssSelector(".Mui-focused > .MuiInputBase-input")).sendKeys(Keys.ENTER);
    // 6 | verifyElementPresent | css=.MuiButtonBase-root:nth-child(4) h3:nth-child(2) | 
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".MuiButtonBase-root:nth-child(4) h3:nth-child(2)"));
      assert(elements.size() > 0);
    }
    // 7 | click | css=.MuiButtonBase-root:nth-child(4) h3:nth-child(2) | 
    driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(4) h3:nth-child(2)")).click();
    // 8 | verifyText | css=.diagnoses-table:nth-child(1) th:nth-child(1) | Diagnosis
    assertThat(driver.findElement(By.cssSelector(".diagnoses-table:nth-child(1) th:nth-child(1)")).getText(), is("Diagnosis"));
    // 9 | verifyText | css=.diagnoses-table:nth-child(3) th:nth-child(1) | Medication
    assertThat(driver.findElement(By.cssSelector(".diagnoses-table:nth-child(3) th:nth-child(1)")).getText(), is("Medication"));
    // 10 | verifyText | css=.diagnoses-table:nth-child(5) th:nth-child(2) | Notes
    assertThat(driver.findElement(By.cssSelector(".diagnoses-table:nth-child(5) th:nth-child(2)")).getText(), is("Notes"));
    // 11 | close |  | 
    driver.close();
  }
}
