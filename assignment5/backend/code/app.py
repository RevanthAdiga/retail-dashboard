from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager
from user import UserRegister
from security import UserLogin
from analysis import Charts

# from security import authenticate, identity
# from user import UserRegister

from analysis import Analysis

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["JWT_SECRET_KEY"] = "jwt-secret-string"

jwt = JWTManager(app)
app.secret_key = "revanth"
api = Api(app)

# jwt = JWT(app, authenticate, identity)
@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


api.add_resource(Charts, "/charts/<string:id>")
api.add_resource(UserRegister, "/register")
api.add_resource(UserLogin, "/auth")

if __name__ == "__main__":
    app.run(debug=True)
