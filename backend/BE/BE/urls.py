"""
URL configuration for BE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from FoodApp.views import SignupView, LoginView, ResetPasswordView,user_list , UserList, UserDetail,food_list,save_reviews,save_restaurant_data,get_reviews

from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('admin/', admin.site.urls),

    path('signup/',csrf_exempt( SignupView.as_view()), name='signup'),
    path('login/', csrf_exempt( LoginView.as_view()), name='login'),
    path('reset_password/', ResetPasswordView.as_view(), name='reset_password'),
    #path('api/users/', user_list, name='user_list'),

    path('api/users/', UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    #dash data
     path('api/food/', food_list, name='food_list'),
 #saveing the reviews
     path('save_reviews', csrf_exempt(save_reviews), name='save_reviews'),
     path('get_reviews', csrf_exempt(get_reviews), name='get_reviews'),
      path('save_data', csrf_exempt(save_restaurant_data), name='save_restaurant_data'),

    #csrf token
    # path('csrf/', csrf, name='csrf'),

]
