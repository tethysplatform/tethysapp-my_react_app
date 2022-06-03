from django.shortcuts import render
from tethys_sdk.routing import controller


@controller
def home(request):
    """Controller for the app home page."""
    return render(request, 'my_react_app/index.html')
