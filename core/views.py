from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import boto3

@csrf_exempt
def aws_post(request):
    file = request.FILES['file']
    file_name = file.name
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('presentation-387')
    bucket.put_object(Key=file_name, Body=file)
    url = f'https://presentation-387.s3.amazonaws.com/{file_name}'
    return JsonResponse({'fileUrl': url})


def health(request):
    return JsonResponse({'health': 'Django is healthy'})
