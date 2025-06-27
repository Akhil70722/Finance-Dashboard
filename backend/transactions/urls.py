from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TransactionViewSet,
    export_csv,
    dashboard_summary,
    monthly_summary  # 👈 make sure you include this
)

# Set up router for ViewSet
router = DefaultRouter()
router.register(r'transactions', TransactionViewSet, basename='transactions')

# Define all routes
urlpatterns = [
    path('', include(router.urls)),                         # /api/transactions/ CRUD
    path('transactions/export/', export_csv),               # /api/transactions/export/
    path('dashboard-summary/', dashboard_summary),          # /api/dashboard-summary/
    path('monthly-summary/', monthly_summary),              # /api/monthly-summary/ ✅ For charts
]
