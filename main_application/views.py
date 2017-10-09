# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from .models import *
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View
import json

def author_info(request):
	aboutData = dict()
	aboutData['name'] = 'Jagwant Sehgal'
	aboutData['dob'] = '22-11-1992'
	aboutData['email'] = 'sehgal.jagwant@gmail.com'
	aboutData['description'] = 'Fellow Peasant, Fellow Butcher'
	return JsonResponse(aboutData, status = 200)


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
		resto_obj = Restaurant.objects.get(login_id = login_id)
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

	
	
		
def returnDashboard(request):
	try:
		print "inside this"
		username = request.session['username']
		print "Got Username ", username
		return render(request, 'dashboard.html', context = {})	
	except:
		return HttpResponseRedirect('/')


	
