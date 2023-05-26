from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import pandas as pd
from flask_cors import CORS
import pickle
import mysql.connector

# Creating instance of flask and calling it app
app = Flask(__name__)

# CORS for cross-origin resource sharing
CORS(app)

# Creating an instance of API object
api = Api(app)

# Connect to MySQL database
def connect_to_database():
    return mysql.connector.connect(
        host='your_host',
        user='your_username',
        password='your_password',
        database='your_database'
    )

class Prediction(Resource):
    def get(self):
        # Fetch the customer_id from the MySQL database
        db_connection = connect_to_database()
        cursor = db_connection.cursor()
        query = "SELECT food_name FROM your_table WHERE condition"
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        db_connection.close()

        if result is None:
            return {'error': 'No customer found'}, 404

        customer_id = result[0]
        n = 10  # Set the value of n as per your requirement

        # Use the customer_id and n as input for prediction
        # Load the model from the .pkl file
        model = pickle.load(open('food_model.pkl', 'rb'))

        # Perform prediction using the loaded model
        # Replace this with your actual prediction logic
        prediction = model.predict(customer_id, n)

        # Return the prediction as a JSON response
        return jsonify({'customer_id': customer_id, 'prediction': prediction})

# Add the prediction resource to the API
api.add_resource(Prediction, '/prediction')

if __name__ == '__main__':
    app.run()

# https://www.youtube.com/watch?v=HxLm-kZlXgU    