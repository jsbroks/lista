from webserver.extensions import db, socketio

from flask_login import current_user
from flask_socketio import emit
from webserver.config import logger

from .utils import authenticated_only, commit_or_null


@socketio.on('join project')
@authenticated_only
def join_project(id):
    """
    Join a project (if user has access). Joining a projects room allows for user
    to get realtime updates
    """

    project_id = int(id)
    project = current_user.projects.filter_by(id=project_id).first()

    if project:
        logger.debug(
            f'{current_user.username} has joined room {project.name} ({project.id})')
        project.join_room()

    return project is not None


@socketio.on('leave project')
def leave_prject():
    pass
