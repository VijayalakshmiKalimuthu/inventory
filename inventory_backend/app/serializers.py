from rest_framework import serializers
from .models import Appinfo, Chemical_Master, Project_Master, Inventory_Tran, Request_CI, IssuesNote, LoginCre, EmpDet
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token

class AppinfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appinfo
        fields = ('infocode',
                  'infovalue',
                  'remarks',
                  'created_on',
                  'created_by',
                  'modified_on',
                  'modified_by',
                  'dev_remarks')
        
class ChemicalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chemical_Master
        fields = ('c_id',
                  'entry_no',          
                  'item_code',    
                  'item_name',         
                  'unit',            
                  'project_code',      
                  'remarks',         
                  'created_on',
                  'created_by',
                  'modified_on',
                  'modified_by',
                  'batch_number',
                  'issue_date',
                  'issue_to',
                  'quantity_issued',
                  'quantity_recieved',
                  'stock',
                  'dev_remarks')      

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_Master
        fields = '__all__'
        
class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory_Tran
        fields = '__all__'

class RequestCISerializer(serializers.ModelSerializer):
    class Meta:
        model = Request_CI
        fields = '__all__'
    ApprovedBy = serializers.CharField(default=None, allow_null=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']

        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user    
    
class IssuesSerializers(serializers.ModelSerializer):
    class Meta:
        model = IssuesNote
        fields = '__all__'

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginCre
        fields = '__all__'

class EmpSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpDet
        fields = ['emp_id', 'emp_name', 'designation', 'project_code']

    
        