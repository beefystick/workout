# Imports
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated

# Import model and serializer for User
from .models import User
from user.serializers import UserSerializer

# Show user self objects to authenticated users
# Superusers can see all users objects
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get']
    serializer_class = UserSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['modified']
    ordering = ['-modified']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)
