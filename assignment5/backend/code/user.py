import sqlite3
from flask_restful import Resource, reqparse


class User:
    TABLE_NAME = "users"

    def __init__(self, _id, username, email, password):
        self.id = _id
        self.username = username
        self.email = email
        self.password = password

    @classmethod
    def find_by_email(cls, email):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()

        query = "SELECT * FROM {table} WHERE email=?".format(table=cls.TABLE_NAME)
        result = cursor.execute(query, (email,))
        row = result.fetchone()
        if row:
            user = cls(*row)
        else:
            user = None

        connection.close()
        return user

    @classmethod
    def find_by_id(cls, _id):
        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()

        query = "SELECT * FROM {table} WHERE id=?".format(table=cls.TABLE_NAME)
        result = cursor.execute(query, (_id,))
        row = result.fetchone()
        if row:
            user = cls(*row)
        else:
            user = None

        connection.close()
        return user


class UserRegister(Resource):
    TABLE_NAME = "users"

    parser = reqparse.RequestParser()
    parser.add_argument(
        "username", type=str, required=True, help="This field cannot be left blank!"
    )
    parser.add_argument(
        "email", type=str, required=True, help="This field cannot be left blank!"
    )
    parser.add_argument(
        "password", type=str, required=True, help="This field cannot be left blank!"
    )

    def post(self):
        data = UserRegister.parser.parse_args()

        if User.find_by_email(data["email"]):
            return {"message": "User with that email already exists."}, 400

        connection = sqlite3.connect("data.db")
        cursor = connection.cursor()

        query = "INSERT INTO {table} VALUES (NULL, ?, ?, ?)".format(
            table=self.TABLE_NAME
        )
        cursor.execute(query, (data["username"], data["email"], data["password"]))

        connection.commit()
        connection.close()

        return {"message": "User created successfully."}, 201
