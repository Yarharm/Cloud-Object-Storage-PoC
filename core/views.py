from django.shortcuts import render


# Create your views here.
def index(request):
    '''
    '''
    context = {
        'title':'index',
    }
    return render(request, 'core/index.html', context)



def backend(request):
    '''
    '''
    context = {
        'title': 'backend',
    }
    return render(request, 'core/backend.html', context)