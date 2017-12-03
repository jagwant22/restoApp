# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
import json
from django.utils import timezone
import hashlib 
from customer_application.models import Customer


# Models for the Business End of the Application. The mobile end models will be defined in a separate application. 
sub_choices = (("Gold", "Gold"),("Silver", "Silver"),("Platinum","Platinum"))
class Restaurant(models.Model):
	login_id = models.CharField(max_length=20, null=False, blank=False)
	name = models.CharField(max_length = 200, null=False, blank=False)
	address_details = models.TextField(null=False, blank=False, default = json.dumps([{"location_name":"", "location_address":""}]))
	join_date = models.DateTimeField(null=True, blank=True)
	subscription_type = models.CharField(choices = sub_choices, default = "Silver", max_length = 100)
	cuisine = models.CharField(max_length= 400, null=False, blank=False, default=json.dumps([]))
	started_on = models.CharField(max_length=100, null=True, blank=True)
	primary_contact = models.CharField(max_length = 20, null=False, blank= False, default = "")

	
	def serializeModel(self):
		dataDict = dict()
		dataDict['login_id'] = self.login_id
		dataDict['name'] = self.name
		dataDict['address_details'] = self.address_details
		dataDict['join_date'] = self.join_date
		dataDict['subscription_type'] = self.subscription_type
		dataDict['cuisine'] = self.cuisine
		dataDict['started_on'] = self.started_on
		dataDict['primary_contact'] = self.primary_contact


		return dataDict

	def __str__(self):
		return self.name

class RestaurantLogin(models.Model):
	restaurant = models.ForeignKey(Restaurant)
	password = models.CharField(max_length = 10)

	class Meta : 
		verbose_name = 'Restaurant Login'
		verbose_name_plural = 'Restaurant Logins'


	def __str__(self):
		return str(self.restaurant)



class Subscription(models.Model):
	subscription_type = models.CharField(choices = sub_choices, default = "Silver", max_length = 100)
	feature_list = models.TextField(default = {})

	def __str__(self):
		return str(self.subscription_type)


class Tables(models.Model):
	restaurant = models.ForeignKey(Restaurant)
	table_id = models.CharField(max_length=10, null=False, blank=False, default=None)
	current_customers = models.ManyToManyField(Customer)
	total_head_count = models.IntegerField(null=False, blank=False)
	start_time = models.DateTimeField(default = timezone.now)

	def serializeModel(self):
		dataDict = dict()
		dataDict['restaurant'] = self.restaurant.login_id
		dataDict['table_id'] = self.table_id
		dataDict['head_count'] = self.total_head_count
		dataDict['start_time'] = (str(self.start_time).split("+"))[0]

		return dataDict


	class Meta:
		verbose_name = "Table"
		verbose_name_plural = "Tables"


class RestaurantOrder(models.Model):
	restaurant = models.ForeignKey(Restaurant)
	for_customer = models.ManyToManyField(Customer)
	number_of_items = models.CharField(max_length=20, null=False, blank=False)
	order_details = models.TextField(blank=False, null=False, default=json.dumps({"item_name":"","item_id":"","item_quantity":"","special_instruction":"","submenu":"","item_type":"","item_cuisine":""}))
	order_time = models.DateTimeField(default = timezone.now())
	order_status_choices = (('Pending', 'Pending'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled'), ('Kitchen', 'Kitchen'), ('Received', 'Received'))
	order_status = models.CharField(max_length = 20, choices = order_status_choices, blank=False, null=False, default= 'Received')
	table_id =models.CharField(max_length=100, null=False, blank=False, default="0")

	class Meta : 
		verbose_name = 'Restaurant Order'
		verbose_name_plural = 'Restaurant Orders'


	def __str__(self):
		return str(self.restaurant) + " | " + str(self.pk)

	def serializeModel(self):
		# Get JSON For Model Object
		returnDict = dict()
		
		returnDict['order_id'] = self.pk
		returnDict['restaurant'] = self.restaurant.login_id
		tempArray  =[]
		customer_list = self.for_customer.all()
		print customer_list
		for customer in customer_list:
			tempDict = dict()
			tempDict['phone'] = customer.phone
			tempDict['name'] = customer.first_name + " " + customer.last_name
			tempArray.append(tempDict)

		returnDict['customer_information'] = tempArray
		returnDict['item_count'] = self.number_of_items
		returnDict['order_details'] = json.loads(self.order_details)
		returnDict['order_time'] = self.order_time
		returnDict['table_number'] = self.table_id
		returnDict['order_status'] = self.order_status

		return returnDict



class RestaurantSetting(models.Model):
	
	restaurant = models.ForeignKey(Restaurant)
	table_count = models.CharField(max_length=20, null=False, blank=False, default=0)
	timings = models.TextField(null=False, blank=False, default=json.dumps([{"day_range":[], "timings":[{"from_time":"to_time"}]}]))

	def serializeModel(self):
		returnDict = dict()
		returnDict['table_count'] = self.table_count
		returnDict['timings'] = json.loads(self.timings)


class CustomerRequests(models.Model):
	table = models.ForeignKey(Tables)
	restaurant = models.ForeignKey(Restaurant)
	requestTypes = (("Other", "Other"),("Cutlery","Cutlery"),("Manager", "Manager"),("Menu Item Query", "Menu Item Query"), ("Unsatisfied","Unsatisfied"))
	requestType = models.CharField(choices = requestTypes , max_length = 50, null=False, blank=False, default = "Other")
	requestTime = models.DateTimeField(default = timezone.now())
	requestDetails = models.TextField(null=False, blank=False)
	requestStatusChoices= (("Received", "Received"), ('Acknowledged', 'Acknowledged'), ('Completed', 'Completed'))
	requestStatus = models.CharField(choices = requestStatusChoices, max_length=20)

	def serializeModel(self):
		returnDict = dict()
		returnDict['request_id'] = self.pk
		returnDict['table'] = self.table.serializeModel()
		returnDict['request_type'] = self.requestType
		returnDict['request_time'] = str(self.requestTime)
		returnDict['request_details'] = self.requestDetails
		returnDict['requestStatus'] = self.requestStatus

		return returnDict

	class Meta :
		verbose_name = 'Customer Request'
		verbose_name_plural = 'Customer Requests'
		