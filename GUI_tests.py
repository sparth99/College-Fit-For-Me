from selenium import webdriver
from unittest import TestCase, main
import selenium
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome("/Users/Parth/Downloads/chromedriver")

link = "localhost:3000"

driver.get(link)


class tests(TestCase):

    def test_load(self):
        driver.get("http://localhost:3000/")
        assert driver.current_url == "http://localhost:3000/"

    def test_home_buttons(self):
        link = driver.find_element_by_link_text('College Fit For Me')
        link.click()
        assert driver.current_url == "http://localhost:3000/home"
        link = driver.find_element_by_class_name('explore-button')
        link.click()
        assert driver.current_url == "http://localhost:3000/universities"

        link = driver.find_element_by_link_text('College Fit For Me')
        link.click()
        assert driver.current_url == "http://localhost:3000/home"
        link = driver.find_element_by_class_name('cities-button')
        link.click()
        assert driver.current_url == "http://localhost:3000/cities"


        link = driver.find_element_by_link_text('College Fit For Me')
        link.click()
        assert driver.current_url == "http://localhost:3000/home"
        link = driver.find_element_by_class_name('universities-button')
        link.click()
        assert driver.current_url == "http://localhost:3000/universities"

        link = driver.find_element_by_link_text('College Fit For Me')
        link.click()
        assert driver.current_url == "http://localhost:3000/home"
        link = driver.find_element_by_class_name('attractions-button')
        link.click()
        assert driver.current_url == "http://localhost:3000/attractions"

    def test_about(self):
        link = driver.find_element_by_link_text('About')
        link.click()
        assert driver.current_url == "http://localhost:3000/about"

        time.sleep(3)
        expected = "About Us"
        actual = driver.find_element_by_class_name('about-header').text
        assert expected == actual

    def test_cities(self):
        link = driver.find_element_by_link_text('Cities')
        link.click()
        assert driver.current_url == "http://localhost:3000/cities"

        time.sleep(3)
        expected = "City matters a lot when deciding a University to attend."
        actual = driver.find_element_by_class_name('cities-header').text
        assert expected == actual
    
    def test_universities(self):
        link = driver.find_element_by_link_text('Universities')
        link.click()
        assert driver.current_url == "http://localhost:3000/universities"

        time.sleep(3)
        expected = "Find the University that's the best fit for you."
        actual = driver.find_element_by_class_name('universities-header').text
        assert expected == actual

    def test_attractions(self):
        link = driver.find_element_by_link_text('Attractions')
        link.click()
        assert driver.current_url == "http://localhost:3000/attractions"

        time.sleep(3)
        expected = "Find the best things to do in your college town!"
        actual = driver.find_element_by_class_name('attractions-header').text
        assert expected == actual

    def test_cities_instance(self):
        link = driver.find_element_by_link_text('Cities')
        link.click()
        assert driver.current_url == "http://localhost:3000/cities"

        time.sleep(3)
        link = driver.find_element_by_class_name('city-instance')
        link.click()

        time.sleep(3)
        expected_field = "Population"
        assert expected_field in driver.page_source
        expected_field = "Crime Index"
        assert expected_field in driver.page_source
        expected_field = "Pollution Index"
        assert expected_field in driver.page_source
        expected_field = "Rent Index"
        assert expected_field in driver.page_source
        expected_field = "Restaurant Price Index"
        assert expected_field in driver.page_source
        expected_field = "Traffic Index"
        assert expected_field in driver.page_source
        expected_field = "Safety Index"
        assert expected_field in driver.page_source
        expected_field = "Health Care Index"
        assert expected_field in driver.page_source
        expected_field = "Time Zone"
        assert expected_field in driver.page_source

    def test_universities_instance(self):
        link = driver.find_element_by_link_text('Universities')
        link.click()
        assert driver.current_url == "http://localhost:3000/universities"

        time.sleep(3)
        link = driver.find_element_by_class_name('university-instance')
        link.click()

        time.sleep(3)
        expected_field = "City"
        assert expected_field in driver.page_source
        expected_field = "Number of Undergrads"
        assert expected_field in driver.page_source
        expected_field = "Admission Rate"
        assert expected_field in driver.page_source
        expected_field = "Tuition"
        assert expected_field in driver.page_source
        expected_field = "Graduation Rate"
        assert expected_field in driver.page_source
        expected_field = "Retention Rate"
        assert expected_field in driver.page_source
        expected_field = "Percent Men"
        assert expected_field in driver.page_source
        expected_field = "Percent Women"
        assert expected_field in driver.page_source
        expected_field = "Average SAT"
        assert expected_field in driver.page_source
        expected_field = "Average ACT"
        assert expected_field in driver.page_source

    def test_attractions_instance(self):
        link = driver.find_element_by_link_text('Attractions')
        link.click()
        assert driver.current_url == "http://localhost:3000/attractions"

        time.sleep(3)
        link = driver.find_element_by_class_name('attraction-instance')
        link.click()

        time.sleep(3)
        expected_field = "City"
        assert expected_field in driver.page_source
        expected_field = "Price"
        assert expected_field in driver.page_source
        expected_field = "Rating"
        assert expected_field in driver.page_source
        expected_field = "Review Count"
        assert expected_field in driver.page_source
        expected_field = "Transactions"
        assert expected_field in driver.page_source
        expected_field = "Category"
        assert expected_field in driver.page_source
        expected_field = "Address"
        assert expected_field in driver.page_source

    def test_home(self):
        link = driver.find_element_by_link_text('College Fit For Me')
        link.click()
        assert driver.current_url == "http://localhost:3000/home"

    def test_city_filter_1(self):
        link = driver.find_element_by_class_name('cities-button')
        link.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select State']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='California']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Go']")
        state_filter.click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('cities-card')
        time.sleep(2)

        assert len(links) == 18
        time.sleep(3)

        a = links[0].click()
        time.sleep(2)

        assert(str(driver.current_url) == 'http://localhost:3000/cities/los-angeles_california')

    def test_city_filter_2(self):
        link = driver.find_element_by_class_name('cities-button')
        link.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select State']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='California']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Sort By']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='Population']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Go']")
        state_filter.click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('cities-card')
        time.sleep(2)

        assert len(links) == 18
        time.sleep(3)

        a = links[0].click()
        time.sleep(2)

        assert(str(driver.current_url) == 'http://localhost:3000/cities/berkeley_california')

    def test_city_filter_3(self):
        link = driver.find_element_by_class_name('cities-button')
        link.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select State']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='California']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Sort By']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='Population']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Go']")
        state_filter.click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('cities-card')
        time.sleep(2)

        assert len(links) == 18
        time.sleep(3)

        assert 'Berkeley' in links[0].text

        time.sleep(2)

        links[0].click()

        assert(str(driver.current_url) == 'http://localhost:3000/cities/berkeley_california')

    def test_university_filter_1(self):
        link = driver.find_element_by_class_name('universities-button')
        link.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select State']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='Kansas']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Sort By']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='Number of Undergrads']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Go']")
        state_filter.click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('universities-card')
        time.sleep(2)

        assert len(links) == 2
        time.sleep(3)

        assert 'Wichita' in links[0].text

        time.sleep(2)

        links[0].click()

        assert(str(driver.current_url) == 'http://localhost:3000/universities/Newman_University')


    def test_university_filter_2(self):
        link = driver.find_element_by_class_name('universities-button')
        link.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select State']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='Texas']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Sort By']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='Number of Undergrads']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Go']")
        state_filter.click()
        time.sleep(4)

        state_filter = driver.find_elements_by_class_name('btn-outline-primary')
        state_filter[3].click()

        time.sleep(3)

        links = driver.find_elements_by_class_name('universities-card')

        print(len(links))
        assert len(links) == 20
        time.sleep(3)

        assert '39.42' in links[0].text

        time.sleep(2)

        links[0].click()

        assert(str(driver.current_url) == 'http://localhost:3000/universities/Dallas_Baptist_University')

    def test_attractions_filter_1(self):
        link = driver.find_element_by_class_name('attractions-button')
        link.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select State']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='Texas']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select Price']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='$$']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Go']")
        state_filter.click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('attractions-card')

        print(len(links))
        assert len(links) == 20
        time.sleep(3)

        print(links[0].text)
        assert 'Breakfast Klub' in links[0].text

        time.sleep(2)

        links[0].click()

        assert(str(driver.current_url) == 'http://localhost:3000/attractions/the_breakfast_klub*61')

    def test_attractions_filter_2(self):
        link = driver.find_element_by_class_name('attractions-button')
        link.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select State']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='New York']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Select Price']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//a[text()='$$$$']")
        state_filter.click()
        time.sleep(3)

        state_filter = driver.find_element_by_xpath("//button[text()='Go']")
        state_filter.click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('attractions-card')

        print(len(links))
        assert len(links) == 2
        time.sleep(3)

        print(links[0].text)
        assert 'Gramercy Tavern' in links[0].text

        time.sleep(2)

        links[0].click()

        assert(str(driver.current_url) == 'http://localhost:3000/attractions/gramercy_tavern*14')

    def test_about(self):
        link = driver.find_element_by_link_text('About')
        link.click()
        time.sleep(3)


        cards = driver.find_elements_by_class_name('card')
        time.sleep(3)
        count = 0
        for i in range(0,6):
            temp_card = cards[i].find_element_by_class_name('card-body')
            divs = temp_card.find_elements_by_tag_name('div')
            for thing in divs:
                count += 1
        
        assert(count == 12)

    def test_search_cities(self):
        link = driver.find_element_by_class_name('cities-button')
        link.click()
        time.sleep(3)

        inputs = driver.find_elements_by_tag_name('input')
        inputs[1].send_keys("Cali")

        time.sleep(2)

        state_filter = driver.find_elements_by_xpath("//button[text()='Search']")
        state_filter[1].click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('cities-card')
        assert(len(links) == 18)

        links[0].click()
        time.sleep(1)

        assert driver.current_url == 'http://localhost:3000/cities/los-angeles_california'

    def test_search_universities(self):
        link = driver.find_element_by_class_name('universities-button')
        link.click()
        time.sleep(3)

        inputs = driver.find_elements_by_tag_name('input')
        inputs[1].send_keys("Cali")

        time.sleep(2)

        state_filter = driver.find_elements_by_xpath("//button[text()='Search']")
        state_filter[1].click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('universities-card')
        assert(len(links) == 125)

        links[0].click()
        time.sleep(1)

        assert driver.current_url == 'http://localhost:3000/universities/American_Musical_and_Dramatic_Academy'

    def test_search_universities(self):
        link = driver.find_element_by_class_name('attractions-button')
        link.click()
        time.sleep(3)

        inputs = driver.find_elements_by_tag_name('input')
        inputs[1].send_keys("Kansas")

        time.sleep(2)

        state_filter = driver.find_elements_by_xpath("//button[text()='Search']")
        state_filter[1].click()
        time.sleep(4)

        links = driver.find_elements_by_class_name('attractions-card')
        assert(len(links) == 40)

        links[1].click()
        time.sleep(1)

        assert driver.current_url == 'http://localhost:3000/attractions/joe\'s_kansas_city_bar-b-que*721'


    # def shutdown(self):
    #     driver.quit()



    

    
  









 
  




    



        


if __name__ == "__main__":
	main()
