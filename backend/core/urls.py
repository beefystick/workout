# Imports
from rest_framework.routers import SimpleRouter

# View imports
from core.views import ProfileViewSet, ExerciseViewSet, WorkoutViewSet

# Path
core_router = SimpleRouter()

core_router.register(r'profile', ProfileViewSet, basename='profile')
core_router.register(r'exercises', ExerciseViewSet, basename='exercise')
core_router.register(r'workout', WorkoutViewSet, basename='workout')