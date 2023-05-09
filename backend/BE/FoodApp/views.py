from django.shortcuts import render

# Create your views here.
from django.views import View
from django.http import JsonResponse
from django.core import serializers
from .models import User
import json

from django.contrib.auth import authenticate, login

'''
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt'''
class SignupView(View):
   
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


from django.http import JsonResponse

def food_list(request):
    food_data = [
        {
            "id": 1,
            "restaurant": "Burger Corner",
            "price": "100",
            "food": "French Fries ",
            "rating": 4.5,
            "linkImg": "https://www.thestatesman.com/wp-content/uploads/2019/05/french-fries.jpg"
        },
        {
            "id": 2,
            "restaurant": "Sweet Tooth",
            "price": "900",
            "food": "Red Velvet Cake",
            "rating": 4.9,
            "linkImg": "https://glutenfreecuppatea.co.uk/wp-content/uploads/2019/11/gluten-free-red-velvet-cake-recipe-featured.jpg"
        },
       {
            "id": 3,
            "restaurant": "Burger Corner",
            "price": "150",
            "food": "Cheese Burger",
            "rating": 4.5,
            "linkImg": "https://i0.wp.com/i.redd.it/lzh3ysy58np21.jpg?ssl=1"
        },
        {
            "id": 4,
            "restaurant": "Italy's Best",
            "price": "700",
            "food": "3 topping Pizza",
            "rating": 3.7 ,
            "linkImg": "https://images2.fanpop.com/images/photos/7300000/Slice-of-Pizza-pizza-7383219-1600-1200.jpg"
        },
        {
            "id": 5,
            "restaurant": "Hotel Aroma",
            "price": "130",
            "food": "Vegetable Fried Rice",
            "rating": 3.4,
            "linkImg": "https://www.shanmugas.com/Content/upload/veg%20fried%20rice%20.jpg"
        },
        {
            "id": 6,
            "restaurant": "Sweet Tooth",
            "price": "1500",
            "food": "Chocolate Caramel Cake",
            "rating": 4.9,
            "linkImg": "https://cdn.shopify.com/s/files/1/0034/7550/5225/products/01292020_Pretzel-MenuChange0338-RT_c4bb5745-6348-4069-9688-473fd20a3d0e_800x.jpg?v=1581623513"
        },
        {
            "id": 7,
            "restaurant": "Italy's Best",
            "price": "200",
            "food": "Spagetti",
            "rating": 3.7,
            "linkImg":
              "https://www.hintofhealthy.com/wp-content/uploads/2020/07/Healthy-Spaghetti-Sauce-1.jpg"
          },
          {
            "id": 8,
            "restaurant": "Spice King",
            "price": "120",
            "food": "Chicken Biriyani",
            "rating": 4.3, 
            "linkImg":
              "https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.jpg?b=1&s=170667a&w=0&k=20&c=cL2fbP4UF9nbp6BmCP3B0wm_XSXUiJ1aGtiotSyiFg4="
          }
    ]
    return JsonResponse(food_data, safe=False)
