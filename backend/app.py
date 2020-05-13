from flask import Flask
from models import app, db, Restaurant, City, University, engine
from restaurants import add_rest_to_db
from cities import get_cities
from universities import get_universities
from flask import Flask, request, abort
from flask_sqlalchemy import SQLAlchemy
import json
import pprint
import requests
from sqlalchemy import create_engine, or_, func, desc
from sqlalchemy.orm import sessionmaker
from flask_cors import CORS
from flask import request
from flask import Response
from youtube_link import get_youtube_link

from sqlalchemy import inspect

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)
DBSession = sessionmaker(bind=engine)
db.metadata.bind = engine
global session
session = DBSession()


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key) for c in inspect(obj).mapper.column_attrs}


@app.route("/")
def home():
    res = [
        "Welcome to the CollegeFitFor.me REST API",
        "Available Endpoints<br/>",
        "/restaurants",
        "/cities",
        "/universities",
        "/cities/search/",
        "/universities/search/",
        "/restaurants/search/",
        "/cities/filter/",
        "/universities/filter/",
        "/restaurants/filter/",
        "/cities/vis/",
        "/universities/vis/",
        "/restaurants/vis/",
    ]
    return "<br/>".join(res)


@app.route("/restaurants", methods=["GET"])
def get_all_restaurants():
    rest_name = request.args.get("name", None)
    page = int(request.args.get("page", 1))
    rest_name_flag = False
    if rest_name:
        try:
            try:
                rest_id = rest_name.split("*")[1]
            except IndexError:
                abort(404, description="Resource not found")
            all_restaurants = Restaurant.query.filter_by(id=int(rest_id))
            rest_json = json.loads("[" + str(next(iter(all_restaurants))) + "]")
            rest_name_flag = True
        except StopIteration:
            abort(404, description="Resource not found")
    else:
        all_restaurants = Restaurant.query.paginate(page, 20)
        rest_json = json.loads(str(all_restaurants.items))
    ########################################################################
    for rest in rest_json:
        unv_in_city = University.query.filter_by(city_name=rest["city_name"])
        rest_list = list()
        for unv in unv_in_city:
            rest_list.append(unv.name)
        rest["universities"] = rest_list
        if rest_name_flag:
            rest["youtube_link"] = get_youtube_link(
                rest["restaurant_name"] + " " + rest["city_name"]
            )
    ##########################################s###############################
    return json.dumps(rest_json)

@app.route("/cities", methods=["GET"])
def get_all_cities():
    city_name = request.args.get("name", None)
    page = int(request.args.get("page", 1))
    city_name_flag = False
    if city_name:
        all_cities = City.query.filter_by(city_state_name=city_name)
        try:
            city_name_flag = True
            city_json = json.loads("[" + str(next(iter(all_cities))) + "]")
        except StopIteration:
            abort(404, description="Resource not found")
    else:
        all_cities = City.query.paginate(page, 20)
        city_json = json.loads(str(all_cities.items))
    ########################################################################
    for city in city_json:
        rests_in_city = Restaurant.query.filter_by(city_name=city["city_name"])
        rest_list = list()
        for rest in rests_in_city:
            rest_list.append(rest.restaurant_name + "*" + str(rest.id))
        city["restaurants"] = rest_list
    ########################################################################
    for city in city_json:
        rests_in_city = University.query.filter_by(city_name=city["city_name"])
        rest_list = list()
        for rest in rests_in_city:
            rest_list.append(rest.name)
        city["universities"] = rest_list
        if city_name_flag:
            city["youtube_link"] = get_youtube_link(
                city["city_name"] + " " + city["state_name"] + " tour"
            )
    #########################################################################
    return json.dumps(city_json)


@app.route("/universities", methods=["GET"])
def get_all_universities():
    uni_name = request.args.get("name", None)
    page = int(request.args.get("page", 1))
    uni_name_flag = False
    if uni_name:
        all_universities = University.query.filter_by(name=uni_name)
        try:
            uni_json = json.loads("[" + str(next(iter(all_universities))) + "]")
            uni_name_flag = True
        except StopIteration:
            abort(404, description="Resource not found")
    else:
        all_universities = University.query.paginate(page, 20)
        uni_json = json.loads(str(all_universities.items))
    ##########################################
    for uni in uni_json:
        rests_in_city = Restaurant.query.filter_by(city_name=uni["city_name"])
        rest_list = list()
        for rest in rests_in_city:
            rest_list.append(rest.restaurant_name + "*" + str(rest.id))
        uni["restaurants"] = rest_list
        if uni_name_flag:
            uni["youtube_link"] = get_youtube_link(uni["name"] + " tour")
    ###########################################
    return json.dumps(uni_json)


@app.route("/cities/search/")
def search_city():
    city_query = request.args.get("search_query", "")
    return_list = list()
    if city_query is not None:
        all_cities = City.query.all()
        b = json.loads(str(list(all_cities)))
        for thing in b:
            for key, value in thing.items():
                if str(city_query).lower() in str(value).lower():
                    return_list.append(thing)
                    break
    return json.dumps(return_list)


@app.route("/universities/search/")
def search_university():
    city_query = request.args.get("search_query", "")
    return_list = list()
    if city_query is not None:
        all_cities = University.query.all()
        b = json.loads(str(list(all_cities)))
        for thing in b:
            for key, value in thing.items():
                if str(city_query).lower() in str(value).lower():
                    return_list.append(thing)
                    break
    return json.dumps(return_list)


@app.route("/restaurants/search/")
def search_restaurant():
    city_query = request.args.get("search_query", "")
    return_list = list()
    if city_query is not None:
        all_cities = Restaurant.query.all()
        b = json.loads(str(list(all_cities)))
        for thing in b:
            for key, value in thing.items():
                if str(city_query).lower() in str(value).lower():
                    return_list.append(thing)
                    break
    return json.dumps(return_list)


@app.route("/cities/filter/")
def filter_city():
    args = request.args
    d = dict(args)
    for key, value in d.items():
        d[key] = "".join(d[key])
    page = int(d["page"])
    order = d.get("order")
    asc_dsc = "asc"
    if order:
        asc_dsc = order.split("*")[1]
        order = order.split("*")[0]
    del d["page"]
    d.pop("order", None)
    if asc_dsc == "asc":
        results = City.query.filter_by(**d).order_by(order).paginate(page, 20)
    else:
        results = City.query.filter_by(**d).order_by(desc(order)).paginate(page, 20)
    rest_json = json.loads(str(results.items))
    return json.dumps(rest_json)


@app.route("/universities/filter/")
def filter_university():
    args = request.args
    d = dict(args)
    for key, value in d.items():
        d[key] = "".join(d[key])
    page = int(d["page"])
    order = d.get("order")
    asc_dsc = "asc"
    if order:
        asc_dsc = order.split("*")[1]
        order = order.split("*")[0]
    del d["page"]
    d.pop("order", None)
    if asc_dsc == "asc":
        results = University.query.filter_by(**d).order_by(order).paginate(page, 20)
    else:
        results = (
            University.query.filter_by(**d).order_by(desc(order)).paginate(page, 20)
        )
    rest_json = json.loads(str(results.items))
    return json.dumps(rest_json)


@app.route("/restaurants/filter/")
def filter_restaurant():
    args = request.args
    d = dict(args)
    for key, value in d.items():
        d[key] = "".join(d[key])
    page = int(d["page"])
    order = d.get("order")
    asc_dsc = "asc"
    if order:
        asc_dsc = order.split("*")[1]
        order = order.split("*")[0]
    del d["page"]
    d.pop("order", None)
    if asc_dsc == "asc":
        results = Restaurant.query.filter_by(**d).order_by(order).paginate(page, 20)
    else:
        results = (
            Restaurant.query.filter_by(**d).order_by(desc(order)).paginate(page, 20)
        )
    rest_json = json.loads(str(results.items))
    return json.dumps(rest_json)


@app.route("/restaurants/vis/")
def res_vis():
    query = (
        'SELECT Categories, count(Categories) FROM "Restaurant" group by Categories;'
    )
    res = db.engine.execute(query)
    a = list()
    for thing in res:
        print(thing)
        d = dict()
        d["label"] = thing[0]
        d["value"] = thing[1]
        a.append(d)
    return json.dumps(a)

@app.route("/universities/vis/")
def univ_vis():
    query = (
        'SELECT State_name, count(State_name) FROM "University" group by State_name'
    )
    res = db.engine.execute(query)
    a = dict()
    for thing in res:
        a[thing[0]] = thing[1]
    return json.dumps(a)

@app.route("/cities/vis/")
def cities_vis():
    query = (
        'SELECT State_name, count(State_name) FROM "City" group by State_name'
    )
    res = db.engine.execute(query)
    a = dict()
    for thing in res:
        a[thing[0]] = thing[1]
    return json.dumps(a)

@app.route("/sql/")
def sql():
    search = request.args.get("search_query", "")
    index = request.args.get("names","")
    names = index.split(",")
    query = (
        search
    )
    res = db.engine.execute(query)
    a = list()
    for thing in res:
        d = dict()
        count = 0
        for thing1 in names:
            d[thing1] = thing[count]
            count += 1
        a.append(d)
    return json.dumps(a)

if __name__ == "__main__":
    # f = open("add_db_var.txt", "r")
    # bool_var = f.readline()
    # f.close()
    # if bool_var == '0':
    #     # add_rest_to_db()
    #     # get_cities()
    #     # get_universities()
    #     g = open("add_db_var.txt", "w")
    #     g.write("1")
    #     g.close()
    app.run(debug=True, host="0.0.0.0")
