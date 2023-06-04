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

from FoodApp.views import SignupView, LoginView, ResetPasswordView, UserList,SaveFoodDataView, UserDetail,OrderRecommendation,get_rest_data,save_users,food_list,save_reviews,save_restaurants,get_reviews,SaveReviewView,complaint_status,OrderCreateAPIView

from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('admin/', admin.site.urls),

    path('signup/',csrf_exempt( SignupView.as_view()), name='signup'),
    path('login/', csrf_exempt( LoginView.as_view()), name='login'),
    path('reset_password/', ResetPasswordView.as_view(), name='reset_password'),
   

    path('api/users/', UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    #dash Test Data
     path('api/food/', food_list, name='food_list'),
 
     #posting a single review from user
     path('save-review/', csrf_exempt( SaveReviewView.as_view()), name='save_review'),
     path('get_reviews', csrf_exempt(get_reviews), name='get_reviews'),
    

    path('status/', csrf_exempt(complaint_status), name='complaint_status'),
    #Actual restdata
    path('api/restdata/', get_rest_data, name='get_rest_data'),

    path('order-recommendation/', OrderRecommendation.as_view(), name='order_recommendation'),




    ######Saving Data############
    #saving the reviews
    path('api/save_restaurants/', csrf_exempt(save_restaurants), name='save_restaurants'),
     path('save_reviews', csrf_exempt(save_reviews), name='save_reviews'),
    path('save_orders', csrf_exempt(OrderCreateAPIView.as_view()), name='order-create'),
    path('api/save_users/', csrf_exempt(save_users), name='save_users'),

    #test data

    path('api/save_food_data/', csrf_exempt(SaveFoodDataView.as_view()), name='save_food_data'),


]