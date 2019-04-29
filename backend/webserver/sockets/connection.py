from webserver.extensions import socketio

from flask_login import current_user
from flask_socketio import emit
from webserver.config import logger
from .utils import authenticated_only


@socketio.on('connect')
@authenticated_only
def connect():
    """
    Intial connection call when client connects to SocketIO
    """
    logger.info(f'{current_user.username} has connected')
    current_user.join_project_rooms()


@socketio.on('disconnect')
@authenticated_only
def disconnect():
    """
    Call when client disconnects from SocketIO
    """
    logger.info(f'{current_user.username} has disconnected')
