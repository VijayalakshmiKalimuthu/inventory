from rest_framework import serializers
from .models import Appinfo, Chemical_Master, Project_Master, Inventory_Tran
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
                  'dev_remarks')

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project_Master
        fields = ('project_code',
                  'project_name')
        
class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory_Tran
        fields = ('entry_no',
                 'item_code',
                 'tran_type_IR',
                 'qnty',
                 'ref_number',
                 'ref_type',
                 'batch_number',
                 'remarks',
                 'created_on',
                 'created_by',
                 'modified_on',
                 'modified_by',
                 'dev_remarks')

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