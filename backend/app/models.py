from django.db import models
from django import forms

# Create your models here.
class FileUpload(models.Model):
    title = models.CharField(max_length=64, default='unnamed_file')
    file = models.FileField(null=True, upload_to='files/')

    def __str__(self):
        return self.title