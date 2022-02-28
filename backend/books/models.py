from django.db import models

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=300)
    publication_year = models.PositiveIntegerField(null=True)
    pages = models.PositiveSmallIntegerField(null=True)
    author = models.CharField(max_length=300, blank=True)
