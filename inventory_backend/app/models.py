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

class Master(models.Model):
    c_id = models.AutoField(primary_key=True)
    entry_no = models.CharField(max_length=100)
    item_code = models.CharField(max_length=100, unique=True)
    item_name = models.CharField(max_length=100)
    m_date = models.DateField()
    supplier = models.CharField(max_length=100)
    master_type = models.CharField(max_length=100)
    quantity = models.IntegerField()
    units = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    project_code = models.IntegerField()
    issue_date = models.CharField(max_length=100, null=True)  
    issue_to = models.CharField(max_length=100, null=True)    
    quantity_issued = models.IntegerField(null=True)          
    quantity_received = models.IntegerField(null=True)        
    stock = models.IntegerField(null=True)                    
    remarks = models.CharField(max_length=100)
    created_on = models.CharField(max_length=100, null=True)   
    created_by = models.CharField(max_length=100, null=True)   
    modified_on = models.CharField(max_length=100, null=True)  
    modified_by = models.CharField(max_length=100, null=True)  
    batch_number = models.CharField(max_length=100, null=True) 
    dev_remarks = models.CharField(max_length=100, null=True)  

    def __str__(self):
        return str(self.c_id) 

class Inventory_Tran(models.Model):
    entry_no = models.AutoField(primary_key=True)
    item_code = models.ForeignKey(Master, on_delete=models.CASCADE, related_name='master')
    item_name = models.CharField(max_length=100)
    tran_type_IR = models.CharField(max_length=100)
    i_date = models.DateField()
    supplier = models.CharField(max_length=100)
    units = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_issued = models.IntegerField()
    quantity_received = models.IntegerField()
    stock = models.IntegerField()
    quantity = models.IntegerField()
    ref_number = models.CharField(max_length=100)
    ref_type = models.CharField(max_length=100)
    batch_number = models.CharField(max_length=100)
    remarks = models.CharField(max_length=100)
    created_on = models.CharField(max_length=100)
    created_by = models.CharField(max_length=100)
    modified_on = models.CharField(max_length=100)
    modified_by = models.CharField(max_length=100)
    dev_remarks = models.CharField(max_length=100)

    def __str__(self):
        return self.entry_no


class Project_Master(models.Model):
    project_code = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=100)

    def __str__(self):
        return self.project_code
    

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

class EmpDet(models.Model):
    emp_id = models.AutoField(primary_key=True)
    emp_name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    project_code = models.ForeignKey(Project_Master, on_delete=models.CASCADE, related_name='employees')



class ItemReceive(models.Model):
    entry_no = models.AutoField(primary_key=True)
    c_id = models.ForeignKey(Master, on_delete=models.CASCADE, related_name='receive')
    receipt_date = models.DateTimeField()
    quantity_received = models.IntegerField()
    po_number = models.CharField(max_length=100)
    batch_number = models.CharField(max_length=100)
    remarks = models.CharField(max_length=200)

class ItemIssue(models.Model):
    entry_no = models.AutoField(primary_key=True)
    c_id = models.ForeignKey(Master, on_delete=models.CASCADE, related_name='issue')
    issue_date = models.DateTimeField()
    quantity_issued = models.IntegerField()
    issued_to = models.CharField(max_length=100)
    project_code = models.ForeignKey(Project_Master, on_delete=models.CASCADE, related_name='issue')
    researcher_name = models.CharField(max_length=100)
    batch_number = models.CharField(max_length=100)
    remarks = models.CharField(max_length=200)
