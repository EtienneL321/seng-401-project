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
public class AdminRemoveAssignTestTest {
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
  @Test
  public void adminRemoveAssignTest() {
    driver.get("http://localhost:3000/login");
    driver.manage().window().setSize(new Dimension(1375, 1257));
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div/div/div/input")).sendKeys("acai");
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div[2]/div/div/input")).click();
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div[2]/div/div/input")).sendKeys("12345");
    driver.findElement(By.cssSelector(".MuiButton-outlined > .MuiButton-label")).click();
    driver.findElement(By.cssSelector(".nav-btns:nth-child(5)")).click();
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/form/div/div/div[2]/div")).click();
    driver.findElement(By.id("react-select-2-option-2")).click();
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/form/div[2]/div/div/div[2]")).click();
    driver.findElement(By.id("react-select-3-option-0")).click();
    driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(8) > .MuiButton-label")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(6) > .MuiButton-label"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(6) > .MuiButton-label")).click();
    {
      WebElement element = driver.findElement(By.cssSelector(".MuiButton-contained > .MuiButton-label"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.cssSelector(".MuiButton-contained > .MuiButton-label")).click();
    driver.close();
  }
}
