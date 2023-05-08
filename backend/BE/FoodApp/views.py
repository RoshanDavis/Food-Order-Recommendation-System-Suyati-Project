from django.shortcuts import render

# Create your views here.
from django.views import View
from django.http import JsonResponse
from django.core import serializers
from .models import User
import json

from django.contrib.auth import authenticate, login

class SignupView(View):
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)

        # Check that all required fields are present
        if not all(key in data for key in ('email', 'password', 'first_name', 'last_name')):
            return JsonResponse({'error': 'Missing required field(s)'})

        # Check if the user already exists in the database
        existing_user = User.objects.filter(email=data['email']).first()
        if existing_user is not None:
            return JsonResponse({'error': 'User with this email already exists'})
        else:
            user = User(email=data['email'],
                        password=data['password'],
                        first_name=data['first_name'],
                        last_name=data['last_name'])
            user.save()

            # Return a JSON response with the serialized user data
            response_data = serializers.serialize('json', [user])
            return JsonResponse(response_data, safe=False)

        




class LoginView(View):
    def post(self, request):
        # Deserialize JSON data from request body
        #data = json.loads(request.body)

        data = {
    "email": "johndoe@example.com",
    "password": "mysecurepassword"
}

        # Check that all required fields are present
        if not all(key in data for key in ('email', 'password')):
            return JsonResponse({'error': 'Missing required field(s)'})

        # Authenticate user using provided credentials
        user = authenticate(request, email=data['email'], password=data['password'])

        if user is not None:
            # Login the user and return a success message
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            # Return an error message if the authentication failed
            return JsonResponse({'error': 'Invalid email or password'})

'''
class LoginView(View):
    def post(self, request):
        # Load test data from fixtures file
        with open('FoodApp/fixtures/test_login.json', 'r') as f:
            test_data = json.load(f)
        
        # Find user with given email in test data
        user = None
        for data in test_data:
            if data['model'] == 'FoodApp.User' and data['fields']['email'] == request.POST.get('email'):
                user = User(**data['fields'])
                break

        if user is None:
            return JsonResponse({'error': 'User not found'})

        # Authenticate user using provided credentials
        if user.check_password(request.POST.get('password')):
            # Login the user and return a success message
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            # Return an error message if the authentication failed
            return JsonResponse({'error': 'Invalid email or password'})'''