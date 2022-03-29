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
public class AdminRemovePatientTestTest {
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
  public void adminRemovePatientTest() {
    driver.get("http://localhost:3000/login");
    driver.manage().window().setSize(new Dimension(1726, 1040));
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div/div/div/input")).click();
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div/div/div/input")).sendKeys("acai");
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div[2]/div/div/input")).click();
    {
      WebElement element = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/button/span"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/div[2]/div/div/input")).sendKeys("12345");
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/form/button/span")).click();
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div/div/button[2]")).click();
    {
      WebElement element = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/button[2]/span"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/button[2]/span")).click();
    driver.findElement(By.cssSelector(".css-tj5bde-Svg")).click();
    driver.findElement(By.id("react-select-2-option-4")).click();
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/button/span")).click();
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/button/span")).click();
    {
      WebElement element = driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/button/span"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.findElement(By.xpath("//div[@id=\'root\']/main/div/div[2]/div[2]/div/div/form/button/span")).click();
    driver.close();
  }
}
