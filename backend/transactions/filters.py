import django_filters
from .models import Transaction

class TransactionFilter(django_filters.FilterSet):
    date = django_filters.DateFromToRangeFilter()
    amount = django_filters.RangeFilter()

    class Meta:
        model = Transaction
        fields = ['status', 'category', 'date', 'amount']
