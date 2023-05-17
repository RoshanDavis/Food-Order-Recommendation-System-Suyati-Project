from django.db import models
import string, random

# Create your models here.

class User(models.Model):
    user_id = models.CharField(max_length=7, primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    
    class Meta:
        db_table= 'users'
    
    def save(self, *args, **kwargs):
        if not self.user_id:
            self.user_id = self.generate_user_id()
        super(User, self).save(*args, **kwargs)

    def generate_user_id(self):
        # Generate a 7-digit alphanumeric ID
        alphabet = string.ascii_uppercase + string.digits
        while True:
            user_id = ''.join(random.choice(alphabet) for i in range(7))
            if not User.objects.filter(user_id=user_id).exists():
                return user_id

class FoodDataTest(models.Model):
    id = models.IntegerField(primary_key=True)
    restaurant = models.CharField(max_length=200)
    price = models.CharField(max_length=10)
    food = models.CharField(max_length=200)
    rating = models.FloatField(null=True, blank=True)
    linkImg = models.URLField(max_length=500)
    restaurantImg = models.URLField(max_length=500)

    class Meta:
        db_table='FoodTest'


class Restaurant(models.Model):
    vendor_id = models.IntegerField(primary_key=True)
    authentication_id = models.IntegerField()
    vendor_category_en = models.CharField(max_length=255)
    vendor_category_id = models.IntegerField()
    delivery_charge = models.FloatField()
    serving_distance = models.IntegerField()
    OpeningTime = models.CharField(max_length=255)
    prepration_time = models.IntegerField()
    discount_percentage = models.FloatField()
    vendor_rating = models.FloatField()
    vendor_tag = models.CharField(max_length=255)
    vendor_tag_name = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    vendor_name = models.CharField(max_length=255)

    class Meta:
        db_table='data'

class Review(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default='')
    vendor_id = models.ForeignKey(Restaurant, on_delete=models.CASCADE,default='')
    vendor_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    rating = models.IntegerField()
    review = models.TextField()
    class Meta:
        db_table='ReviewTest'





class Complaint(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE,default='')
    vendor_id= models.ForeignKey(Restaurant, on_delete=models.CASCADE,default='')
    vendor_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    complaint = models.BooleanField(default=True)
    review = models.TextField()
    class Meta:
        db_table='ComplaintTest'