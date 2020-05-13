import requests
import pprint
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import json
import sys
from sqlalchemy import create_engine

# postgres
# hello-password
app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres://parth_shah:hello@localhost:5432/college"
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://postgres:hello-password@college-fit-db.cq0dckr3xx7y.us-west-2.rds.amazonaws.com:5432/"

db = SQLAlchemy(app)


def to_json(inst, cls):
    """
    Jsonify the sql alchemy query result.
    """
    convert = dict()
    d = dict()
    for c in cls.__table__.columns:
        v = getattr(inst, c.name)
        if c.type in convert.keys() and v is not None:
            try:
                d[c.name] = convert[c.type](v)
            except:
                d[c.name] = "Error:  Failed to covert using ", str(convert[c.type])
        elif v is None:
            d[c.name] = str()
        else:
            d[c.name] = v
    return json.dumps(d)


class Restaurant(db.Model):
    __tablename__ = "Restaurant"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    restaurant_name = db.Column(db.String(), nullable=False, unique=False)
    rating = db.Column(db.Float, nullable=False, unique=False)
    image_url = db.Column(db.String(), nullable=False, unique=False)
    price = db.Column(db.String(), nullable=False, unique=False)
    review_count = db.Column(db.Integer, nullable=False, unique=False)
    city_name = db.Column(db.String(), nullable=False, unique=False)
    state_name = db.Column(db.String(), nullable=False, unique=False)
    transactions = db.Column(db.String(), nullable=False, unique=False)
    categories = db.Column(db.String(), nullable=False, unique=False)
    address = db.Column(db.String(), nullable=False, unique=False)
    city_state_name = db.Column(db.String(), nullable=False, unique=False)

    def __repr__(self):
        return to_json(self, self.__class__)


class City(db.Model):
    __tablename__ = "City"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    city_name = db.Column(db.String(), nullable=False, unique=False)
    state_name = db.Column(db.String(), nullable=False, unique=False)
    city_state_name = db.Column(db.String(), nullable=False, unique=False)
    population = db.Column(db.Integer, nullable=False, unique=False)
    crime_index = db.Column(db.Float, nullable=False, unique=False)
    pollution_index = db.Column(db.Float, nullable=False, unique=False)
    rent_index = db.Column(db.Float, nullable=False, unique=False)
    restaurant_price_index = db.Column(db.Float, nullable=False, unique=False)
    traffic_index = db.Column(db.Float, nullable=False, unique=False)
    safety_index = db.Column(db.Float, nullable=False, unique=False)
    health_care_index = db.Column(db.Float, nullable=False, unique=False)
    time_zone = db.Column(db.String(), nullable=False, unique=False)
    image_url = db.Column(db.String(), nullable=False, unique=False)
    wiki_text = db.Column(db.String(), nullable=False, unique=False)

    def __repr__(self):
        return to_json(self, self.__class__)


class University(db.Model):
    __tablename__ = "University"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), nullable=False, unique=False)
    city_name = db.Column(db.String(), nullable=False, unique=False)
    state_name = db.Column(db.String(), nullable=False, unique=False)
    city_state_name = db.Column(db.String(), nullable=False, unique=False)
    num_undergrads = db.Column(db.Integer, nullable=False, unique=False)
    admission_rate = db.Column(db.Float, nullable=False, unique=False)
    cost_per_year = db.Column(db.Float, nullable=False, unique=False)
    retention_rate = db.Column(db.Float, nullable=False, unique=False)
    percent_men = db.Column(db.Float, nullable=False, unique=False)
    percent_women = db.Column(db.Float, nullable=False, unique=False)
    grad_rate = db.Column(db.Float, nullable=False, unique=False)
    avg_sat_score = db.Column(db.Integer, nullable=False, unique=False)
    avg_act_score = db.Column(db.Integer, nullable=False, unique=False)
    image_url = db.Column(db.String(), nullable=False, unique=False)
    wiki_text = db.Column(db.String(), nullable=False, unique=False)

    def __repr__(self):
        return to_json(self, self.__class__)


db.create_all()
db.session.commit()

engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"])
