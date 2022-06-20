from django.shortcuts import render
from django.http import JsonResponse
import plotly.graph_objects as go
import plotly.io as pio
import pandas as pd

from tethys_sdk.routing import controller


@controller
def home(request):
    """Controller for the app home page."""
    # The index.html template loads the React frontend
    return render(request, 'my_react_app/index.html')

@controller
def data(request):
    """API controller for the plot page."""
    # Download example data from GitHub
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
    
    # Do data processing in Python 
    l_date = df['Date'].tolist()
    
    # Then return JSON containing data
    return JsonResponse({
        'series': [
            {
                'title': 'AAPL High',
                'x': l_date,
                'y': df['AAPL.High'].tolist()
            },
            {
                'title': 'AAPL Low',
                'x': l_date,
                'y': df['AAPL.Low'].tolist()
            }
        ],
    })
