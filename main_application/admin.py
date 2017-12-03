# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import *
# Register your models here.
class TablesAdmin(admin.ModelAdmin):
	list_display = ('restaurant','table_id', 'total_head_count')
	search_fields = ['restaurant__login_id']

admin.site.register(Restaurant)
admin.site.register(Subscription)
admin.site.register(RestaurantOrder)
admin.site.register(Tables, TablesAdmin)
admin.site.register(RestaurantLogin)
admin.site.register(RestaurantSetting)
admin.site.register(CustomerRequests)