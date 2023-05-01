# Imports
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.functional import classproperty

# Import models
from common.models import IndexedTimeStampedModel
from user.models import User

# Create OneToOne instance of profile upon [FK] User creation 
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# Profile model
class Profile(models.Model):
    WEIGHT_SYSTEMS = (
        ('kg', 'kg'),
        ('lbs', 'lbs'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    weight_system = models.CharField(max_length=6, choices=WEIGHT_SYSTEMS, default=WEIGHT_SYSTEMS[0][0])

    def __str__(self):
        return f"Profile(user={self.user.username}, weight_system={self.weight_system})"

# Workout model to log workout and when it is started, finished with [FK] User
class Workout(IndexedTimeStampedModel):
    STATUSES = (
        ('Started', 'Started'),
        ('Finished', 'Finished'),
    )

    user = models.ForeignKey(User, related_name="workouts", on_delete=models.CASCADE)
    status = models.CharField(max_length=8, choices=STATUSES, default=STATUSES[0][0])

    def __str__(self):
        return f"Workout(user={self.user.username}, created={self.created})"

# Excercise model - [FK] User
class Exercise(models.Model):
    BODY_PARTS = (
        ('abdominals', 'Abdominals'),
        ('biceps', 'Biceps'),
        ('calves', 'Calves'),
        ('chest', 'Chest'),
        ('deltoids_front', 'Deltoids (Front)'),
        ('deltoids_middle', 'Deltoids (Middle)'),
        ('deltoids_rear', 'Deltoids (Rear)'),
        ('forearms', 'Forearms'),
        ('glutes', 'Glutes'),
        ('hamstrings', 'Hamstrings'),
        ('lats', 'Lats'),
        ('quadriceps', 'Quadriceps'),
        ('rhomboids', 'Rhomboids'),
        ('spinal_erectors', 'Spinal Erectors'),
        ('trapezius', 'Trapezius'),
        ('triceps', 'Triceps'),
        ('other', 'Other'),
    )

    EQUIPMENT = (
        ('barbell', 'Barbell'),
        ('bands', 'Bands'),
        ('bodyweight', 'Bodyweight'),
        ('cable', 'Cable'),
        ('cardio', 'Cardio'),
        ('dumbbell', 'Dumbbell'),
        ('kettlebell', 'Kettlebell'),
        ('machine', 'Machine'),
        ('other', 'Other'),
    )
    
    body_part = models.CharField(max_length=16, choices=BODY_PARTS) # Add ability to select multiple body parts
    equipment = models.CharField(max_length=16, choices=EQUIPMENT) # Add ability to select multiple equipments
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=512, blank=True, null=True)
    user = models.ForeignKey(User, related_name="exercises", on_delete=models.CASCADE, blank=True, null=True)

    @classproperty
    def body_part_list(self):
        return [item[0] for item in self.BODY_PARTS]

    @classproperty
    def equipment_list(self):
        return [item[0] for item in self.EQUIPMENT]

    # Must be removed when adding ability for multiple choices - 
    class Meta:
        unique_together = ('body_part', 'equipment', 'name')

    def __str__(self):
        return f"Exercise(body_part={self.body_part}, equipment={self.equipment}, name={self.name}, user={self.user}')"

# Model for adding exercises done in the workout of the TimeIndex with [FK] Workout and [FK] Exercise
class WorkoutExercise(models.Model):
    workout = models.ForeignKey(Workout,
                                related_name="workout_exercises",
                                on_delete=models.CASCADE
    )

    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)

    def __str__(self):
        return f"WorkoutExercise(workout={self.workout.user.username}, exercise={self.exercise.name})"

# Model for the details of the exercise done in a particular workout with [FK] WorkoutExercise
class WorkoutExerciseDetail(models.Model):
    workout_exercise = models.ForeignKey(WorkoutExercise,
                                        related_name="workout_exercise_details",
                                        on_delete=models.CASCADE
    )

    sets = models.PositiveIntegerField()
    reps = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()

    def __str__(self):
        return f"WorkoutExerciseDetail(workout_exercise={self.workout_exercise.exercise.name}, " \
               f"sets={self.sets}, reps={self.reps}, weight={self.weight})"
