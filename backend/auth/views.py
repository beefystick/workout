# Imports
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView, TokenBlacklistView

# Import authentication serializers
from auth.serializers import LoginSerializer, RegisterSerializer

# User registration - send token
class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    permission_classes = [AllowAny]
    http_method_names = ['post']
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        res = {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": serializer.data,
        }

        return Response(res, status=status.HTTP_201_CREATED)

# User can login - send token
class LoginViewSet(ModelViewSet, TokenObtainPairView):
    permission_classes = [AllowAny]
    http_method_names = ['post']
    serializer_class = LoginSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

# Make sure after user can obtain new access token when previous one expired
class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

# Make sure when user logout token becomes invalid
class BlacklistTokenViewSet(viewsets.ViewSet, TokenBlacklistView):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_205_RESET_CONTENT)
