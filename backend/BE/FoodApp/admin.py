from django.contrib import admin

from .models import User, FoodDataTest, Review,Restaurant,Order,Cart,Login

# Register your models here.
admin.site.register(User)
admin.site.register(Order)
admin.site.register(Review)
admin.site.register(Restaurant)
admin.site.register(Login)