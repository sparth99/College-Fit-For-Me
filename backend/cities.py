from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
import requests
import json
import csv
from models import app, db, City
from image_search import get_image_search
import requests
import random

numbeo_key = "g2fua1ma49ahyh"

states = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY",
    "District of Columbia": "DC",
}


def getNumbeoJson(name):
    numbeoAPI = "https://www.numbeo.com/api/indices?api_key=" + numbeo_key + "&&query="
    try:
        numbeoData = requests.get(url=numbeoAPI + name)
        numbeoJson = json.loads(numbeoData.text)
        crime_index = numbeoJson["crime_index"]
    except:
        try:
            numbeoData = requests.get(url=numbeoAPI + name[: name.index(",")])
            numbeoJson = json.loads(numbeoData.text)
            crime_index = numbeoJson["crime_index"]
        except:
            try:
                numbeoData = requests.get(url=numbeoAPI + name[: name.index("-")])
                numbeoJson = json.loads(numbeoData.text)
                crime_index = numbeoJson["crime_index"]
            except:
                try:
                    numbeoData = requests.get(url=numbeoAPI + name[: name.index("/")])
                    numbeoJson = json.loads(numbeoData.text)
                    crime_index = numbeoJson["crime_index"]
                except:
                    print(name + " failed to get numbeoJson")
                    return None
    return numbeoJson


def getTimeZone(name):
    teleportCityAPI = "https://api.teleport.org/api/cities/?search="
    try:
        teleportCityData = requests.get(url=teleportCityAPI + name + "&limit=1")
        teleportCityJson = json.loads(teleportCityData.text)
        teleportCityTimeData = requests.get(
            url=teleportCityJson["_embedded"]["city:search-results"][0]["_links"][
                "city:item"
            ]["href"]
        )
        teleportCityTimeJson = json.loads(teleportCityTimeData.text)
        time_zone = teleportCityTimeJson["_links"]["city:timezone"]["name"]
    except:
        try:
            teleportCityData = requests.get(
                url=teleportCityAPI + name[: name.index(",")] + "&limit=1"
            )
            teleportCityJson = json.loads(teleportCityData.text)
            teleportCityTimeData = requests.get(
                url=teleportCityJson["_embedded"]["city:search-results"][0]["_links"][
                    "city:item"
                ]["href"]
            )
            teleportCityTimeJson = json.loads(teleportCityTimeData.text)
            time_zone = teleportCityTimeJson["_links"]["city:timezone"]["name"]
        except:
            try:
                teleportCityData = requests.get(
                    url=teleportCityAPI + name[: name.index("-")] + "&limit=1"
                )
                teleportCityJson = json.loads(teleportCityData.text)
                teleportCityTimeData = requests.get(
                    url=teleportCityJson["_embedded"]["city:search-results"][0][
                        "_links"
                    ]["city:item"]["href"]
                )
                teleportCityTimeJson = json.loads(teleportCityTimeData.text)
                time_zone = teleportCityTimeJson["_links"]["city:timezone"]["name"]
            except:
                try:
                    teleportCityData = requests.get(
                        url=teleportCityAPI + name[: name.index("/")] + "&limit=1"
                    )
                    teleportCityJson = json.loads(teleportCityData.text)
                    teleportCityTimeData = requests.get(
                        url=teleportCityJson["_embedded"]["city:search-results"][0][
                            "_links"
                        ]["city:item"]["href"]
                    )
                    teleportCityTimeJson = json.loads(teleportCityTimeData.text)
                    time_zone = teleportCityTimeJson["_links"]["city:timezone"]["name"]
                except:
                    print(name + " failed to get timezone")
                    return "failed time"
    return time_zone


def getCrimeIndex(name, numbeoJson):
    try:
        crime_index = numbeoJson["crime_index"]
    except:
        print(name + " failed to get crime_index")
        crime_index = -1.0
    return crime_index


def getPollutionIndex(name, numbeoJson):
    try:
        pollution_index = numbeoJson["pollution_index"]
    except:
        print(name + " failed to get pollution_index")
        pollution_index = -1.0
    return pollution_index


def getRentIndex(name, numbeoJson):
    try:
        rent_index = numbeoJson["rent_index"]
    except:
        print(name + " failed to get rent_index")
        rent_index = -1.0
    return rent_index


def getRestaurantIndex(name, numbeoJson):
    try:
        restaurant_price_index = numbeoJson["restaurant_price_index"]
    except:
        print(name + " failed to get restaurant_price_index")
        restaurant_price_index = -1.0
    return restaurant_price_index


def getTrafficIndex(name, numbeoJson):
    try:
        traffic_index = numbeoJson["traffic_index"]
    except:
        print(name + " failed to get traffic_index")
        traffic_index = -1.0
    return traffic_index


def getSafetyIndex(name, numbeoJson):
    try:
        safety_index = numbeoJson["safety_index"]
    except:
        print(name + " failed to get safety_index")
        safety_index = -1.0
    return safety_index


def getHealthIndex(name, numbeoJson):
    try:
        health_care_index = numbeoJson["health_care_index"]
    except:
        print(name + " failed to get health_care_index")
        health_care_index = -1.0
    return health_care_index


def getStateName(name):
    return states[name]


def getCityStateName(name):
    trueName = name.lower()
    commaIndex = trueName.index(",")
    trueName = trueName[0 : commaIndex + 1] + trueName[commaIndex + 2 :]
    trueName = trueName.replace(" ", "-")
    trueName = trueName.replace(",", "_")
    return trueName


def get_cities():
    cityNameList = list()
    stateNameList = list()
    cityPopulationList = list()
    with open("cities.csv") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        for row in csv_reader:
            cityNameList += [row[1]]
            stateNameList += [row[2]]
            cityPopulationList += [row[3]]
    for num in range(0, 100):
        city_state_name = cityNameList[num] + ", " + stateNameList[num]
        city_name = cityNameList[num]
        state_name = stateNameList[num]
        numbeoJson = getNumbeoJson(city_state_name)
        try:
            db.session.add(
                City(
                    city_name=city_name,
                    state_name=state_name,
                    city_state_name=getCityStateName(city_state_name),
                    population=cityPopulationList[num],
                    crime_index=getCrimeIndex(city_state_name, numbeoJson),
                    pollution_index=getPollutionIndex(city_state_name, numbeoJson),
                    rent_index=getRentIndex(city_state_name, numbeoJson),
                    restaurant_price_index=getRestaurantIndex(
                        city_state_name, numbeoJson
                    ),
                    traffic_index=getTrafficIndex(city_state_name, numbeoJson),
                    safety_index=getSafetyIndex(city_state_name, numbeoJson),
                    health_care_index=getHealthIndex(city_state_name, numbeoJson),
                    time_zone=getTimeZone(city_state_name),
                    image_url=get_image_search(str(city_name) + str(state_name)),
                )
            )
        except Exception as e:
            print("didn't add: " + city_state_name + " " + str(e))
        db.session.commit()


# get_cities()
