# Imports
from rest_framework import serializers

# Import models for serialization
from core.models import Profile, Exercise, Workout, WorkoutExercise, WorkoutExerciseDetail
from .workoutdata import EXERCISES

# DO NOT CHANGE ORDER OF SERIALIZERS DUE TO DEPENDENCIES FROM LAST 3

# Serializer to send User profile data in JSON & create user profile
class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    created = serializers.DateTimeField(source='user.created', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'username', 'email', 'weight_system', 'created']

    def create(self, validated_data):
        request_user = self.context['request'].user
        instance = Profile.objects.get(user=request_user)
        instance.weight_system = validated_data.get("weight_system")
        instance.save()
        return instance

# Serializer to send Exercise data or create new Exercise
class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'
        read_only_fields = ['id', 'bodyPart', 'equipment', 'gifUrl', 'name', 'target']

# Serializer for WorkoutExerciseDetail
class WorkoutExerciseDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutExerciseDetail
        fields = ['id', 'sets', 'reps', 'weight']

# Serializer for WorkoutExercise
class WorkoutExerciseSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    workout_exercise_details = WorkoutExerciseDetailSerializer(many=True, required=False)
    exercise = serializers.CharField()

    class Meta:
        model = WorkoutExercise
        fields = ['id', 'exercise', 'name', 'workout_exercise_details']

    def get_name(self, obj):
        # Search for the exercise id in the EXERCISES list and return its name
        exercise = next((exercise for exercise in EXERCISES if exercise['id'] == obj.exercise), None)
        return exercise['name'] if exercise else None


# Serializer for Workouts
class WorkoutSerializer(serializers.ModelSerializer):
    workout_exercises = WorkoutExerciseSerializer(many=True, required=False)

    class Meta:
        model = Workout
        fields = ['id', 'status', 'created', 'modified', 'workout_exercises']

    def create(self, validated_data):
        workout_exercises_data = validated_data.pop('workout_exercises')
        workout = Workout.objects.create(**validated_data)
        for workout_exercise_data in workout_exercises_data:
            workout_exercise_details_data = workout_exercise_data.pop('workout_exercise_details')
            workout_exercise = WorkoutExercise.objects.create(workout=workout, **workout_exercise_data)
            for workout_exercise_detail_data in workout_exercise_details_data:
                WorkoutExerciseDetail.objects.create(workout_exercise=workout_exercise, **workout_exercise_detail_data)
        return workout
    
    def to_representation(self, instance):
        # Get the base representation
        data = super().to_representation(instance)

        # Add the exercise details from the EXERCISES list
        for workout_exercise in instance.workout_exercises.all():
            exercise = next((exercise for exercise in EXERCISES if exercise['id'] == workout_exercise.exercise), None)
            if exercise is not None:
                data['workout_exercises'].append(exercise)

        return data

