from django.shortcuts import render, reverse
from django.http import JsonResponse
from django.templatetags.static import static
from tethys_sdk.routing import controller
from .app import MyReactApp as App


@controller
def home(request):
    """Controller for the app home page."""
    return render(request, 'my_react_app/home.html')

@controller
def metadata(request):
    app = App()
    metadata = {
        'title': app.name,
        'description': app.description,
        'tags': app.tags,
        'package': app.package,
        'urlNamespace': app.url_namespace,
        'color': app.color,
        'icon': static(app.icon),
        'exitUrl': '/apps/',
        'rootUrl': reverse(app.index_url),
    }
    return(JsonResponse(metadata))
