# app/urls.py

from django.urls import path 
from . import views
from .views import RegisterUserView, LoginUserView

urlpatterns = [
    path('add_appinfo', views.add_appinfo),
    path('appinfo', views.view_appinfo),
    path('update_appinfo/<int:pk>', views.update_appinfo),
    path('delete_appinfo/<int:pk>', views.delete_appinfo),

    path('add_chemical', views.add_chemical),
    path('chemical', views.view_chemical),
    path('update_chemical/<int:pk>', views.update_chemical),
    path('delete_chemical/<int:pk>', views.delete_chemical),

    path('add_project', views.add_project),
    path('project', views.view_project),
    path('update_project/<int:pk>', views.update_project),
    path('delete_project/<int:pk>', views.delete_project),

    path('add_inventory', views.add_inventory),
    path('inventory', views.view_inventory),
    path('update_inventory/<int:pk>', views.update_inventory),
    path('delete_inventory/<int:pk>', views.delete_inventory),

    
    
    path('api/users/register/', RegisterUserView.as_view(), name='register-user'),
    path('api/users/login/', LoginUserView.as_view(), name='login-user'),
    
]
