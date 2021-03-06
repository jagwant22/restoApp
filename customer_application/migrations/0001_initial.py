# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-11-10 18:49
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=15)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('passkey', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='CustomerProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_address', models.TextField(blank=True, null=True)),
                ('customer_facebook', models.CharField(blank=True, max_length=50, null=True)),
                ('birth_date', models.CharField(blank=True, max_length=20, null=True)),
                ('age', models.CharField(blank=True, max_length=10, null=True)),
                ('gender', models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=10, null=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='customer_application.Customer')),
            ],
        ),
    ]
