from django.db import models

# Create your models here.
class Transaction(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20)
    category = models.CharField(max_length=50)
    user_id = models.CharField(max_length=100)
    user_profile = models.URLField()  

    def __str__(self):
        return f"{self.name} - {self.amount}"