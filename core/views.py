from cloudstorage.settings import STATIC_URL, AWS_BUCKET_NAME, GCP_BUCKET_NAME
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import boto3
from google.cloud import storage

@csrf_exempt
def aws_post(request):
    file = request.FILES['file']
    file_name = file.name
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(AWS_BUCKET_NAME)
    bucket.put_object(Key=file_name, Body=file)
    url = f'https://{AWS_BUCKET_NAME}.s3.amazonaws.com/{file_name}'
    return JsonResponse({'fileUrl': url})


def gcp_post(request):
	storage_client = storage.Client.from_service_account_json("../soen387-904e0665452.json")
	bucket = storage_client.get_bucket(GCP_BUCKET_NAME)
	file = request.FILES['file']
	file_name=file.name
	blob = bucket.blob(filename)
	blob.upload_from_file()
	url = str("https://storage.googleapis.com/soen387gcp/"+blob.name)
    return JsonResponse({'fileUrl': url})


def gcp_get(request):
    """Uploads a file to the bucket."""
    # bucket_name = "your-bucket-name"
    # source_file_name = "local/path/to/file"
    # destination_blob_name = "storage-object-name"
    client = storage.Client()
    list_holder = []
    for blob in client.list_blobs(GCP_BUCKET_NAME)
        list_holder.append(str("https://storage.googleapis.com/soen387gcp/"+blob.name)))
	return JsonResponse({"urls":list+holder}, sale=False)
