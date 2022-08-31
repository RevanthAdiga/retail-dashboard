import sqlite3
from flask_restful import Resource, reqparse
import pandas as pd
from flask_jwt_extended import jwt_required


class Analysis:
    TABLE_NAME = "dataset"

    @classmethod
    def shot_by_race(cls):
        connection = sqlite3.connect("data.db")
        races = pd.read_sql("SELECT race FROM dataset", connection)
        print(races["race"].value_counts().to_json())
        return races["race"].value_counts().to_json()

    @classmethod
    def shot_by_TopCity(cls):
        connection = sqlite3.connect("data.db")
        city = pd.read_sql("SELECT city FROM dataset", connection)
        topcity = city["city"].value_counts()[0:5]
        return topcity.to_json()

    @classmethod
    def ill_suspect(cls):
        connection = sqlite3.connect("data.db")
        mental_illness = pd.read_sql(
            "SELECT signs_of_mental_illness FROM dataset", connection
        )
        return mental_illness["signs_of_mental_illness"].value_counts().to_json()

    @classmethod
    def threat_level(cls):
        connection = sqlite3.connect("data.db")
        threat_level = pd.read_sql("SELECT threat_level FROM dataset", connection)
        return threat_level["threat_level"].value_counts().to_json()

    @classmethod
    def flee(cls):
        connection = sqlite3.connect("data.db")
        flee = pd.read_sql("SELECT flee FROM dataset", connection)
        return flee["flee"].value_counts().to_json()

    @classmethod
    def arms_category(cls):
        connection = sqlite3.connect("data.db")
        arms_category = pd.read_sql("SELECT arms_category FROM dataset", connection)
        return arms_category["arms_category"].value_counts().to_json()

    @classmethod
    def manner_of_death(cls):
        connection = sqlite3.connect("data.db")
        manner_of_death = pd.read_sql("SELECT manner_of_death FROM dataset", connection)
        return manner_of_death["manner_of_death"].value_counts().to_json()

    @classmethod
    def age(cls):
        connection = sqlite3.connect("data.db")
        age = pd.read_sql("SELECT age FROM dataset", connection)
        print(age["age"].value_counts())
        return age["age"].value_counts().to_json()


class Charts(Resource):
    @jwt_required()
    def get(self, id):
        if id == "1":
            return Analysis.shot_by_race()
        if id == "2":
            return Analysis.shot_by_TopCity()
        if id == "3":
            return Analysis.ill_suspect()
        if id == "4":
            return Analysis.threat_level()
        if id == "5":
            return Analysis.flee()
        if id == "6":
            return Analysis.arms_category()
        if id == "7":
            return Analysis.manner_of_death()
        if id == "8":
            return Analysis.age()
