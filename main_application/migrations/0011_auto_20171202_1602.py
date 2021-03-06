# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-02 10:32
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main_application', '0010_auto_20171118_1916'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerRequests',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('requestType', models.CharField(choices=[('Other', 'Other'), ('Cutlery', 'Cutlery'), ('Manager', 'Manager'), ('Menu Item Query', 'Menu Item Query'), ('Unsatisfied', 'Unsatisfied')], default='Other', max_length=50)),
                ('requestTime', models.DateTimeField(default=datetime.datetime(2017, 12, 2, 10, 32, 40, 500000, tzinfo=utc))),
                ('requestDetails', models.TextField()),
                ('requestStatus', models.CharField(choices=[('Received', 'Received'), ('Acknowledged', 'Acknowledged'), ('Completed', 'Completed')], max_length=20)),
                ('table', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_application.Tables')),
            ],
        ),
        migrations.AlterField(
            model_name='restaurantorder',
            name='order_time',
            field=models.DateTimeField(default=datetime.datetime(2017, 12, 2, 10, 32, 40, 493000, tzinfo=utc)),
        ),
    ]
