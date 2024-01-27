
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import AppinfoSerializer, ChemicalSerializer, ProjectSerializer, InventorySerializer, UserSerializer
from django.http.response import JsonResponse
from .models import Appinfo, Chemical_Master, Project_Master, Inventory_Tran
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
	
	
	# checking for the parameters from the URL
	if request.query_params:
		appinfo = Appinfo.objects.filter(**request.query_params.dict())
	else:
		appinfo = Appinfo.objects.all()

	# if there is something in appinfo else raise error
	if appinfo:
		serializer = AppinfoSerializer(appinfo, many=True)
		return Response(serializer.data)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)


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
    chemical = ChemicalSerializer(data=request.data)
 
    # validating for already existing data
    if Chemical_Master.objects.filter(**request.data).exists():
        raise serializers.ValidationError('This data already exists')
 
    if chemical.is_valid():
        chemical.save()
        return Response(chemical.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def view_chemical(request):
	
	
	# checking for the parameters from the URL
	if request.query_params:
		chemical = Chemical_Master.objects.filter(**request.query_params.dict())
	else:
		chemical = Chemical_Master.objects.all()

	# if there is something in appinfo else raise error
	if chemical:
		serializer = ChemicalSerializer(chemical, many=True)
		return Response(serializer.data)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)


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
	
	
	# checking for the parameters from the URL
	if request.query_params:
		project = Project_Master.objects.filter(**request.query_params.dict())
	else:
		project = Project_Master.objects.all()

	# if there is something in appinfo else raise error
	if project:
		serializer = ProjectSerializer(project, many=True)
		return Response(serializer.data)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)


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
	
	
	# checking for the parameters from the URL
	if request.query_params:
		inventory = Inventory_Tran.objects.filter(**request.query_params.dict())
	else:
		inventory = Inventory_Tran.objects.all()

	# if there is something in appinfo else raise error
	if inventory:
		serializer = InventorySerializer(inventory, many=True)
		return Response(serializer.data)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)


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


