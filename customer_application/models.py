# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
import json
from django.utils import timezone
import hashlib 

class Customer(models.Model):
	email = models.CharField(max_length = 100, null= False, blank= False)
	phone = models.CharField(max_length = 15, null= False, blank = False)
	first_name = models.CharField(max_length = 50, null = False, blank = False)
	last_name = models.CharField(max_length = 50, null=True, blank = True)
	passkey = models.CharField(max_length = 20, null = False, blank = False)

	def __str__(self):
		return "%s %s : %s" %(self.first_name , self.last_name, self.phone)