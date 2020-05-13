import requests
import json
from unittest import main, TestCase, mock
from restaurants import get_cities_list
from sqlalchemy.orm import sessionmaker
from image_search import get_image_search
from random import randrange
from models import to_json, Restaurant, City, University
from cities import getNumbeoJson
from youtube_link import get_youtube_link


class UnitTests(TestCase):
    def test_get_cities_list_1(self):
        self.assertEqual(len(get_cities_list()), 100)

    def test_get_cities_list_2(self):
        cities = get_cities_list()
        for city in cities:
            self.assertEqual(len(city.split("_")), 2)

    def test_get_image_search_1(self):
        url = get_image_search(get_cities_list()[randrange(100)])
        flag = False
        if "jpg" or "png" in url:
            flag = True
        self.assertEqual(flag, True)

    def test_to_json_1(self):

        a = Restaurant(
            restaurant_name="sample",
            rating=4.5,
            image_url="sample",
            price="sample",
            review_count=1,
            city_name="sample",
            state_name="sample",
            transactions="sample",
            categories="sample",
            address="sample",
            city_state_name="sample",
        )

        res = to_json(a, Restaurant)
        temp = json.loads(res)
        self.assertEqual(temp["restaurant_name"], "sample")
        self.assertEqual(temp["rating"], 4.5)
        self.assertEqual(temp["price"], "sample")
        self.assertEqual(temp["review_count"], 1)
        self.assertEqual(temp["address"], "sample")

    def test_to_json_2(self):

        a = Restaurant(
            restaurant_name="sample",
            rating=4.5,
            image_url="sample",
            price="sample",
            review_count=1,
            city_name="sample",
            state_name="sample",
            transactions="sample",
            categories="sample",
            address="sample",
            city_state_name="sample",
        )

        res = a.__repr__()
        temp = json.loads(res)
        self.assertEqual(temp["restaurant_name"], "sample")
        self.assertEqual(temp["rating"], 4.5)
        self.assertEqual(temp["price"], "sample")
        self.assertEqual(temp["review_count"], 1)
        self.assertEqual(temp["address"], "sample")

    def test_hosted_api(self):
        a = requests.get("https://api.collegefitfor.me/cities?page=2")
        self.assertEqual(str(a), "<Response [200]>")

    def test_get_numbeo_json(self):
        a = getNumbeoJson("Austin, Texas")
        l = 0
        for thing in a:
            l += 1
        self.assertEqual(l, 24)

    def test_youtube_link(self):
        link = get_youtube_link("Austin Texas")
        flag = False
        if "youtube" in link:
            flag = True
        self.assertEqual(flag, True)

    def test_Cities_db(self):
        a = City.query.all()
        self.assertEqual(len(a), 100)

    def test_Universiites_db(self):
        a = University.query.all()
        self.assertEqual(len(a), 698)

    def test_Restaurants_db(self):
        a = Restaurant.query.all()
        self.assertEqual(len(a), 2000)

    def test_Cities_schema(self):
        a = City.query.filter_by(city_state_name="austin_texas")
        b = json.loads(str(list(a)))
        for thing in b:
            self.assertEqual(len(thing.items()), 15)

    def test_Restaurants_schema(self):
        a = Restaurant.query.filter_by(city_state_name="austin_texas")
        b = json.loads(str(list(a)))
        for thing in b:
            count = 0
            for ting in thing:
                count += 1
            self.assertEqual(count, 12)

    def test_Restaurants_schema(self):
        a = University.query.filter_by(city_state_name="austin_texas")
        b = json.loads(str(list(a)))
        for thing in b:
            count = 0
            for ting in thing:
                count += 1
            self.assertEqual(count, 16)

    def test_Cities_schema_2(self):
        a = City.query.filter_by(city_state_name="austin_texas")
        b = json.loads(str(list(a)))
        res = []
        for thing in b:
            for ting in thing:
                res.append(ting)

        scheme_list = [
            "id",
            "city_name",
            "state_name",
            "city_state_name",
            "population",
            "crime_index",
            "pollution_index",
            "rent_index",
            "restaurant_price_index",
            "traffic_index",
            "safety_index",
            "health_care_index",
            "time_zone",
            "image_url",
            "wiki_text",
        ]
        self.assertEqual(res, scheme_list)

    def test_University_schema_2(self):
        a = University.query.filter_by(city_state_name="austin_texas")
        b = json.loads(str(list(a)))
        res = []
        count = 0
        for thing in b:
            for ting in thing:
                if count == 0:
                    res.append(ting)
            count = 1

        scheme_list = [
            "id",
            "name",
            "city_name",
            "state_name",
            "city_state_name",
            "num_undergrads",
            "admission_rate",
            "cost_per_year",
            "retention_rate",
            "percent_men",
            "percent_women",
            "grad_rate",
            "avg_sat_score",
            "avg_act_score",
            "image_url",
            "wiki_text",
        ]
        self.assertEqual(res, scheme_list)

    def test_Restaurant_schema_2(self):
        a = Restaurant.query.filter_by(city_state_name="austin_texas")
        b = json.loads(str(list(a)))
        res = []
        count = 0
        for thing in b:
            for ting in thing:
                if count == 0:
                    res.append(ting)
            count = 1

        scheme_list = [
            "id",
            "restaurant_name",
            "rating",
            "image_url",
            "price",
            "review_count",
            "city_name",
            "state_name",
            "transactions",
            "categories",
            "address",
            "city_state_name",
        ]
        self.assertEqual(res, scheme_list)

    def test_cities_pagination(self):
        a = requests.get("https://api.collegefitfor.me/cities?page=2")
        d = json.loads(a.content)
        count = 0
        for thing in d:
            count += 1
        self.assertEqual(count, 20)

    def test_universiites_pagination(self):
        a = requests.get("https://api.collegefitfor.me/universities?page=2")
        d = json.loads(a.content)
        count = 0
        for thing in d:
            count += 1
        self.assertEqual(count, 20)

    def test_restaurants_pagination(self):
        a = requests.get("https://api.collegefitfor.me/restaurants?page=2")
        d = json.loads(a.content)
        count = 0
        for thing in d:
            count += 1
        self.assertEqual(count, 20)

    def test_city_filter_1(self):
        a = requests.get(
            "https://api.collegefitfor.me/cities/filter/?state_name=Kansas&page=1"
        )
        d = json.loads(a.content)
        count = 0
        for thing in d:
            count += 1
            assert thing["city_name"] == "Wichita"
        self.assertEqual(count, 1)

    def test_city_sort_2(self):
        a = requests.get(
            "https://api.collegefitfor.me/cities/filter/?state_name=Texas&order=population*asc&page=1"
        )
        d = json.loads(a.content)
        count = 0
        prev = 0
        for thing in d:
            count += 1
            assert int(thing["population"]) > prev
            prev = int(thing["population"])
        self.assertEqual(count, 13)

    def test_university_sort_1(self):
        a = requests.get(
            "https://api.collegefitfor.me/universities/filter/?state_name=Texas&order=cost_per_year*asc&page=1"
        )
        d = json.loads(a.content)
        count = 0
        prev = 0
        for thing in d:
            count += 1
            assert int(thing["cost_per_year"]) >= prev
            prev = int(thing["cost_per_year"])
        self.assertEqual(count, 20)

    def test_university_sort_2(self):
        a = requests.get(
            "https://api.collegefitfor.me/universities/filter/?state_name=Texas&order=cost_per_year*asc&page=1"
        )
        d = json.loads(a.content)
        count = 0
        prev = 0
        for thing in d:
            count += 1
            assert thing["state_name"] == "Texas"
        self.assertEqual(count, 20)

    def test_attractions_sort_1(self):
        a = requests.get(
            "https://api.collegefitfor.me/restaurants/filter/?state_name=Texas&price=$$&page=1"
        )
        d = json.loads(a.content)
        count = 0
        prev = 0
        for thing in d:
            count += 1
            assert thing["state_name"] == "Texas"
            assert thing["price"] == "$$"
        self.assertEqual(count, 20)

    def test_attractions_sort_2(self):
        a = requests.get(
            "https://api.collegefitfor.me/restaurants/filter/?state_name=Texas&price=$$&page=1&order=review_count*dsc"
        )
        d = json.loads(a.content)
        count = 0
        prev = 1000000
        for thing in d:
            count += 1
            assert thing["state_name"] == "Texas"
            assert thing["price"] == "$$"
            assert int(thing["review_count"]) <= prev
            prev = int(thing["review_count"])
        self.assertEqual(count, 20)


if __name__ == "__main__":
    main()
