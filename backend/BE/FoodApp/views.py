from django.shortcuts import render

# Create your views here.
from django.views import View
from django.http import JsonResponse
from django.core import serializers
from .models import User
import json

from django.contrib.auth import authenticate, login

from django.views.decorators.csrf import ensure_csrf_cookie, get_token
'''
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt'''

#first signup
'''class SignupView(View):
   
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)

        print('Received data:', data)
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

        '''

'''from django.views.decorators.csrf import csrf_exempt

@csrf_exempt'''

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password


class SignupView(View):
    @csrf_exempt
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)

        print('Received data:', data)
        # Check that all required fields are present
        if not all(key in data for key in ('email', 'password', 'first_name', 'last_name')):
            return JsonResponse({'error': 'Missing required field(s)'})

        # Check if the user already exists in the database
        existing_user = User.objects.filter(email=data['email']).first()
        if existing_user is not None:
            return JsonResponse({'error': 'User with this email already exists'})
        else:
            user = User(email=data['email'], password=data['password'], first_name=data['first_name'],last_name=data['last_name'])
            user.save()

            # Return a JSON response with the serialized user data
            response_data = serializers.serialize('json', [user])
            return JsonResponse(response_data, safe=False)





class LoginView(View):
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)

        print('Received data:', data)

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
        

class ResetPasswordView(View):
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)

        print('Received data:', data)
        # Check that all required fields are present
        if not all(key in data for key in ('email', 'new_password', 'confirm_password')):
            return JsonResponse({'error': 'Missing required field(s)'})

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
    with open('data/food_data.json') as f:
        food_data = json.load(f)
    
    return JsonResponse(food_data, safe=False)
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