from yelpapi import YelpAPI
from models import app, db, Restaurant
import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys


client_id = "Q6p9WkYInq0WFzz_91ZxKw"

api_key = "wg8pJ8Dsn6g3SBPnYLR1mLtjn6-c5QNIkrVkFoaZ7NfzuLlS77z1-K0Wgs7kVl7S4766FAvE_JEQosNViPI__u5NhAguKsLiSyrnLeXWnjpLstF6mMHJeSA948VdXnYx"
yelp_api = YelpAPI(api_key)


def get_restaurants(city_name):
    city_name_real = " ".join(city_name.split("_")[0].split("-")).title()
    state = " ".join(city_name.split("_")[1].split("-")).title()
    count = 0
    if city_name == "washington_district-of-columbia":
        city = "washington_district-of-columbia"
    else:
        city = city_name.split("_")[0]

    search_results = yelp_api.search_query(location=city)

    for buis in search_results["businesses"]:
        print(city_name)
        count = count + 1
        print(buis["rating"])
        rating = buis["rating"]
        price = "$"
        if buis.get("price"):
            price = buis["price"]
        review_count = buis["review_count"]
        categories = buis["categories"]
        i = iter(categories)
        final_cat = next(i)["title"]
        transactions = buis["transactions"]
        transactions_string = ",".join(transactions)
        name = buis["name"]
        # city = buis['location']['city']
        # state = buis['location']['state']
        street = buis["location"]["address1"]
        image_url = buis["image_url"]

        db.session.add(
            Restaurant(
                restaurant_name=str(name),
                rating=rating,
                image_url=str(image_url),
                price=str(price),
                review_count=review_count,
                city_name=str(city_name_real),
                state_name=str(state),
                transactions=str(transactions_string),
                categories=final_cat,
                address=str(street),
                city_state_name=str(city_name),
            )
        )
        db.session.commit()
    print(count)


import csv


def get_cities_list():
    cities_list = list()
    with open("cities.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        line_count = 0
        for row in csv_reader:
            d = row[1].split()
            e = "-".join(d)
            city_name = e
            city_name += "_"
            f = row[2].split()
            g = "-".join(f)
            city_name += g
            cities_list.append(city_name.lower())
            line_count += 1
    return cities_list


def add_rest_to_db():
    cities_list = get_cities_list()
    for city in cities_list:
        print("Adding Restaurants")
        get_restaurants(city)


# add_rest_to_db()
