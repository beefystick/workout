# Imports
from django.db import models
from model_utils.fields import AutoCreatedField, AutoLastModifiedField

# Model that automatically sets created and 
# last modified field values for any model instance
class IndexedTimeStampedModel(models.Model):
    created = AutoCreatedField("created", db_index=True)
    modified = AutoLastModifiedField("modified", db_index=True)

    class Meta:
        abstract = True