
from .models import TempReceiveItem
from .serializers import ItemReceiveSerializer
from django.db.models import F
from rest_framework.decorators import api_view

def itemsReceives():
    # Fetch data from TempReceiveItem where deleted = 0
    temp_items = TempReceiveItem.objects.filter(deleted=0)
    return temp_items

def add_item_receives(temp_items):
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
            master_instance = Master.objects.get(c_id=temp_item.c_id)
            master_instance.quantity = F('quantity') + temp_item.quantity_received
            master_instance.quantity_received = temp_item.quantity_received
            master_instance.save()
        else:
            print("Invalid data:", rec_serializer.errors)            
            # Handle invalid data as needed

    # Update deleted field to 1 for the processed entries
    temp_items.update(deleted=1)

    # Assuming you want to return a message indicating successful processing
    print("Items processed successfully")