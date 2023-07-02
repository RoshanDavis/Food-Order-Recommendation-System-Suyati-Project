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

from FoodApp.views import SignupView, LoginView,SignoutView,Menu,ComplaintsView,post_complaint,RestaurantReviewsView,OrderCreateView,OrderHistoryView,CartDeleteView, ResetPasswordView,ReviewCreateView, UserList,SaveFoodDataView, UserDetail,OrderRecommendation,RestRecommendation,cart_api,truncate_cart,get_rest_data,save_users,save_reviews,save_restaurants,SaveReviewView,OrderCreateAPIView
#from FoodApp.views import SignupView, LoginView,SignoutView,Menu,ComplaintsView,post_complaint,RestaurantReviewsView,OrderCreateView,OrderHistoryView,CartDeleteView, ResetPasswordView,ReviewCreateView, UserList,SaveFoodDataView, UserDetail,OrderRecommendation,RestRecommendation,cart_api,truncate_cart,get_rest_data,save_users,food_list,save_reviews,save_restaurants,get_reviews,SaveReviewView,complaint_status,OrderCreateAPIView

from django.views.decorators.csrf import csrf_exempt


#### API Documentation ####
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from django.urls import re_path
from drf_yasg import views as yasg_views


schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",  # Replace with your API title
        default_version='v1',  # Replace with your API version
        description="API - Food Order Recommendation ",  # Replace with your API description
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


######################################################
urlpatterns = [
    path('admin/', admin.site.urls),

    path('signup/',csrf_exempt( SignupView.as_view()), name='signup'),
    path('login/', csrf_exempt( LoginView.as_view()), name='login'),
    path('reset_password/', ResetPasswordView.as_view(), name='reset_password'),
    path('signout/', SignoutView.as_view(), name='logout'),
   

    path('api/users/', UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>/', UserDetail.as_view(), name='user-detail'),

    #dash Test Data
     #path('api/food/', food_list, name='food_list'),
 
     #posting a single review from user
      path('review/create/', csrf_exempt(ReviewCreateView.as_view()), name='review-create'),
     path('save-review/', csrf_exempt( SaveReviewView.as_view()), name='save_review'),        ######extra
      path('restaurant-reviews/',  csrf_exempt(RestaurantReviewsView.as_view()), name='restaurant_reviews'),
     #path('get_reviews', csrf_exempt(get_reviews), name='get_reviews'),
    

     
    #Actual restdata
    path('api/restdata/', get_rest_data, name='get_rest_data'),

    ###Make Order

       path('order/', csrf_exempt( OrderCreateView.as_view()), name='ordercreate'), 
        path('order-history/', csrf_exempt(OrderHistoryView.as_view()), name='order_history'),
    #Menu
    path('menu/',csrf_exempt(Menu.as_view()), name='Menu'),

    path('cart/', csrf_exempt(cart_api), name='cart_api'),
    path('cart/delete/', csrf_exempt(CartDeleteView.as_view()), name='cart_delete'),
      path('cart/truncate/', truncate_cart, name='truncate_cart'),

    path('order-recommendation/', OrderRecommendation.as_view(), name='order_recommendation'),
    path('rest-recommendation/', RestRecommendation.as_view(), name='rest_recommendation'),
    
############## Complaint###############

    path('post_complaint/', post_complaint, name='post_complaint'),
    path('complaints/', csrf_exempt(ComplaintsView.as_view()), name='user-complaints'),
    
    #path('status/', csrf_exempt(complaint_status), name='complaint_status'), ####extra


    ######Saving Data############
    #saving the reviews
    path('api/save_restaurants/', csrf_exempt(save_restaurants), name='save_restaurants'),
     path('save_reviews', csrf_exempt(save_reviews), name='save_reviews'),
    path('save_orders', csrf_exempt(OrderCreateAPIView.as_view()), name='order-create'),
    path('api/save_users/', csrf_exempt(save_users), name='save_users'),

    #test data

    path('api/save_food_data/', csrf_exempt(SaveFoodDataView.as_view()), name='save_food_data'),


     # API documentation URLs
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),


]