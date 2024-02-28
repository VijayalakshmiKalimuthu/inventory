# app/urls.py

from django.urls import path, re_path
from . import views 
from .views import MasterListCreate, MasterRetrieveUpdateDestroy, MasterList, MasterUpdate

urlpatterns = [
    path('add_appinfo', views.add_appinfo, name='add_appinfo'),
    path('appinfo/', views.view_appinfo, name='view_appinfo'),
    path('update_appinfo/<int:pk>', views.update_appinfo, name='update_appinfo'),
    path('delete_appinfo/<int:pk>', views.delete_appinfo, name='delete_appinfo'),

    re_path('add_master', views.add_master, name='add_master'),
    path('master/', views.view_master, name='view_master'),
    path('update_master/<int:pk>', views.update_master, name='update_master'),
    path('inactive_master/<int:pk>', views.inactive_master, name='inactive_master'),

    path('add_project', views.add_project, name='add_project'),
    path('project/', views.view_project, name='view_project'),
    path('update_project/<int:pk>', views.update_project, name='update_project'),
    path('inactive_project/<int:pk>', views.inactive_project, name='inactive_project'),

    path('add_inventory', views.add_inventory, name='add_inventory'),
    path('inventory/', views.view_inventory, name='view_inventory'),
    path('update_inventory/<int:pk>', views.update_inventory, name='update_inventory'),
    path('delete_inventory/<int:pk>', views.delete_inventory, name='delete_inventory'),

    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),

    re_path(r'^add_request/?$', views.add_request, name='add_request'),
    path('request/', views.view_request, name='view_request'),
    path('update_request/<int:pk>', views.update_request, name='update_request'),
    path('delete_request/<int:pk>', views.delete_request, name='delete_request'),

    path('add_issue', views.add_issue, name='add_issue'),
    path('issues', views.view_issue, name='view_issue'),

    re_path(r'^add_login/?$', views.add_login, name='add_login'),
    path('view_login', views.view_login, name='view_login'),
    path('update_login/<str:user_name>', views.update_login, name='update_login'),

    re_path(r'^add_emp/?$', views.add_emp, name='add_emp'),
    path('emp/', views.view_emp, name='view_emp'),
    path('update_emp/<int:pk>', views.update_emp, name='update_emp'),
    path('inactive_emp/<int:pk>', views.inactive_emp, name='inactive_emp'),

    re_path(r'^add_itemissue1/?$', views.add_itemissue1, name='add_itemissue'),

    re_path(r'^add_itemissue/?$', views.add_itemissue, name='add_itemissue'),
    path('itemissue/', views.view_itemissue, name='view_itemissue'),

    re_path(r'^add_itemreceive1/?$', views.add_itemreceive1, name='add_itemreceive'),

    re_path(r'^add_itemreceive/?$', views.add_itemreceive, name='add_itemreceive'),
    path('itemreceive/', views.view_itemreceive, name='view_itemreceive'),

    path('researcherEmpName/', views.view_ResearcherEmpName,  name= 'view_ResearcherEmpName'),

    path('view_status/', views.view_status, name="view_status"),
    re_path(r'^add_itemreturn/?$', views.add_itemreturn, name='add_itemreturn'),

    re_path(r'^addProduct_request/?$', views.addProduct_request, name='addProduct_request'),
    path('viewProduct_request/', views.viewProduct_request, name="viewProduct_request"),
        
    path('updateProduct_request/<int:pk>', views.updateProduct_request, name="updateProduct_request"),
    path('view_entry', views.view_entry, name='view_entry'),

    path('view_distinct_role/', views.view_role, name='view_distinct_role'),

    path('add_empReg', views.add_empReg, name='add_emp_Reg'),

    path('master_inventory/create/', MasterListCreate.as_view(), name='master-create'),
    path('master_inventory/update/<int:pk>/', MasterUpdate.as_view(), name='master-update'),

    path('masters/<int:pk>/', MasterRetrieveUpdateDestroy.as_view(), name='master-retrieve'),
    path('masters_inventory1/update/<int:pk>/', MasterRetrieveUpdateDestroy.as_view(), name='master-update1'),
    path('masters/<int:pk>/delete/', MasterRetrieveUpdateDestroy.as_view(), name='master-delete'),
    path('masters/', MasterList.as_view(), name='master-list'),

    path('masters/chemical/', views.master_list_chemical, name='master_list_chemical'),
    path('masters/labware/', views.master_list_labware, name='master_list_labware'),

    path('master/chemical/desc/', views.master_chemical_itemcode_desc, name='master_chemical_itemcode_desc'),
    path('master/labware/desc/', views.master_labware_itemcode_desc, name='master_labware_itemcode_desc'),

    path('master/stockLevel', views.master_stockLevel, name='master_stockLevel'),

    re_path(r'^add_temp_receive_item/?$', views.add_temp_receive_item, name='add_temp_receive_item'),
    path('temp_receive/', views.view_temp_receive, name='view_temp_receive'),

    re_path(r'^add_temp_issue_item/?$', views.add_temp_issue_item, name='add_temp_issue_item'),
    path('temp_issue/', views.view_temp_issue, name='view_temp_issue'),

    path('transfer/receive/', views.transfer_dataReceive, name='transfer_data'),
    path('transfer/issue/', views.transfer_dataIssue, name='transfer_dataissue'),
    
    
    
 ]
