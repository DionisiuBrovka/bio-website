from django.shortcuts import render

def index_page_handler(request):
    return render(request, 'pages/main/index.html')