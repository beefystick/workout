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
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'equipment', 'target']
    http_method_names = ['get', 'post', 'delete']

    def get_queryset(self):
        queryset = super().get_queryset()
        search_params = self.request.query_params.get('search')
        
        if search_params:
            search_params = search_params.split(',')
            # Create a Q object to combine the filter conditions
            conditions = Q()
            
            # Add individual conditions for each field
            for param in search_params:
                conditions |= Q(name__icontains=param) | Q(equipment__icontains=param) | Q(target__icontains=param)
            
            # Apply the conditions to the queryset
            queryset = queryset.filter(conditions)
            
        return queryset
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        exercise = serializer.save()
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Add a condition to check if the user is the creator of the instance
        if instance.created_by != request.user:
            return Response({"detail": "You do not have permission to delete this exercise."}, status=403)

        self.perform_destroy(instance)
        return Response(status=204)

class WorkoutViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsOwner]
    http_method_names = ['get', 'post', 'delete']
    serializer_class = WorkoutSerializer
    queryset = Workout.objects.all().order_by('-created')

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user.id)