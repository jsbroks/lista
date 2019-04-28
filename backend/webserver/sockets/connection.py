from webserver.extensions import socketio

from flask_login import current_user
from flask_socketio import emit
from webserver.config import logger
from .utils import authenticated_only


@socketio.on('connect')
def connect():
    logger.info(f'{current_user.username} has connected')

    if current_user.is_authenticated:
        current_user.join_project_rooms()


@socketio.on('disconnect')
def disconnect():
    logger.info(f'{current_user.username} has disconnected')
