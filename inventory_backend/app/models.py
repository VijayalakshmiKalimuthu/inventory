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
    batch_number = models.CharField(max_length=100)
    issue_date = models.CharField(max_length=100)
    issue_to = models.CharField(max_length=100)
    quantity_issued = models.CharField(max_length=100)
    quantity_recieved = models.CharField(max_length=100)
    stock = models.CharField(max_length=100)
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
    item_name = models.CharField(max_length=100)
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
    quantity_issued = models.CharField(max_length=100)
    quantity_recieved = models.CharField(max_length=100)
    stock = models.CharField(max_length=100)
    dev_remarks = models.CharField (max_length=100)

    def __str__(self):
        return self.entry_no

class Request_CI(models.Model):
    id = models.AutoField(primary_key=True)
    ItemCode = models.CharField(max_length=100)
    ItemType = models.CharField(max_length=100)
    ItemName = models.CharField(max_length=100)
    RequestDate = models.DateField()
    RequestStatus = models.CharField(max_length=100)
    RequestedBy = models.CharField(max_length=100)
    RequestDetails = models.CharField(max_length=100)
    ApprovedBy = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.id
    
class IssuesNote(models.Model):
    id = models.AutoField(primary_key=True)
    researcher_name = models.CharField(max_length=100)
    issues_task = models.CharField(max_length=200)
    date_time = models.DateField()
    issue_raised_by = models.CharField(max_length=200)
    issue_status = models.CharField(max_length=100)


class LoginCre(models.Model):
    id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)