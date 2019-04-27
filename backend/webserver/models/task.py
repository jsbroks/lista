from webserver.extensions import db
from .helper_tables import users_projects
from sqlalchemy_utils import Timestamp


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
