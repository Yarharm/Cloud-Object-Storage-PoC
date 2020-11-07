from django.db import models

# Create your models here.
from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class URLLink(models.Model):
    fileName = models.CharField(max_length=256)
    upload_date = models.DateTimeField(auto_now_add=True)
    read_time = models.ImageField(max_length=20, null=True)

    def __str__(self):
        return self.title

    def get_title(self):
        return '-'.join(self.title.lower().split(' '))
