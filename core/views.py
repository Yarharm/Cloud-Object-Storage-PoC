from django.shortcuts import render


# Create your views here.
def angular(request):
    '''
    '''
    context = {
        'title':'angular',
    }
    return render(request, 'core/angular.html', context)


