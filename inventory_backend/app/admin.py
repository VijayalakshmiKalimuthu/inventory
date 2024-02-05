from django.contrib import admin
from .models import Appinfo
from .models import Chemical_Master
from .models import Project_Master
from .models import Inventory_Tran
from .models import Request_CI

admin.site.register(Appinfo)
admin.site.register(Chemical_Master)
admin.site.register(Project_Master)
admin.site.register(Inventory_Tran)
admin.site.register(Request_CI)
