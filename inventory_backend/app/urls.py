# app/urls.py

from django.urls import path, re_path
from . import views

urlpatterns = [
    path('add_appinfo', views.add_appinfo, name='add_appinfo'),
    path('appinfo/', views.view_appinfo, name='view_appinfo'),
    path('update_appinfo/<int:pk>', views.update_appinfo, name='update_appinfo'),
    path('delete_appinfo/<int:pk>', views.delete_appinfo, name='delete_appinfo'),

    re_path(r'^add_chemical/?$', views.add_chemical, name='add_chemical'),
    path('chemical/', views.view_chemical, name='view_chemical'),
    path('update_chemical/<int:pk>', views.update_chemical, name='update_chemical'),
    path('delete_chemical/<int:pk>', views.delete_chemical, name='delete_chemical'),

    path('add_project', views.add_project, name='add_project'),
    path('project/', views.view_project, name='view_project'),
    path('update_project/<int:pk>', views.update_project, name='update_project'),
    path('delete_project/<int:pk>', views.delete_project, name='delete_project'),

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
    path('delete_emp/<int:pk>', views.delete_emp, name='delete_emp'),
    
    
]
