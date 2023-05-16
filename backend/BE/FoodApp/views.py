from django.shortcuts import render

# Create your views here.
from django.views import View
from django.http import JsonResponse,HttpResponse
from django.core import serializers
from django.urls import reverse
from .models import User, FoodDataTest,Review,Restaurant
import json

from django.contrib.auth import authenticate, login

from django.views.decorators.csrf import ensure_csrf_cookie, get_token



from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password

from django.core.exceptions import ValidationError

class SignupView(View):
    @csrf_exempt
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)
        existing_user = None
        print('Received data:', data)

        existing_user = User.objects.filter(email=data.get('email')).first()
        # Check if the user already exists in the database
        
        # existing_user = User.objects.filter(email=data[0]['email']).first()
        if existing_user is not None:
            return JsonResponse({'error': 'User with this email already exists'})
        else:
            user = User(email=data['email'], 
            password=data['password'], 
            first_name=data['first_name'],
            last_name=data['last_name'])
        user.save()
        return JsonResponse({'success': True})

            #user.save()

            # Return a JSON response with the serialized user data
            #response_data = serializers.serialize('json', [user])
            #return JsonResponse(response_data, safe=False)
       





class LoginView(View):
    @csrf_exempt
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)        
        existing_user = None
        print('Received data:', data)
     
       
        # Check if the user already exists in the database
        existing_user = User.objects.filter(email=data.get('email'), password=data.get('password')).first()
    
        
        # existing_user = User.objects.filter(email=data[0]['email']).first()
        if existing_user is not None:
            #url = reverse('dashboard', kwargs={'user_id': existing_user.id})
            user_id= existing_user.user_id
            print(existing_user.user_id)
            return JsonResponse({'success':True, 'user_id': user_id})
            #return JsonResponse({'success':True})
        else:
            return JsonResponse({'error': 'User does not exist'})
      
'''
        # Authenticate user using provided credentials
        user = authenticate(request, email=data['email'], password=data['password'])
        print(user)
        if user is not None:
            # Login the user and return a success message
            login(request, user)
            #return JsonResponse({'message': 'Login successful'})
            return JsonResponse({'success': True})
        else:
            # Return an error message if the authentication failed
            return JsonResponse({'error': 'Invalid email or password'})'''
        

class ResetPasswordView(View):
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)

        print('Received data:', data)
        
        # Check if the user with the given email exists in the database
        user = User.objects.filter(email=data['email']).first()
        if user is None:
            return JsonResponse({'error': 'User with this email does not exist'})

        # Check that the new password and confirm password match
        if data['new_password'] != data['confirm_password']:
            return JsonResponse({'error': 'New password and confirm password do not match'})

        # Set the new password for the user and save it to the database
        user.set_password(data['new_password'])
        user.save()

        # Return a success message
        return JsonResponse({'message': 'Password reset successful'})


def user_list(request):
    users = User.objects.all()
    data = serializers.serialize('json', users)
    return JsonResponse(data, safe=False)





from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User

class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


### dash data
def food_list(request):
    food_data = list(FoodDataTest.objects.values())
    return JsonResponse(food_data, safe=False)

class SaveReviewView(View):
    @csrf_exempt
    def post(self, request):
        data = json.loads(request.body)
        
        restaurant = data.get('restaurant')
        name = data.get('Name')
        rating = data.get('Rating')
        review = data.get('Review')
        
        # Create a new review object and save it to the database
        review = Review(restaurant=restaurant, name=name, rating=rating, review=review)
        review.save()
        
        return JsonResponse({'success': True})

@csrf_exempt
def save_reviews(request):
    # Get the JSON data from the request
    data = json.loads(request.body)

    # Loop through the reviews and save them to the database
    for restaurant, reviews in data["Reviews"].items():
        for review in reviews:
            r = Review(id=review["Id"], restaurant=restaurant, name=review["Name"], rating=review["Rating"], review=review["Review"])
            r.save()

    return JsonResponse({"message": "Reviews saved successfully"})

@csrf_exempt
def save_restaurant_data(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        for restaurant in data:
            Restaurant.objects.create(
                id = restaurant['id'],
                authentication_id = restaurant['authentication_id'],
                vendor_category_en = restaurant['vendor_category_en'],
                vendor_category_id = restaurant['vendor_category_id'],
                delivery_charge = restaurant['delivery_charge'],
                serving_distance = restaurant['serving_distance'],
                OpeningTime = restaurant['OpeningTime'],
                prepration_time = restaurant['prepration_time'],
                discount_percentage = restaurant['discount_percentage'],
                vendor_rating = restaurant['vendor_rating'],
                vendor_tag = restaurant['vendor_tag'],
                vendor_tag_name = restaurant['vendor_tag_name'],
                created_at = restaurant['created_at'],
                vendor_name = restaurant['vendor_name']
            )
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'failure', 'message': 'Invalid request method'})

'''def food_list(request):
  
    food_data = FoodDataTest.objects.all()
     with open('data/food_data.json') as f:
        food_data = json.load(f)
    return JsonResponse(food_data, safe=False)'''



'''
from django.middleware import csrf
from django.views.decorators.csrf import ensure_csrf_cookie, get_token

from django.views.decorators.csrf import csrf_protect

@csrf_protect
@ensure_csrf_cookie
def csrf(request):
    token = csrf.get_token(request)
    print(token)
    return JsonResponse({'csrftoken': token})
   # return JsonResponse({'csrftoken': 'success'})
'''

import mysql.connector
import json

# Establish a connection to your MySQL database
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="123456",
  database="x"
)

@csrf_exempt
def get_reviews(request):
    # Create a cursor object to execute queries
    mycursor = mydb.cursor()

    # Execute your query
    mycursor.execute("SELECT * FROM ReviewTest")

    # Fetch all rows as a list of tuples
    rows = mycursor.fetchall()

    # Create a dictionary to hold your reviews data
    reviews_dict = {"Reviews": {}}

    # Loop through each row and add it to the appropriate restaurant key
    for row in rows:
        restaurant = row[1]
        review_dict = {
            "Id": row[0],
            "Name": row[2],
            "Rating": row[3],
            "Review": row[4]
        }
        if restaurant in reviews_dict["Reviews"]:
            reviews_dict["Reviews"][restaurant].append(review_dict)
        else:
            reviews_dict["Reviews"][restaurant] = [review_dict]

    # Convert your dictionary to a JSON string
    json_string = json.dumps(reviews_dict)

    # Send the JSON string as a response to your React application
    print(json_string)

    return HttpResponse(json_string)
