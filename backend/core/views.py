# Imports
from django.db.models import Q
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.response import Response
import requests
from .workoutdata import EXERCISES

# Import models, permissions and serializers
from core.models import Exercise, Workout, Profile
from core.permissions import IsOwner
from core.serializers import ExerciseSerializer, WorkoutSerializer, ProfileSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwner]
    http_method_names = ['get', 'post']
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user.id)

class ExerciseViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = ExerciseSerializer
    queryset = Exercise.objects.all()
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # Include the entire list of exercises
        response_data = EXERCISES
        return Response(response_data)

class WorkoutViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated, IsOwner]
    http_method_names = ['get', 'post', 'delete']
    serializer_class = WorkoutSerializer
    queryset = Workout.objects.all().order_by('-created')
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user.id)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)