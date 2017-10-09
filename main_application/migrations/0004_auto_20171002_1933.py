# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-02 19:33
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main_application', '0003_auto_20171002_1905'),
    ]

    operations = [
        migrations.CreateModel(
            name='RestaurantLogin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=10)),
            ],
            options={
                'verbose_name': 'Restaurant Login',
                'verbose_name_plural': 'Restaurant Logins',
            },
        ),
        migrations.CreateModel(
            name='Tables',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_id', models.CharField(max_length=10)),
                ('total_head_count', models.IntegerField()),
                ('start_time', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            options={
                'verbose_name': 'Table',
                'verbose_name_plural': 'Tables',
            },
        ),
        migrations.AlterModelOptions(
            name='restaurantorder',
            options={'verbose_name': 'Restaurant Order', 'verbose_name_plural': 'Restaurant Orders'},
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='cuisine',
            field=models.CharField(default=b'[]', max_length=400),
        ),
        migrations.AlterField(
            model_name='restaurantorder',
            name='order_time',
            field=models.DateTimeField(default=datetime.datetime(2017, 10, 2, 19, 33, 35, 123329, tzinfo=utc)),
        ),
        migrations.AddField(
            model_name='tables',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_application.Restaurant'),
        ),
        migrations.AddField(
            model_name='restaurantlogin',
            name='restaurant',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main_application.Restaurant'),
        ),
    ]
