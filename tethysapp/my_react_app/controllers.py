from django.shortcuts import render, reverse
from django.http import JsonResponse
from django.templatetags.static import static
from tethys_sdk.routing import controller
from .app import MyReactApp as App


@controller
def home(request):
    """Controller for the app home page."""
    return render(request, 'my_react_app/index.html')
