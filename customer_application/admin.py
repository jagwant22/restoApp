# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import *

class CustomerAdmin(admin.ModelAdmin):
	list_display = ['email', 'first_name','last_name','phone']
	search_fields = ['email']


admin.site.register(Customer, CustomerAdmin)