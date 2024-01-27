from django.db import models
from django.contrib.auth.models import User 

# Create your models here.


class Appinfo(models.Model):
    infocode = models.AutoField(primary_key=True)
    infovalue = models.CharField(max_length=100)
    remarks = models.CharField(max_length=100)
    created_on = models.CharField (max_length=100)
    created_by = models.CharField (max_length=100)
    modified_on = models.CharField (max_length=100)
    modified_by = models.CharField (max_length=100)
    dev_remarks = models.CharField (max_length=100)

    def __str__(self):
        return self.infocode

class Chemical_Master(models.Model):
    c_id = models.AutoField(primary_key=True)
    entry_no = models.CharField (max_length=100)
    item_code = models.CharField (max_length=100)
    item_name = models.CharField (max_length=100)
    unit = models.CharField (max_length=100)
    project_code = models.CharField (max_length=100)
    remarks = models.CharField (max_length=100)
    created_on = models.CharField (max_length=100)
    created_by = models.CharField (max_length=100)
    modified_on = models.CharField (max_length=100)
    modified_by = models.CharField (max_length=100)
    dev_remarks = models.CharField (max_length=100)

    def __str__(self):
        return self.c_id

class Project_Master(models.Model):
    project_code = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=100)

    def __str__(self):
        return self.project_code

class Inventory_Tran(models.Model):
    entry_no = models.AutoField(primary_key=True)
    item_code = models.CharField (max_length=100)
    tran_type_IR = models.CharField (max_length=100)
    qnty = models.CharField (max_length=100)
    ref_number = models.CharField (max_length=100)
    ref_type = models.CharField (max_length=100)
    batch_number = models.CharField (max_length=100)
    remarks = models.CharField (max_length=100)
    created_on = models.CharField (max_length=100)
    created_by = models.CharField (max_length=100)
    modified_on = models.CharField (max_length=100)
    modified_by = models.CharField (max_length=100)
    dev_remarks = models.CharField (max_length=100)

    def __str__(self):
        return self.entry_no
