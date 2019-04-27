from webserver.extensions import db
from .helper_tables import users_projects
from sqlalchemy_utils import Timestamp


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
