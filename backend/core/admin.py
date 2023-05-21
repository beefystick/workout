# Imports
from django.contrib import admin
from core.models import Profile, Exercise, Workout, WorkoutExercise, WorkoutExerciseDetail

# Admin models to be able to view user profile
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'weight_system')

# Admin models to be able to view user exercises
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name', 'bodyPart', 'target', 'equipment', 'id')

# Admin models to be able to view user workouts
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created', 'modified')

# Admin models to be able to view user workoutexercise
class WorkoutExerciseAdmin(admin.ModelAdmin):
    list_display = ('id', 'workout', 'exercise')

# Admin models to be able to view user workoutexercisedetail
class WorkoutExerciseDetailAdmin(admin.ModelAdmin):
    list_display = ('id', 'workout_exercise', 'sets', 'reps', 'weight')

# Admin site registrations
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Exercise, ExerciseAdmin)
admin.site.register(Workout, WorkoutAdmin)
admin.site.register(WorkoutExercise, WorkoutExerciseAdmin)
admin.site.register(WorkoutExerciseDetail, WorkoutExerciseDetailAdmin)
