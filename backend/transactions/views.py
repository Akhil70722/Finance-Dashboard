from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.generics import ListAPIView
from django.db.models.functions import TruncMonth
from django.db.models import Sum
import csv
import random

from .models import Transaction
from .serializers import TransactionSerializer
from .filters import TransactionFilter


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        for tx in response.data:
            tx["user_profile"] = f"https://thispersondoesnotexist.com/?random={random.randint(10000, 99999)}"
        return response


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def export_csv(request):
    fields = request.GET.get('fields', '').split(',')
    queryset = Transaction.objects.all()

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=transactions.csv'
    writer = csv.writer(response)
    writer.writerow(fields)

    for tx in queryset:
        writer.writerow([getattr(tx, field, '') for field in fields])

    return response


@api_view(['GET'])
@permission_classes([permissions.AllowAny])  # Use IsAuthenticated if needed
def dashboard_summary(request):
    transactions = Transaction.objects.all()

    revenue = sum(t.amount for t in transactions if t.status.lower() == 'income')
    expenses = sum(t.amount for t in transactions if t.status.lower() == 'expense')
    balance = revenue - expenses
    savings = balance * 0.2  # Example logic

    return Response({
        'balance': round(balance, 2),
        'revenue': round(revenue, 2),
        'expenses': round(expenses, 2),
        'savings': round(savings, 2)
    })


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def monthly_summary(request):
    summary = (
        Transaction.objects
        .annotate(month=TruncMonth('date'))
        .values('month', 'status')
        .annotate(total=Sum('amount'))
        .order_by('month')
    )

    data = {}
    for entry in summary:
        month_str = entry['month'].strftime('%b')  # Example: 'Jan'
        if month_str not in data:
            data[month_str] = {'month': month_str, 'income': 0, 'expense': 0}
        if entry['status'].lower() == 'income':
            data[month_str]['income'] = float(entry['total'])
        elif entry['status'].lower() == 'expense':
            data[month_str]['expense'] = float(entry['total'])

    return Response(list(data.values()))
