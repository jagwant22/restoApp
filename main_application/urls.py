from django.conf.urls import url
from django.contrib import admin
from .views import author_info, RestaurantView, RestaurantLoginView, TableView,returnDashboard


urlpatterns = [
    url(r'^dash', returnDashboard),
    url(r'^index', author_info),
    
    # GET AND POST RESTAURANT DETAILS
    url(r'^restaurant', RestaurantView.as_view()),
    # GET AND POST RESTAURANT PASSWORD AND CREDS
    url(r'^login', RestaurantLoginView.as_view()),
    url(r'^table', TableView.as_view()),
    
]