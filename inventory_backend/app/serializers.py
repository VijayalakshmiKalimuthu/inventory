from rest_framework import serializers
from .models import Appinfo, Master, Project_Master, Inventory_Tran, Request_CI, IssuesNote, LoginCre, EmpDet
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from .models import ItemReceive, ItemIssue, ItemReturn, TempReceiveItem, TempIssueItem

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
        
class MasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = '__all__'  

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
        extra_kwargs = {
            'project_code': {'required': False}
        }


class ItemReceiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemReceive
        fields = '__all__'

class ItemIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemIssue
        fields = '__all__'

class ItemReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemReturn
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginCre
        fields = ['role']  

class MasterSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = ['c_id', 'master_type', 'item_code', 'item_name', 'location_code', 'units', 'price', 'make', 'instruction_specification', 'min_req_stock', 'quantity_received', 'quantity_issued', 'quantity', 'remarks']



class MasterSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = ['c_id', 'master_type', 'item_code', 'item_name', 'location_code', 'units', 'price', 'make', 'instruction_specification', 'min_req_stock', 'remarks']


class TempReceiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempReceiveItem
        fields = '__all__'

class TempIssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = TempIssueItem
        fields = '__all__'
