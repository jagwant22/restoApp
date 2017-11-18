# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-15 18:49
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main_application', '0007_auto_20171111_1047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurantorder',
            name='order_time',
            field=models.DateTimeField(default=datetime.datetime(2017, 11, 15, 18, 49, 38, 905018, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='tables',
            name='table_id',
            field=models.CharField(default=None, max_length=10),
        ),
    ]
