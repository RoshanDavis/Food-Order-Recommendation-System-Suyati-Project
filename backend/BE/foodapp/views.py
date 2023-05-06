
# Create your views here.
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import json

User = get_user_model()

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        # Check that passwords match
        if password != confirm_password:
            return JsonResponse({'error': 'Passwords must match'})

        # Check if user already exists with this email
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'User with this email already exists'})

        # Create new user
        user = User.objects.create_user(email=email, password=password)
        user.first_name = first_name
        user.last_name = last_name
        user.save()

        return JsonResponse({'success': 'User account created'})

