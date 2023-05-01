# Imports
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Import user model
from user.models import User

# Admin page to manage users through Django - can edit user details or add new users through fieldsets
class CustomUserAdmin(UserAdmin):
    list_display = ("id", "email", "username", 'is_active', 'is_staff', "created", "modified")
    list_filter = ("is_active", "is_staff", "groups")
    search_fields = ("id", "email", "username")
    filter_horizontal = ("groups", "user_permissions")

    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = ((None, {"classes": ("wide"), "fields": ("email", "password1", "password2")}),)

# Admin site registrations of models
admin.site.register(User, CustomUserAdmin)