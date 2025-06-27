from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .serializers import UserSerializer
from django.contrib.auth.models import User

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
