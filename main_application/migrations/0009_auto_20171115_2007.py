# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-15 20:07
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main_application', '0008_auto_20171115_1849'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurantorder',
            name='table_id',
            field=models.CharField(default='0', max_length=100),
        ),
        migrations.AlterField(
            model_name='restaurantorder',
            name='order_time',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 15, 20, 7, 47, 296159, tzinfo=utc)),
        ),
    ]
