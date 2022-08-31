from user import User
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, create_refresh_token
from hmac import compare_digest
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime


class UserLogin(Resource):
    # defining the request parser and expected arguments in the request
    parser = reqparse.RequestParser()
    parser.add_argument(
        "email", type=str, required=True, help="This field cannot be blank."
    )
    parser.add_argument(
        "password", type=str, required=True, help="This field cannot be blank."
    )

    def post(self):
        data = self.parser.parse_args()
        # read from database to find the user and then check the password
        user = User.find_by_email(data["email"])

        if user and compare_digest(user.password, data["password"]):
            # when authenticated, return a fresh access token and a refresh token
            access_token = create_access_token(
                identity=user.id,
                expires_delta=datetime.timedelta(days=1),
                fresh=True,
            )
            return {
                "token": access_token,
                "user": {
                    "id": user.id,
                    "name": user.username,
                    "email": user.email,
                    "password": user.password,
                },
            }, 200

        return {"message": "Invalid Credentials!"}, 401


# class TokenRefresh(Resource):
#     @jwt_required(refresh=True)
#     def post(self):
#         # retrive the user's identity from the refresh token using a Flask-JWT-Extended built-in method
#         current_user = get_jwt_identity()
#         # return a non-fresh token for the user
#         new_token = create_access_token(
#             identity=current_user,
#             expires_delta=datetime.timedelta(minutes=15),
#             fresh=False,
#         )
#         return {"access_token": new_token}, 200
