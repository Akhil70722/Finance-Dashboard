import os
import django
import json
from datetime import datetime

# Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "finance_dashboard.settings")
django.setup()

from transactions.models import Transaction

# Load JSON file
with open("transactions/fixtures/transactions.json", "r") as f:
    data = json.load(f)

for item in data:
    item.pop("id", None)  # remove 'id'
    
    # ✅ Convert ISO string to datetime object
    item["date"] = datetime.strptime(item["date"], "%Y-%m-%dT%H:%M:%SZ")

    # Save transaction
    Transaction.objects.create(**item)

print("✅ transactions.json successfully loaded into the database!")
