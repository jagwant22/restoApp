# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .models import *
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from django.views import View
import json
from django.core.exceptions import ValidationError

# @method_decorator(csrf_exempt, name='dispatch')


def author_info(request):
	aboutData = dict()
	aboutData['name'] = 'Jagwant Sehgal'
	aboutData['dob'] = '22-11-1992'
	aboutData['email'] = 'sehgal.jagwant@gmail.com'
	aboutData['description'] = 'Fellow Peasant, Fellow Butcher'
	return JsonResponse(aboutData, status = 200)

def returnDashboard(request):
	try:
		print "inside this"
		username = request.session['username']
		print "Got Username ", username
		return render(request, 'dashboard.html', context = {})	
	except:
		return HttpResponseRedirect('/')

class RestaurantView(View):
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super(RestaurantView, self).dispatch(request, *args, **kwargs)

	def get(self, request):
		print "inside get RestaurantView"
		try:
			loginId = request.session['login_id']
		except:
			login_id = request.GET['login_id']

		resto_obj = Restaurant.objects.get(login_id = login_id)
		json_object = resto_obj.serializeModel()

		return JsonResponse(json_object)
		

	def post(self, request):
		result = dict()
		try:
			print "inside post RestaurantView"
			post_data = json.loads(request.body)
			user_id = post_data['username']
			name = post_data['name']
			subscription_type = post_data['subscription_type']
			started_on = post_data['started_on']
			address = post_data['address']
			cuisine = post_data['cuisine']
			contact = post_data['phone']

			resto_obj = Restaurant(
					login_id = user_id,
					name = name,
					address_details = address,
					subscription_type = subscription_type,
					cuisine = json.dumps(cuisine),
					started_on = started_on,
					primary_contact = contact
				)

			resto_obj.save()

			result['status'] = 200
			result['result'] = 'SUCCESS'
			return JsonResponse(result, status = 200)
		except Exception as E:
			result['status'] = 500
			result['result'] = 'FAILURE'
			result['reason'] = str(E)

			return JsonResponse(result, status = 500)



class RestaurantLoginView(View):

	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super(RestaurantLoginView, self).dispatch(request, *args, **kwargs)

	def get(self, request):
		result = dict()
		login_id = request.GET['user_id']
		resto_obj = Restaurant.objects.get(login_id = login_id)
		login_obj = RestaurantLogin.objects.get(restaurant = resto_obj)
		data_dict = dict()
		data_dict['username'] = login_id
		data_dict['password'] = login_obj.password
		result['result'] = 'SUCCESS'
		result['status'] = 200
		result['data'] = data_dict
		return JsonResponse(result, status = 200)
	

	def post(self, request):
		result = dict()
		try:
			post_data = json.loads(request.body)
			login_id = post_data['username']
			password = post_data['password']
			otp_auth = post_data['otp_status']
			if otp_auth == "true":
				new_resto_pass = RestaurantLogin.objects.get(restaurant = Restaurant.objects.get(login_id = login_id), password = password)
				data = dict()
				data['resto_name'] = new_resto_pass.restaurant.name
				data['id'] = new_resto_pass.pk
				print "RESTO NAME : ", data['resto_name']
				result['status'] = 200
				result['result'] = 'SUCCESS'
				result['data'] = data
				return JsonResponse(result)
			else:
				raise Exception("Invalid Authentication")
		except Exception as E:
			result['status'] = 500
			result['result'] = 'FAILURE'
			result['reason'] = str(E)
			return JsonResponse(result)


		return HttpResponse("<h1> Post</h1>")


class TableView(View):
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super(TableView, self).dispatch(request, *args, **kwargs)

	def get(self, request):
		result = dict()
		login_id = request.GET['login_id']
		resto_obj = Restaurant.objects.get(pk = login_id)
		table_objs = Tables.objects.filter(restaurant = resto_obj)
		data_listing = []
		for each in table_objs:
			data_dict = dict()
			data_dict = each.serializeModel()
			data_listing.append(data_dict)

		result['data'] = data_listing
		result['result'] = 'SUCCESS'
		result['status'] = 200

		return JsonResponse(result, status = 200)

	def post(self, request):
		result = dict()
		pass

class RestaurantOrderView(View):
	@method_decorator(csrf_exempt)
	def dispatch(self, request, *args, **kwargs):
		return super(RestaurantOrderView, self).dispatch(request, *args, **kwargs)

	def get(self, request):
		result = dict()
		try:
			restaurant_id = request.GET['id']
			print "Trying to get Restaurant with primary key : ", restaurant_id
			restaurant_object = Restaurant.objects.get(pk = restaurant_id)
			order_objects = RestaurantOrder.objects.filter(restaurant = restaurant_object).exclude(order_status = 'Completed').order_by("-pk")
			order_details = []
			for order in order_objects:
				order_details.append(order.serializeModel())

			result['result'] = "SUCCESS"
			result['status'] = 200
			result['order_info'] = order_details
		except Exception as E:
			result['result'] = 'FAILURE'
			result['status'] = 500
			result['reason'] = str(E)

		return JsonResponse(result, status=200)

	def post(self, request):
		pass 

@method_decorator(csrf_exempt, name='dispatch')
class RestaurantSettingsView(View):
	
	def get(self, request):
		# Get Restaurant Settings
		pass
	def post(self, request):
		# Add Restaurant Settings
		pass

	def patch(self, request):
		# Update restaurant settings
		pass
		

@method_decorator(csrf_exempt, name='dispatch')
class CustomerRequestsView(View):

	def get(self, request):
		# Get all requests for the current date
		print "Inside Get Customer request"
		result = dict()
		queryFrom = ""
		try:
			try:
				resto_id = request.GET['restaurant_id']
				queryFrom = "restaurant"

			except:
				try:
					table_id = request.GET['table_id']
					queryFrom = "customer"
				except:
					raise ValidationError("Invalid Key Received")

			current_date = datetime.now().date()
			if queryFrom in "restaurant":
				print "Restaurant Type Query"
				restaurantObject = Restaurant.objects.get(pk = resto_id)
				requestsObject = CustomerRequests.objects.filter(restaurant = restaurantObject)
				
			elif queryFrom in 'customer':
				print "query from customer"
				try:
					tableObject = Tables.objects.get(pk = table_id)
					requestsObject = CustomerRequests.objects.filter(table = tableObject)
				except Exception as E:
					print E
			returnList = []
			for req in requestsObject :
				if req.requestTime.date() == current_date:
					returnList.append(req.serializeModel())
						
			result['status'] = 200
			result['result'] = 'SUCCESS'
			result['data'] = returnList

		except Exception as error:
			result['result'] = 2001
			result['status'] = 'FAILURE'
			result['error'] = str(error)
			result['message'] = 'We do track IP addresses you know. We Will Find You. '

		return JsonResponse(result)
	def post(self, request):
		# Create a new request from ->customer to restaurant
		pass

	def patch(self, request):
		# Update request / request status
		pass

	def delete(self, request):
		# Cancel request - > Customer end only. 
		# 
		pass