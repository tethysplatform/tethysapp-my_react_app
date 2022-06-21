from tethys_sdk.base import TethysAppBase


class MyReactApp(TethysAppBase):
    """
    Tethys app class for My React App.
    """
    name = 'My React App'
    description = ''
    package = 'my_react_app'  # WARNING: Do not change this value
    index = 'home'
    icon = f'{package}/images/icon.png'
    catch_all = 'home'  # Catch all url mapped to home controller, required for react browser routing
    root_url = 'my-react-app'
    color = ''  # Don't set color here, set it in reactapp/custom-bootstrap.scss
    tags = ''
    enable_feedback = False
    feedback_emails = []
