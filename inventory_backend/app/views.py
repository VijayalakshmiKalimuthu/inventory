
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import AppinfoSerializer, MasterSerializer, ProjectSerializer, InventorySerializer, UserSerializer, RequestCISerializer, IssuesSerializers
from .serializers import LoginSerializer
from django.http.response import JsonResponse
from .models import Appinfo, Master, Project_Master, Inventory_Tran, Request_CI, IssuesNote, LoginCre
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .models import EmpDet, ItemIssue, ItemReceive, ItemReturn, TempReceiveItem, TempIssueItem
from .serializers import EmpSerializer, ItemReceiveSerializer, ItemIssueSerializer, ItemReturnSerializer, RoleSerializer, MasterSerializer1, MasterSerializerCreate, TempReceiveSerializer, TempIssueSerializer
from django.db.models import F, Case, When, Value, IntegerField
from django.shortcuts import render
from rest_framework import generics
from django.db import transaction


@api_view(['POST'])
def add_appinfo(request):
    appinfo = AppinfoSerializer(data=request.data)
 
    # validating for already existing data
    if Appinfo.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
 
    if appinfo.is_valid():
        appinfo.save()
        return Response(appinfo.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def view_appinfo(request):
    appinfo = Appinfo.objects.all()
    serializer = AppinfoSerializer(appinfo, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_appinfo(request, pk=None):
    appinfo_to_update = Appinfo.objects.get(infocode=pk)
    serializer = AppinfoSerializer(instance=appinfo_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        print("Updtaed.")
        return JsonResponse("Appinfo Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Appinfo")

@api_view(['DELETE'])
def delete_appinfo(request, pk=None):
    appinfo_to_delete = get_object_or_404(Appinfo, infocode=pk)

    # No need for a serializer in DELETE requests, just delete the object
    appinfo_to_delete.delete()

    return JsonResponse("Appinfo Deleted Successfully", safe=False)

# -------------------------master MASTER-------------------------------------------------------

@api_view(['POST'])
def add_master(request):
    print("Request Data", request.data)
    # Extract data from the request
    item_code = request.data.get('item_code')
    item_name = request.data.get('item_name')
    m_date = request.data.get('m_date')
    supplier = request.data.get('supplier')
    master_type = request.data.get('master_type')
    units = request.data.get('units')
    price = request.data.get('price')
    remarks = request.data.get('remarks')

    # Create a dictionary with selective columns and their default values set to None
    filtered_data = {
        'issue_date': None,
        'issue_to': None,
        'quantity': 0,
        'quantity_issued': None,
        'quantity_received': None,
        'stock': None,
        'created_on': None,
        'created_by': None,
        'modified_on': None,
        'modified_by': None,
        'batch_number': None,
        'project_code': None,
        'dev_remarks': None,
        'entry_no': None,
        'item_code': item_code,
        'item_name': item_name,
        'm_date': m_date,
        'supplier': supplier,
        'master_type': master_type,
        'units': units,
        'price': price,
        'remarks': remarks,
    }

    # Create a serializer instance with filtered data
    master_serializer = MasterSerializer(data=filtered_data)

    try:
        # Check if the serializer is valid
        if master_serializer.is_valid():
            # Save the data
            master_serializer.save()
            return Response(master_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(master_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    
@api_view(['GET'])
def view_master(request):
    master = Master.objects.filter(deleted=0)
    # Define fields to be included in the response
    fields = ['c_id', 'entry_no', 'item_code', 'item_name', 'm_date', 'supplier', 
              'master_type', 'quantity', 'units', 'price', 'project_code', 'remarks']
    # Serialize data with specified fields
    serializer = MasterSerializer(master, many=True)
    return Response(serializer.data)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Master
from .serializers import MasterSerializer

@api_view(['PUT'])
def update_master(request, pk):
    try:
        # Retrieve the Master object to update
        master_instance = Master.objects.get(c_id=pk)
    except Master.DoesNotExist:
        return Response({"error": "Master object does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    # Initialize serializer instance with the retrieved Master object and provided data
    master_serializer = MasterSerializer(instance=master_instance, data=request.data, partial=True)
    
    try:
        # Check if serializer is valid
        if master_serializer.is_valid():
            # Save the updated data
            master_serializer.save()
            return Response({"message": "Master data updated successfully"}, status=status.HTTP_200_OK)
        else:
            return Response(master_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['PUT', 'PATCH'])
def inactive_master(request, pk):
    try:
        master1 = Master.objects.get(c_id=pk)
    except Project_Master.DoesNotExist:
        return JsonResponse("Master not found", status=404)
    
    master1.deleted = 1
    master1.save()

    return JsonResponse("Master 'deleted' field updated value in 1 successfully", safe=False)



#-----------------------PROJECT MASTER--------------------------------------------------------------


@api_view(['POST'])
def add_project(request):
    project = ProjectSerializer(data=request.data)
 
    # validating for already existing data
    if Project_Master.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
 
    if project.is_valid():
        project.save()
        return Response(project.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def view_project(request): 
    projects = Project_Master.objects.filter(deleted=0)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_project(request, pk=None):
    project_to_update = Project_Master.objects.get(project_code=pk)

    serializer = ProjectSerializer(instance=project_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return JsonResponse("Project Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Project")

@api_view(['PUT', 'PATCH'])
def inactive_project(request, pk):
    try:
        project = Project_Master.objects.get(project_code=pk)
    except Project_Master.DoesNotExist:
        return JsonResponse("Project not found", status=404)

    # Update the 'deleted' field to 1 instead of deleting the object
    project.deleted = 1
    project.save()

    return JsonResponse("Project 'deleted' field updated successfully", safe=False)

# ---------------------------------------INVENTORY TRANS---------------------------------------------------


@api_view(['POST'])
def add_inventory(request):
    try:
        # Extract data from the request
        entry_no = request.data.get('entry_no')
        item_code = request.data.get('item_code')
        item_name = request.data.get('item_name')
        tran_type_IR = request.data.get('tran_type_IR')
        i_date = request.data.get('i_date')
        supplier = request.data.get('supplier')
        units = request.data.get('units')
        price = request.data.get('price')
        quantity_issued = request.data.get('quantity_issued')
        quantity_received = request.data.get('quantity_received')
        quantity = request.data.get('quantity')
        remarks = request.data.get('remarks')

        # Define common fields
        common_fields = {
            'stock': None,
            'ref_number': None,
            'ref_type': None,
            'batch_number': None,
            'remarks': None,
            'created_on': None,
            'created_by': None,
            'modified_on': None,
            'modified_by': None,
            'dev_remarks': None,
            'entry_no': entry_no,
            'item_code': item_code,
            'item_name': item_name,
            'tran_type_IR': tran_type_IR,
            'i_date': i_date,
            'supplier': supplier,
            'units': units,
            'price': price,
            'quantity': quantity,
            'remarks': remarks
        }

        if tran_type_IR == 'I':
            common_fields['quantity_issued'] = quantity_issued
            common_fields['quantity_received'] = None
        else:
            common_fields['quantity_issued'] = None
            common_fields['quantity_received'] = quantity_received

        # Create a serializer instance with filtered data
        tran_serializer = InventorySerializer(data=common_fields)

        # Check if the serializer is valid
        if tran_serializer.is_valid():
            # Save the data
            tran_serializer.save()
            return Response(tran_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(tran_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def view_inventory(request):
    print("Request data: ", request.data)
    inv = Inventory_Tran.objects.select_related('item_code').all()
    
    serialized_data =[]
    for inventory in inv:
        serialized_inventory = {
            'entry_no': inventory.entry_no,
            'item_code': inventory.item_code.item_code,
            'item_name': inventory.item_code.item_name,
            'tran_type_IR': inventory.tran_type_IR,
            'i_date': inventory.i_date,
            'supplier': inventory.item_code.supplier,
            'units': inventory.item_code.units,
            'price': inventory.item_code.price,
            'quantity_issued': inventory.quantity_issued,
            'quantity_received': inventory.quantity_received,
            'quantity': inventory.item_code.quantity
        }
        serialized_data.append(serialized_inventory)

        print("Serialized data: ", serialized_data)

        return Response(serialized_data)


@api_view(['PUT'])
def update_inventory(request, pk=None):
    inventory_to_update = Inventory_Tran.objects.get(entry_no=pk)
    serializer = InventorySerializer(instance=inventory_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return JsonResponse("Inventory Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Inventory")

@api_view(['DELETE'])
def delete_inventory(request, pk):
	inventory = get_object_or_404(Inventory_Tran, entry_no=pk)
	inventory.delete()
	return Response(status=status.HTTP_202_ACCEPTED)

#----------------------------------Login---------------------------------------------------#


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    # Get data from the request
    username = request.data.get('username')
    password = request.data.get('password')

    # Validate data
    if not username or not password:
        return Response({'error': 'Both username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the user already exists
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username is already taken'}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user
    user = User.objects.create_user(username=username, password=password)
    Token.objects.create(user=user)

    return Response({'token': str(Token.objects.get(user=user))}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    # Get data from the request
    username = request.data.get('username')
    password = request.data.get('password')

    # Validate data
    if not username or not password:
        return Response({'error': 'Both username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate the user
    user = authenticate(username=username, password=password)

    if user is not None:
        # If authentication is successful, create a token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': str(token)}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)


#--------------------------------Waiting Approval------------------------------------------

@api_view(['POST'])
def add_request(request):
    print("Request data:", request.data)

    # Creating a serializer instance
    req = RequestCISerializer(data=request.data)

    try:
        # Validating for already existing data
        if Request_CI.objects.filter(**request.data).exists():
            print("Data already exists")
            raise serializers.ValidationError('This data already exists')

        # Checking if the serializer is valid
        if req.is_valid():
            # Saving the data
            req.save()
            print("Request data saved successfully")
            return Response(req.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", req.errors)
            return Response(req.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def view_request(request):
    # Filter requests where RequestedBy is 'Lab Assistant'
    requests = Request_CI.objects.filter(RequestedBy='Lab Assistant')
    
    # Serialize the filtered requests
    serializer = RequestCISerializer(requests, many=True)
    
    # Return the serialized data as response
    return Response(serializer.data)


@api_view(['PUT'])
def update_request(request, pk=None):
    req_to_update = Request_CI.objects.get(id=pk)
    serializer = RequestCISerializer(instance=req_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return JsonResponse("Request Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Request")

@api_view(['DELETE'])
def delete_request(request, pk):
	req = get_object_or_404(Request_CI, id=pk)
	req.delete()
	return Response(status=status.HTTP_202_ACCEPTED)


# -------------------------------------Issue Notes ------------------------------#

@api_view(['POST'])
def add_issue(request):
    print("Request data:", request.data)

    # Creating a serializer instance
    issues = IssuesSerializers(data=request.data)

    try:
        # Validating for already existing data
        if IssuesNote.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')

        # Checking if the serializer is valid
        if issues.is_valid():
            # Saving the data
            issues.save()
            print("Issue Task saved successfully")
            return Response(issues.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", issues.errors)
            return Response(issues.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def view_issue(request):
	issues = IssuesNote.objects.all()
	serializer = IssuesSerializers(issues, many=True)
	return Response(serializer.data)


#-----------------------------Login Authentications----------------------------------#


@api_view(['POST'])
def add_login(request):
    print("Request data:", request.data)

    # Creating a serializer instance
    login = LoginSerializer(data=request.data)

    try:
        # Validating for already existing data
        if LoginCre.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')

        # Checking if the serializer is valid
        if login.is_valid():
            # Saving the data
            login.save()
            print("master data saved successfully")
            return Response(login.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", login.errors)
            return Response(login.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def view_login(request):
    login = LoginCre.objects.all()
    serializer = LoginSerializer(login, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def update_login(request, user_name=None):
    login_to_update = LoginCre.objects.get(user_name=user_name)
    serializer = LoginSerializer(instance=login_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        print("Updated.")
        return JsonResponse("Login Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Login")

#----------------------Emp Details------------------------------------------------------#

@api_view(['POST'])
def add_emp(request):
    print("Request data:", request.data)

    try:
        project_code_value = request.data.get('project_code')  # Assuming project_code is passed as an integer
        if project_code_value:
            project_instance, _ = Project_Master.objects.get_or_create(project_code=project_code_value)
        else:
            raise serializers.ValidationError('Project code is required')

        # Creating a serializer instance with modified data (including the fetched or created designation and project instances)
        data = request.data.copy()
        data['project_code'] = project_instance.project_code
        emp_serializer = EmpSerializer(data=data)

        # Validating and saving the serializer instance
        if emp_serializer.is_valid():
            emp_serializer.save()
            print("Employee details saved successfully")
            return Response(emp_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", emp_serializer.errors)
            return Response(emp_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EmpSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpDet
        fields = ['emp_name', 'designation']  # Specify only emp_name and designation

@api_view(['POST'])
def add_empReg(request):
    print("Request data:", request.data)

    # Creating a serializer instance
    emp = EmpSerializer(data=request.data)

    try:
        # Validating for already existing data
        if EmpDet.objects.filter(emp_name=request.data.get('emp_name')).exists():
            raise serializers.ValidationError('This data already exists')

        # Checking if the serializer is valid
        if emp.is_valid():
            # Saving the data
            emp.save()
            print("Employee data saved successfully")
            return Response(emp.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", emp.errors)
            return Response(emp.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['GET'])
def view_emp(request):
    employees = EmpDet.objects.all()
    emp_data = []
    for employee in employees:
        project_code = None
        project_name = None
        if employee.project_code:
            project_code = employee.project_code.project_code
            project_name = employee.project_code.project_name
        emp_data.append({
            'emp_id': employee.emp_id,
            'emp_name': employee.emp_name,
            'designation': employee.designation,
            'project_code': project_code,
            'project_name': project_name
        })
    return Response(emp_data)

@api_view(['PUT'])
def update_emp(request, pk=None):
    print("Request data:", request.data)

    try:
        emp_to_update = EmpDet.objects.get(emp_id=pk)
        serializer = EmpSerializer(instance=emp_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            print("Employee Details are Updated.")
            return JsonResponse("Employee details updated successfully", safe=False, status=status.HTTP_200_OK)
        else:
            print("Invalid data:", serializer.errors)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except EmpDet.DoesNotExist:
        return JsonResponse("Employee does not exist", status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        print("An error occurred:", str(e))
        return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT', 'PATCH'])
def inactive_emp(request, pk):
    try:
        employee = EmpDet.objects.get(emp_id=pk)
    except EmpDet.DoesNotExist:
        return JsonResponse("Emp details not found", status=404)

    # Update the 'deleted' field to 1 instead of deleting the object
    employee.deleted = 1
    employee.save()

    return JsonResponse("Employee 'deleted' field value 1 to be updated successfully", safe=False)

#-----------------------Item Receive--------------------------#

@api_view(['POST'])
def add_itemreceive1(request):
    print("Request data:", request.data)

    try:
        c_id_value = request.data.get('c_id')
        quantity_received = request.data.get('quantity_received')  # Get the quantity received

        if c_id_value:
            master_instance, _ = Master.objects.get_or_create(c_id=c_id_value)
        else:
            raise serializers.ValidationError('Item code is required')

        # Get the c_id value from the master_instance
        c_id_value = master_instance.c_id

        # Modify the request data with the correct c_id value
        data = request.data.copy()
        data['c_id'] = c_id_value

        rec_serializer = ItemReceiveSerializer(data=data)

        if rec_serializer.is_valid():
            rec_instance = rec_serializer.save()  # Save the ItemReceive instance
            print("Item Received successfully")

            # Update the Master instance with the quantity received
            Master.objects.filter(c_id=c_id_value).update(quantity=F('quantity') + quantity_received)
            Master.objects.filter(c_id=c_id_value).update(
                quantity_received=quantity_received
            )

            return Response(rec_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", rec_serializer.errors)
            return Response(rec_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def add_itemreceive(request):
    print("Request data:", request.data)

    try:
        with transaction.atomic():
            # Fetch data from TempReceiveItem where deleted = 0
            temp_items = TempReceiveItem.objects.filter(deleted=0)

            for temp_item in temp_items:
                # Create an instance of ItemReceiveSerializer with the data from TempReceiveItem
                rec_serializer = ItemReceiveSerializer(data={
                    'bill_no': temp_item.bill_no,
                    'c_id': temp_item.c_id,
                    'receipt_date': temp_item.receipt_date,
                    'quantity_received': temp_item.quantity_received,
                    'po_number': temp_item.po_number,
                    'batch_number': temp_item.batch_number,
                    'remarks': temp_item.remarks
                })

                if rec_serializer.is_valid():
                    rec_instance = rec_serializer.save()  # Save the ItemReceive instance
                    print("Item Received successfully")

                    # Update the Master instance with the quantity received
                    Master.objects.filter(c_id=temp_item.c_id).update(quantity=F('quantity') + temp_item.quantity_received)
                    Master.objects.filter(c_id=temp_item.c_id).update(
                        quantity_received=temp_item.quantity_received
                    )

                else:
                    print("Invalid data:", rec_serializer.errors)
                    return Response(rec_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Update deleted field to 1 for the processed entries
            temp_items.update(deleted=1)

        return Response("Item received and processed successfully", status=status.HTTP_201_CREATED)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def view_itemreceive(request):
    print("Request data:", request.data)
    # Perform a join between EmpDet, Project_Master, and LoginCre
    rec = ItemReceive.objects.select_related('c_id').all()
    
    # Serialize the queryset
    serialized_data = []
    for receive in rec:
        formatted_receipt_date = receive.receipt_date.strftime('%d-%m-%Y %I:%M %p')

        serialized_receive = {
            'item_code': receive.c_id.item_code,
            'item_name': receive.c_id.item_name,
            'units': receive.c_id.units,
            'receipt_date': formatted_receipt_date,
            'quantity_received': receive.quantity_received,
            'po_number': receive.po_number,
            'batch_number': receive.batch_number,
            'remarks': receive.remarks
        }
        serialized_data.append(serialized_receive)
    
    # Print for debugging
    print("Serialized data:", serialized_data)

    return Response(serialized_data)

#------------------------Item Issue--------------------#

@api_view(['POST'])
def add_itemissue1(request):
    print("Request data:", request.data)

    try:
        project_code_value = request.data.get('project_code')
        
        quantity_issued = request.data.get('quantity_issued')

        if project_code_value:
            project_instance, _ = Project_Master.objects.get_or_create(project_code=project_code_value)
        else:
            raise serializers.ValidationError('Project code is required')

        c_id_value = request.data.get('c_id')  # Assuming project_code is passed as an integer
        if c_id_value:
            master_instance, _ = Master.objects.get_or_create(c_id=c_id_value)
        else:
            raise serializers.ValidationError('Item code is required')

        # Creating a serializer instance with modified data (including the fetched or created designation and project instances)
        data = request.data.copy()
        data['project_code'] = project_instance.project_code
        data['c_id'] = master_instance.c_id
        rec_serializer = ItemIssueSerializer(data=data)

        # Validating and saving the serializer instance
        if rec_serializer.is_valid():
            rec_serializer.save()
            print("Issue details saved successfully")
            condition = Case(
                When(
                    quantity__gt=0,
                    then=F('quantity') - Value(quantity_issued)
                ),
                default=Value(0),  # If quantity is not greater than 0, set it to 0
                output_field=IntegerField()  # Ensure the output field matches the data type of quantity
            )
        
            # Update the quantity field based on the condition
            Master.objects.filter(c_id=c_id_value).update(quantity=condition)
            Master.objects.filter(c_id=c_id_value).update(quantity=F('quantity'))
            Master.objects.filter(c_id=c_id_value).update(
                quantity_issued=quantity_issued
            )
            return Response(rec_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", rec_serializer.errors)
            return Response(rec_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(['POST'])
def add_itemissue(request):
    print("Request data:", request.data)

    try:
        # Fetch data from TempIssueItem where deleted = 0
        temp_items = TempIssueItem.objects.filter(deleted=0)

        for temp_item in temp_items:
            # Create an instance of ItemIssueSerializer with the data from TempIssueItem
            rec_serializer = ItemIssueSerializer(data={
                'bill_no': temp_item.bill_no,
                'c_id': temp_item.c_id,
                'issue_date': temp_item.issue_date,
                'quantity_issued': temp_item.quantity_issued,
                'issued_to': temp_item.issued_to,
                'project_code': temp_item.project_code,
                'researcher_name': temp_item.researcher_name,
                'batch_number': temp_item.batch_number,
                'remarks': temp_item.remarks
            })

            if rec_serializer.is_valid():
                rec_instance = rec_serializer.save()  # Save the ItemIssue instance
                print("Issue details saved successfully")

                # Update the quantity field in Master based on the condition
                condition = Case(
                    When(
                        quantity__gt=0,
                        then=F('quantity') - Value(temp_item.quantity_issued)
                    ),
                    default=Value(0),  # If quantity is not greater than 0, set it to 0
                    output_field=IntegerField()  # Ensure the output field matches the data type of quantity
                )
                Master.objects.filter(c_id=temp_item.c_id).update(quantity=condition)

                # Update quantity_issued field in Master
                Master.objects.filter(c_id=temp_item.c_id).update(quantity_issued=temp_item.quantity_issued)

            else:
                print("Invalid data:", rec_serializer.errors)
                return Response(rec_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Update deleted field to 1 for the processed entries
        temp_items.update(deleted=1)

        return Response("Item issue added and processed successfully", status=status.HTTP_201_CREATED)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def view_itemissue(request):
    print("Request data:", request.data)
    # Perform a join between EmpDet, Project_Master, and LoginCre
    rec = ItemIssue.objects.select_related('c_id', 'project_code').all()
    
    # Serialize the queryset
    serialized_data = []
    for issue in rec:
        formatted_issue_date = issue.issue_date.strftime('%d-%m-%Y %I:%M %p')

        serialized_employee = {
            'entry_no': issue.entry_no,
            'item_code': issue.c_id.item_code,
            'item_name': issue.c_id.item_name,
            'units': issue.c_id.units,
            'issue_date': formatted_issue_date,
            'quantity_issued': issue.quantity_issued,
            'issued_to': issue.issued_to,
            'project_code': issue.project_code.project_code,
            'project_name': issue.project_code.project_name,
            'researcher_name': issue.researcher_name,
            'batch_number': issue.batch_number,
            'remarks': issue.remarks
        }
        serialized_data.append(serialized_employee)
    
    # Print for debugging
    print("Serialized data:", serialized_data)

    return Response(serialized_data)

@api_view(['GET'])
def view_ResearcherEmpName(request):
    try:
        # Filter EmpDet objects based on designation
        researchers = EmpDet.objects.filter(designation='Researcher')
        
        # Extract emp_name from filtered objects
        researcher_names = [researcher.emp_name for researcher in researchers]

        # Print for debugging
        print("Researcher names:", researcher_names)

        return Response(researcher_names)
    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#--------------------------Notification in approval lab assistant--------------------------------#
    
@api_view(['GET'])
def view_status(request):
    print("Request data:", request.data)
    status = Request_CI.objects.all()
    
    # Serialize the queryset
    serialized_data = []
    for st in status:
        serialized_employee = {
            'ItemCode': st.ItemCode,
            'ItemType': st.ItemType,
            'ItemName': st.ItemName,
            'RequestStatus': st.RequestStatus
        }
        serialized_data.append(serialized_employee)
    
    # Print for debugging
    print("Serialized data:", serialized_data)

    return Response(serialized_data)

#----------------------------------Item Return-------------------------------------#

@api_view(['POST'])
def add_itemreturn(request):
    print("Request data:", request.data)

    try:
        c_id_value = request.data.get('c_id')
        quantity_return = request.data.get('quantity_return')  # Get the quantity received

        if c_id_value:
            master_instance, _ = Master.objects.get_or_create(c_id=c_id_value)
        else:
            raise serializers.ValidationError('Item code is required')

        # Get the c_id value from the master_instance
        c_id_value = master_instance.c_id

        # Modify the request data with the correct c_id value
        data = request.data.copy()
        data['c_id'] = c_id_value

        rec_serializer = ItemReturnSerializer(data=data)

        if rec_serializer.is_valid():
            rec_instance = rec_serializer.save()  # Save the ItemReturn instance
            print("Item Return successfully")

            # Update the Master instance with the quantity received
            Master.objects.filter(c_id=c_id_value).update(quantity=F('quantity') + quantity_return)

            return Response(rec_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", rec_serializer.errors)
            return Response(rec_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#----------------------------Researcher Request For Add Product-----------------------------------#

@api_view(['POST'])
def addProduct_request(request):
    print("Request data:", request.data)

    # Creating a serializer instance
    req = RequestCISerializer(data=request.data)

    try:
        # Validating for already existing data
        if Request_CI.objects.filter(**request.data).exists():
            print("Data already exists")
            raise serializers.ValidationError('This data already exists')

        # Checking if the serializer is valid
        if req.is_valid():
            # Saving the data
            req.save()
            print("Request data saved successfully")
            return Response(req.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", req.errors)
            return Response(req.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    



@api_view(['GET'])
def viewProduct_request(request):
    print("Request Data: ", request.data)

    requestProd = Request_CI.objects.all()

    serialized_data = []

    for req in requestProd:
        # Check if RequestedTo is 'Researcher'
        if req.RequestedBy == 'Researcher':
            serialized_request = {
                'id': req.id,
                'RequestDate': req.RequestDate,
                'RequestedBy': req.RequestedBy,
                'RequestedTo': req.RequestedTo,
                'RequestDetails': req.RequestDetails,
                'RequestStatus': req.RequestStatus
            }

            serialized_data.append(serialized_request)

    # Check if any data was serialized
    if serialized_data:
        print("Serialized Data: ", serialized_data)
        return Response(serialized_data)
    else:
        return Response({"message": "No data found for RequestedTo = 'Researcher'"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def updateProduct_request(request, pk):
    print("Request Data: ", request.data)

    req_to_update = Request_CI.objects.get(id=pk)
    serializer = RequestCISerializer(instance=req_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return JsonResponse("Request Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Request")


#--------------------------View Entry------------------------------------------#


@api_view(['GET'])
def view_entry(request):
    emp = EmpDet.objects.select_related('project_code').all()
    mas = Master.objects.select_related('project_code').all()
    
    serialized_data = []
    for data in mas:
        for employee in emp:
             if data.project_code == employee.project_code:
                serialized_employee = {
                    'c_id': data.c_id, 
                    'entry_no': data.entry_no, 
                    'item_code': data.item_code, 
                    'item_name': data.item_name, 
                    'm_date': data.m_date, 
                    'supplier': data.supplier, 
                    'master_type': data.master_type, 
                    'quantity': data.quantity, 
                    'units': data.units, 
                    'price': data.price, 
                    'project_code': data.project_code.project_code, 
                    'remarks': data.remarks,
                    'designation': employee.designation, 
                }
                serialized_data.append(serialized_employee)
    
    # Print for debugging
    print("Serialized data:", serialized_data)

    return Response(serialized_data)

#-----------------Get Distinct Role--------------------------------------#

@api_view(['GET'])
def view_role(request):
    # Retrieve distinct roles using distinct() and values()
    distinct_roles = LoginCre.objects.values('role').distinct()

    # Serialize the data
    serializer = RoleSerializer(distinct_roles, many=True)  # Assuming RoleSerializer is defined correctly

    # Return the serialized data as a response
    return Response(serializer.data)

#------------------------New Master Table-----------------------------------#

class MasterList(generics.ListCreateAPIView):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer1

#-----------------Master Create  and Updte  --------------------------------#
    
class MasterListCreate(generics.ListCreateAPIView):
    queryset = Master.objects.all()
    serializer_class = MasterSerializerCreate

class MasterUpdate(generics.RetrieveUpdateAPIView):
    queryset = Master.objects.all()
    serializer_class = MasterSerializerCreate

#----------------------------------------------------------------------------#
class MasterRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Master.objects.all()
    serializer_class = MasterSerializer1


@api_view(['GET'])
def master_list_chemical(request):
    if request.method == 'GET':
        queryset = Master.objects.filter(master_type="Chemical")
        serializer = MasterSerializer1(queryset, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def master_list_labware(request):
    if request.method == 'GET':
        queryset = Master.objects.filter(master_type="Labware")
        serializer = MasterSerializer1(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def master_chemical_itemcode_desc(request):
    if request.method == 'GET':
        queryset = Master.objects.filter(master_type="Chemical").order_by('-c_id')
        serializer = MasterSerializer1(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def master_labware_itemcode_desc(request):
    if request.method == 'GET':
        queryset = Master.objects.filter(master_type="Labware").order_by('-c_id')
        serializer = MasterSerializer1(queryset, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def master_stockLevel(request):

    if request.method == 'GET':
        print("Inside Master Stocklevel")
        queryset = Master.objects.all()
        serializer = MasterSerializer1(queryset, many=True)
        stock_level = 'Stock is Sufficient'
        
        for obj in serializer.data:
            if obj['quantity'] < obj['min_req_stock']:
                stock_level = "Stock has to be Reorder"
                print("Inside If condition")
                print("Stock has to be Reorder")
                break  # Exit loop as soon as one item requires reorder
        
        # Append stock level to the response
        response_data = {
            'stock_level': stock_level
        }
        print("Response Data: ", response_data)
        
        return Response(response_data)

#-----------------------Temporary Table for store in Receive and issue-----------------------------------#



@api_view(['POST'])
def add_temp_receive_item(request):
    print("Request data:", request.data)

    try:
        c_id_value = request.data.get('c_id')

        if c_id_value:
            master_instance, _ = Master.objects.get_or_create(c_id=c_id_value)
        else:
            raise serializers.ValidationError('Item code is required')

        # Get the c_id value from the master_instance
        c_id_value = master_instance.c_id

        # Modify the request data with the correct c_id value
        data = request.data.copy()
        data['c_id'] = c_id_value

        rec_serializer = TempReceiveSerializer(data=data)

        if rec_serializer.is_valid():
            rec_instance = rec_serializer.save()  # Save the ItemReceive instance
            print("Temp Item Received successfully")

            return Response(rec_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", rec_serializer.errors)
            return Response(rec_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
def add_temp_issue_item(request):
    print("Request data:", request.data)

    try:
        project_code_value = request.data.get('project_code')

        if project_code_value:
            project_instance, _ = Project_Master.objects.get_or_create(project_code=project_code_value)
        else:
            raise serializers.ValidationError('Project code is required')

        c_id_value = request.data.get('c_id')  # Assuming project_code is passed as an integer
        if c_id_value:
            master_instance, _ = Master.objects.get_or_create(c_id=c_id_value)
        else:
            raise serializers.ValidationError('Item code is required')

        # Creating a serializer instance with modified data (including the fetched or created designation and project instances)
        data = request.data.copy()
        data['project_code'] = project_instance.project_code
        data['c_id'] = master_instance.c_id
        rec_serializer = TempIssueSerializer(data=data)

        # Validating and saving the serializer instance
        if rec_serializer.is_valid():
            rec_serializer.save()
            print("Issue details saved successfully")

            return Response(rec_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", rec_serializer.errors)
            return Response(rec_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   


@api_view(['GET'])
def view_temp_receive(request):
    print("Request data:", request.data)
    # Perform a join between EmpDet, Project_Master, and LoginCre
    rec = TempReceiveItem.objects.select_related('c_id').all()
    
    # Serialize the queryset
    serialized_data = []
    for receive in rec:
        formatted_receipt_date = receive.receipt_date.strftime('%d-%m-%Y %I:%M %p')

        serialized_receive = {
            'item_code': receive.c_id.item_code,
            'item_name': receive.c_id.item_name,
            'units': receive.c_id.units,
            'receipt_date': formatted_receipt_date,
            'quantity_received': receive.quantity_received,
            'po_number': receive.po_number,
            'batch_number': receive.batch_number,
            'remarks': receive.remarks
        }
        serialized_data.append(serialized_receive)
    
    # Print for debugging
    print("Serialized data:", serialized_data)

    return Response(serialized_data)


@api_view(['GET'])
def view_temp_issue(request):
    print("Request data:", request.data)
    # Perform a join between EmpDet, Project_Master, and LoginCre
    rec = TempIssueItem.objects.select_related('c_id', 'project_code').all()
    
    # Serialize the queryset
    serialized_data = []
    for issue in rec:
        formatted_issue_date = issue.issue_date.strftime('%d-%m-%Y %I:%M %p')

        serialized_employee = {
            'entry_no': issue.entry_no,
            'item_code': issue.c_id.item_code,
            'item_name': issue.c_id.item_name,
            'units': issue.c_id.units,
            'issue_date': formatted_issue_date,
            'quantity_issued': issue.quantity_issued,
            'issued_to': issue.issued_to,
            'project_code': issue.project_code.project_code,
            'project_name': issue.project_code.project_name,
            'researcher_name': issue.researcher_name,
            'batch_number': issue.batch_number,
            'remarks': issue.remarks
        }
        serialized_data.append(serialized_employee)
    
    # Print for debugging
    print("Serialized data:", serialized_data)

    return Response(serialized_data)