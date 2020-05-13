import csv
import requests as reqs
from models import app, db, University
import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys
from image_search import get_image_search
import requests
import random

zips = {
    "new-york_new-york": 10001,
    "los-angeles_california": 90001,
    "chicago_illinois": 60637,
    "houston_texas": 77001,
    "philadelphia_pennsylvania": 19019,
    "phoenix_arizona": 85001,
    "san-antonio_texas": 78201,
    "san-diego_california": 92101,
    "dallas_texas": 75201,
    "san-jose_california": 95101,
    "austin_texas": 78712,
    "indianapolis_indiana": 46201,
    "jacksonville_florida": 32099,
    "san-francisco_california": 94016,
    "columbus_ohio": 43085,
    "charlotte_north-carolina": 28201,
    "fort-worth_texas": 76101,
    "detroit_michigan": 48201,
    "el-paso_texas": 79901,
    "memphis_tennessee": 37501,
    "seattle_washington": 98101,
    "denver_colorado": 80201,
    "washington_district-of-columbia": 20003,
    "boston_massachusetts": "02108",
    "nashville_tennessee": 37011,
    "baltimore_maryland": 21201,
    "oklahoma-city_oklahoma": 73008,
    "louisville_kentucky": 40018,
    "portland_oregon": 97035,
    "las-vegas_nevada": 89154,
    "milwaukee_wisconsin": 53201,
    "albuquerque_new-mexico": 87101,
    "tucson_arizona": 85721,
    "fresno_california": 93650,
    "sacramento_california": 94203,
    "long-beach_california": 90712,
    "kansas-city_missouri": 64030,
    "mesa_arizona": 85201,
    "virginia-beach_virginia": 23450,
    "atlanta_georgia": 30301,
    "colorado-springs_colorado": 80829,
    "omaha_nebraska": 68007,
    "raleigh_north-carolina": 27513,
    "miami_florida": 33101,
    "oakland_california": 94501,
    "minneapolis_minnesota": 55111,
    "tulsa_oklahoma": 74008,
    "cleveland_ohio": 44101,
    "wichita_kansas": 67052,
    "arlington_texas": 76001,
    "new-orleans_louisiana": 70032,
    "bakersfield_california": 93301,
    "tampa_florida": 33601,
    "honolulu_hawaii": 96795,
    "aurora_colorado": 80010,
    "anaheim_california": 92801,
    "santa-ana_california": 92701,
    "st.-louis_missouri": 63101,
    "riverside_california": 92501,
    "corpus-christi_texas": 78404,
    "lexington_kentucky": 40502,
    "pittsburgh_pennsylvania": 15106,
    "anchorage_alaska": 99501,
    "stockton_california": 95201,
    "cincinnati_ohio": 41073,
    "st.-paul_minnesota": 55101,
    "toledo_ohio": 43460,
    "greensboro_north-carolina": 27214,
    "newark_new-jersey": "07101",
    "plano_texas": 75023,
    "henderson_nevada": 89002,
    "lincoln_nebraska": 68501,
    "buffalo_new-york": 14201,
    "jersey-city_new-jersey": "07030",
    "chula-vista_california": 91902,
    "fort-wayne_indiana": 46774,
    "orlando_florida": 32789,
    "st.-petersburg_florida": 33701,
    "chandler_arizona": 85224,
    "laredo_texas": 78040,
    "norfolk_virginia": 23324,
    "durham_north-carolina": 27517,
    "madison_wisconsin": 53558,
    "lubbock_texas": 79382,
    "irvine_california": 92602,
    "winston-salem_north-carolina": 27023,
    "glendale_arizona": 85031,
    "garland_texas": 75040,
    "berkeley_california": 94720,
    "reno_nevada": 89433,
    "chesapeake_virginia": 23320,
    "gilbert_arizona": 85142,
    "baton-rouge_louisiana": 70801,
    "irving_texas": 75014,
    "scottsdale_arizona": 85054,
    "north-las-vegas_nevada": 89030,
    "fremont_california": 94536,
    "boise-city_idaho": 83701,
    "richmond_virginia": 23173,
    "san-bernardino_california": 92346,
}


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


def get_universities():
    cities = get_cities_list()  # get cities list
    prac_set = set()
    # cities = ['austin_texas']
    # add uni's of every city
    for city in cities:
        zip_code = str(zips[city])
        response = reqs.get(
            "https://api.data.gov/ed/collegescorecard/v1/schools.json?zip="
            + zip_code
            + "&distance=15mi&2017.student.size__range=1000..&sort=2017.student.size:desc&per_page=100&fields=school.name,school.city,school.state,2017.admissions.sat_scores.average.overall,2017.admissions.act_scores.midpoint.cumulative,2017.student.demographics.men,2017.student.demographics.women,2017.completion.completion_rate_4yr_150nt,2017.student.size,2017.student.retention_rate.four_year.full_time,2017.admissions.admission_rate.overall,2017.cost.attendance.academic_year&api_key=kk16673qkcEAg5zZt2aAOC7ly6GqrNZOWtqLQceA"
        )
        data = response.json()
        query = data["results"]
        total_unis = data["metadata"]["total"]
        city_name = " ".join(city.split("_")[0].split("-")).title()
        state_name = " ".join(city.split("_")[1].split("-")).title()
        if total_unis == 0:
            print(city)
        for result in query:
            # % of women
            if result["2017.student.demographics.women"] == None:
                percent_women = 0
            else:
                percent_women = result["2017.student.demographics.women"] * 100
            # % of men
            if result["2017.student.demographics.men"] == None:
                percent_men = 0
            else:
                percent_men = result["2017.student.demographics.men"] * 100
            # cost of aacedemic year
            if result["2017.cost.attendance.academic_year"] == None:
                cost_per_year = 0
            else:
                cost_per_year = result["2017.cost.attendance.academic_year"]
            # retention rate
            if result["2017.student.retention_rate.four_year.full_time"] == None:
                retention_rate = 0
            else:
                retention_rate = (
                    result["2017.student.retention_rate.four_year.full_time"] * 100
                )
            # graduation rate
            if result["2017.completion.completion_rate_4yr_150nt"] == None:
                grad_rate = 0
            else:
                grad_rate = (
                    result["2017.completion.completion_rate_4yr_150nt"] * 100
                )  # probably not the right field
            # admission rate
            if result["2017.admissions.admission_rate.overall"] == None:
                admission_rate = 0
            else:
                admission_rate = result["2017.admissions.admission_rate.overall"] * 100
            # avg. act score
            if result["2017.admissions.act_scores.midpoint.cumulative"] == None:
                avg_act_score = 0
            else:
                avg_act_score = result["2017.admissions.act_scores.midpoint.cumulative"]
            # avg. sat score
            if result["2017.admissions.sat_scores.average.overall"] == None:
                avg_sat_score = 0
            else:
                avg_sat_score = result["2017.admissions.sat_scores.average.overall"]

            num_undergrads = result["2017.student.size"]
            name = result["school.name"]
            city_state_name = city
            prac_set.add(name)

            if db.session.query(University.name).filter_by(name=name).scalar() is None:
                db.session.add(
                    University(
                        name=name,
                        city_name=city_name,  # str
                        state_name=state_name,  # str
                        city_state_name=city_state_name,  # str
                        num_undergrads=num_undergrads,  # str
                        admission_rate=admission_rate,  # str
                        cost_per_year=cost_per_year,  # str
                        retention_rate=retention_rate,  # str
                        percent_men=percent_men,  # str
                        percent_women=percent_women,  # str
                        grad_rate=grad_rate,  # str
                        avg_sat_score=avg_sat_score,  # int
                        avg_act_score=avg_act_score,  # int
                        image_url=get_image_search(name),
                    )
                )
                db.session.commit()


# get request to this api for specific zip: https://api.data.gov/ed/collegescorecard/v1/schools.json?zip=78712&distance=15mi&2017.student.size__range=1000..&sort=2017.student.size:desc&per_page=100&fields=school.name,2017.student.demographics.men,2017.student.demographics.women,2017.completion.completion_rate_4yr_150nt,2017.student.size,2017.student.retention_rate.four_year.full_time,2017.admissions.admission_rate.overall,2017.cost.attendance.academic_year&api_key=kk16673qkcEAg5zZt2aAOC7ly6GqrNZOWtqLQceA
# example api call to find more attributes: https://api.data.gov/ed/collegescorecard/v1/schools.json?zip=78712&distance=10mi&2017.student.size__range=1000..&sort=2017.student.size:desc&per_page=1&fields=school.name,2017.student.size,2017&api_key=kk16673qkcEAg5zZt2aAOC7ly6GqrNZOWtqLQceA
# add a image api to the model.
# Potential image API: https://unsplash.com/documentation#creating-a-developer-account


# get_universities()
