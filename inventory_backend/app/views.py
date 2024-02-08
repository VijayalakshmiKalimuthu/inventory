
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import AppinfoSerializer, ChemicalSerializer, ProjectSerializer, InventorySerializer, UserSerializer, RequestCISerializer, IssuesSerializers
from .serializers import LoginSerializer
from django.http.response import JsonResponse
from .models import Appinfo, Chemical_Master, Project_Master, Inventory_Tran, Request_CI, IssuesNote, LoginCre
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
from .models import EmpDet
from .serializers import EmpSerializer




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

# -------------------------CHEMICAL MASTER-------------------------------------------------------

@api_view(['POST'])
def add_chemical(request):
    print("Request data:", request.data)

    # Creating a serializer instance
    chemical = ChemicalSerializer(data=request.data)

    try:
        # Validating for already existing data
        if Chemical_Master.objects.filter(**request.data).exists():
            raise serializers.ValidationError('This data already exists')

        # Checking if the serializer is valid
        if chemical.is_valid():
            # Saving the data
            chemical.save()
            print("Chemical data saved successfully")
            return Response(chemical.data, status=status.HTTP_201_CREATED)
        else:
            print("Invalid data:", chemical.errors)
            return Response(chemical.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        print("An error occurred:", str(e))
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def view_chemical(request):
	chemical = Chemical_Master.objects.all()
	serializer = ChemicalSerializer(chemical, many=True)
	return Response(serializer.data)


@api_view(['PUT'])
def update_chemical(request, pk=None):
    chemical_to_update = Chemical_Master.objects.get(c_id=pk)
    serializer = ChemicalSerializer(instance=chemical_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        print("Updtaed.")
        return JsonResponse("Chemical Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Chemical")

@api_view(['DELETE'])
def delete_chemical(request, pk):
	chemical = get_object_or_404(Chemical_Master, c_id=pk)
	chemical.delete()
	return Response(status=status.HTTP_202_ACCEPTED)

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
	project = Project_Master.objects.all()
	serializer = ProjectSerializer(project, many=True)
	return Response(serializer.data)


@api_view(['PUT'])
def update_project(request, pk=None):
    project_to_update = Project_Master.objects.get(project_code=pk)

    serializer = ProjectSerializer(instance=project_to_update, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return JsonResponse("Project Updated Successfully", safe=False)
    return JsonResponse("Failed to Update Project")

@api_view(['DELETE'])
def delete_project(request, pk):
    project_to_delete = get_object_or_404(Project_Master, project_code=pk)

    # No need for a serializer in DELETE requests, just delete the object
    project_to_delete.delete()

    return JsonResponse("Project Deleted Successfully", safe=False)

# ---------------------------------------INVENTORY TRANS---------------------------------------------------

@api_view(['POST'])
def add_inventory(request):
    inventory = InventorySerializer(data=request.data)
 
    # validating for already existing data
    if Inventory_Tran.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
 
    if inventory.is_valid():
        inventory.save()
        return Response(inventory.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def view_inventory(request):
	inventory = Inventory_Tran.objects.all()
	serializer = InventorySerializer(inventory, many=True)
	return Response(serializer.data)


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
	req = Request_CI.objects.all()
	serializer = RequestCISerializer(req, many=True)
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
            print("Chemical data saved successfully")
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
    

@api_view(['GET'])
def view_emp(request):
    print("Request data:", request.data)
    # Perform a join between EmpDet, Project_Master, and LoginCre
    emp = EmpDet.objects.select_related('project_code').all()
    
    # Serialize the queryset
    serialized_data = []
    for employee in emp:
        serialized_employee = {
            'emp_id': employee.emp_id,
            'emp_name': employee.emp_name,
            'designation': employee.designation,  # Assuming 'role' is the field you want from LoginCre
            'project_code': employee.project_code.project_code,
            'project_name': employee.project_code.project_name
        }
        serialized_data.append(serialized_employee)
    
    # Print for debugging
    print("Serialized data:", serialized_data)

    return Response(serialized_data)


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

@api_view(['DELETE'])
def delete_emp(request, pk):
    print("Request data:", request.data)
    emp = get_object_or_404(EmpDet, emp_id=pk)
    emp.delete()
    return Response(status=status.HTTP_202_ACCEPTED)