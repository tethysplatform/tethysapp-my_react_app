from tethys_sdk.base import TethysAppBase, url_map_maker


class MyReactApp(TethysAppBase):
    """
    Tethys app class for My React App.
    """

    name = 'My React App'
    description = ''
    package = 'my_react_app'  # WARNING: Do not change this value
    index = 'home'
    icon = f'{package}/images/icon.png'
    root_url = 'my-react-app'
    color = '#c0392b'
    tags = ''
    enable_feedback = False
    feedback_emails = []