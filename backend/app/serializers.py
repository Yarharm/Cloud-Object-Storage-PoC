from rest_framework import serializers
from .models import FileUpload

class FileUploadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FileUpload
        fields = ('id', 'title', 'file')