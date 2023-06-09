# Generated by Django 4.0.4 on 2023-05-21 12:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='reps',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='sets',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='user',
        ),
        migrations.RemoveField(
            model_name='exercise',
            name='weight',
        ),
        migrations.AddField(
            model_name='exercise',
            name='workout',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='exercises', to='core.workout'),
        ),
    ]
