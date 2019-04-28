from webserver.extensions import db, socketio, ma
from webserver.config import logger

from flask_restplus import marshal
from sqlalchemy_utils import Timestamp

from .helper_tables import users_projects


class Task(db.Model, Timestamp):
    """
    Task database model
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    progress = db.Column(db.Float)
    duration = db.Column(db.Integer)
    priority = db.Column(db.Integer)
    due_date = db.Column(db.DateTime)
    completed = db.Column(db.DateTime)

    # User references
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    assigner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    project_id = db.Column(db.Integer, db.ForeignKey(
        'project.id'), nullable=False)

    owner = db.relationship('User', lazy=True, foreign_keys=[owner_id])
    assignee = db.relationship('User', lazy=True, foreign_keys=[assignee_id])
    assigner = db.relationship('User', lazy=True, foreign_keys=[assigner_id])
    project = db.relationship('Project', back_populates='tasks', lazy=True)
    comments = db.relationship(
        'Comment', back_populates='task', lazy='dynamic')

    def emit_create(self):
        room = self.project.room_id
        logger.debug(f'Task creatation emited to room {room}')

        from webserver.schema import TaskSchema
        socketio.emit('task_create', TaskSchema().dump(self), room=room)

    def emit_delete(self):
        room = self.project.room_id
        logger.debug(f'Task deletion emited to room {room}')

        from webserver.schema import TaskSchema
        socketio.emit('task_delete', TaskSchema().dump(self), room=room)
