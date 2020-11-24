from cloudstorage.settings import STATIC_URL, AWS_BUCKET_NAME, GCP_BUCKET_NAME
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import boto3
from google.cloud import storage
import random
from tenacity import retry, wait, wait_fixed

@csrf_exempt
def aws_post(request):
    file = request.FILES['file']
    file_name = file.name
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(AWS_BUCKET_NAME)
    bucket.put_object(Key=file_name, Body=file)
    url = f'https://{AWS_BUCKET_NAME}.s3.amazonaws.com/{file_name}'
    return JsonResponse({'fileUrl': url})

@csrf_exempt
@retry(wait=wait_fixed(3))
def gcp_post(request):
    file = request.FILES['file']
    file_name = file.name
    storage_client = storage.Client()
    bucket = storage_client.bucket(GCP_BUCKET_NAME)
    #what the file will be named in the bucket
    blob = bucket.blob(file_name)
    #use and file here
    blob.upload_from_filename(file_name)
    url = f'https://storage.googleapis.com/{GCP_BUCKET_NAME}/{file_name}'
    return JsonResponse({"fileUrl":url})


@csrf_exempt
def gcp_get(request):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"
    client = storage.Client()
    list_holder = []
    for blob in client.list_blobs(GCP_BUCKET_NAME):
        list_holder.append(str("https://storage.googleapis.com/soen387gcp/"+blob.name))
    
    return JsonResponse({"urls":list_holder}, safe=False)