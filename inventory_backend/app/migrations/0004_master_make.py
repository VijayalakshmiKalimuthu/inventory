# Generated by Django 4.1.1 on 2024-02-21 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_master_m_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='master',
            name='make',
            field=models.CharField(default='', max_length=100),
        ),
    ]
