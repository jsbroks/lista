from webserver.extensions import db
from .helper_tables import users_projects
from sqlalchemy_utils import Timestamp

class Task(db.Model, Timestamp):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    progress = db.Column(db.Float)
    duration = db.Column(db.Integer)
    priority = db.Column(db.Integer)
    due_date = db.Column(db.DateTime)
    completed = db.Column(db.DateTime)

    # User references
    # owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # owner = db.relationship('User', lazy=True)
    # assigned_to_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # assigned_to = db.relationship('User', lazy=True)
    # assigned_by_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # assigned_by = db.relationship('User', lazy=True)

    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    project = db.relationship('Project', back_populates='tasks', lazy=True)
