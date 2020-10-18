from django.shortcuts import render
from django.http import HttpResponse
from .models import FileUpload
from rest_framework import viewsets
from .serializers import FileUploadSerializer

# Create your views here.
def home(request):
    context = {'files':'placeholder'}
    all_files = FileUpload.objects.all()
    context['files'] = FileUpload.objects.all()

    return render(request, 'base.html', context)

class FileViewSet(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all().order_by('title')
    serializer_class = FileUploadSerializer