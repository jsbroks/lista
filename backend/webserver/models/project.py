from webserver.extensions import db
from webserver.config import logger

from flask_login import current_user
from flask_socketio import join_room, leave_room
from sqlalchemy_utils import Timestamp
from .helper_tables import users_projects


class Project(db.Model, Timestamp):
    """
    Project database model
    """

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(256), default='')
    color = db.Column(db.String(10))
    archived = db.Column(db.Boolean, default=False)

    users = db.relationship('User', secondary=users_projects,
                            lazy='dynamic', back_populates='projects')
    tasks = db.relationship('Task', back_populates='project', lazy='dynamic')

    @property
    def room_id(self):
        return f'{self.id}_{self.name}'

    def join_room(self):
        join_room(self.room_id)
        logger.debug(
            f'{current_user.username} has joined room {self.name} ({self.id})')

    def leave_room(self):
        leave_room(self.room_id)
        logger.debug(
            f'{current_user.username} has left room {self.name} ({self.id})')

    def emit_create(self):
        room = self.room_id
        logger.debug(f'Project creatation emited {self.name}')

        # from webserver.schema import ProjectSchema
        # socketio.emit('project_created', TaskSchema().dump(self), room=room)

    def emit_delete(self):
        room = self.room_id
        logger.debug(f'Project deletion emited {self.name} ')

        # from webserver.schema import TaskSchema
        # socketio.emit('project_delete', TaskSchema().dump(self), room=room)
