# Generated by Django 4.1.1 on 2024-02-22 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_master_location_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='itemissue',
            name='bill_no',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='itemreceive',
            name='bill_no',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='itemreturn',
            name='bill_no',
            field=models.CharField(default='', max_length=100),
        ),
    ]