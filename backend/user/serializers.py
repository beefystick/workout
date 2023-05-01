# Imports
from rest_framework import serializers

# Import user model to use in serializer
from user.models import User

# Serialize user instance upon creation
class UserSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(read_only=True)
    modified = serializers.DateTimeField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'created', 'modified']