# Imports
from rest_framework.routers import SimpleRouter

# View imports
from auth.views import LoginViewSet, RegistrationViewSet, RefreshViewSet, BlacklistTokenViewSet

# Paths
auth_router = SimpleRouter()

auth_router.register(r'auth/login', LoginViewSet, basename='auth-login')
auth_router.register(r'auth/register', RegistrationViewSet, basename='auth-register')
auth_router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')
auth_router.register(r'auth/blacklist', BlacklistTokenViewSet, basename='auth-blacklist')