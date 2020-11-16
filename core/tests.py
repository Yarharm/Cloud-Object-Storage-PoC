from django.test import TestCase

from google.cloud import storage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.cloud import storage

def listTest():
    client = storage.Client()
    for blob in client.list_blobs("soen387gcp"):
        print(str("https://storage.googleapis.com/soen387gcp/"+blob.name))

def uploadTest():
	storage_client = storage.Client()
	bucket = storage_client.bucket("soen387gcp")
	blob = bucket.blob("filename")
	blob.upload_from_filename("../1.png")

uploadTest()

listTest()