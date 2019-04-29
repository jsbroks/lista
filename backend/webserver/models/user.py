from webserver.extensions import db, login_manager
from webserver.config import logger

from sqlalchemy import func
from sqlalchemy_utils import Timestamp
from sqlalchemy_utils.types.password import PasswordType

from flask_login import (
    UserMixin,
    AnonymousUserMixin,
    login_user,
    current_user,
    logout_user
)

from .helper_tables import users_projects
from .project import Project
from .task import Task

MAX_USERNAME_LENGTH = 80


class User(db.Model, Timestamp, UserMixin):
    """
    User database model with user authentication mixin
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(
        db.String(length=MAX_USERNAME_LENGTH), unique=True, nullable=False)
    password = db.Column(
        PasswordType(max_length=128, schemes=('bcrypt', )), nullable=False)

    # email = db.Column(db.String(length=120), unique=True, nullable=False)
    first_name = db.Column(db.String(length=30), default='', nullable=False)
    last_name = db.Column(db.String(length=30), default='', nullable=False)

    is_online = db.Column(db.Boolean(), default=False, nullable=False)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)

    settings = db.relationship('UserSettings', lazy=True, uselist=False)
    projects = db.relationship(
        'Project', secondary=users_projects, lazy='dynamic', back_populates='users')
    comments = db.relationship(
        'Comment', lazy='dynamic', back_populates='user')

    @classmethod
    def login(cls, username, password, remember=True):
        """
        Attempts to login in a user with provided credentials
        """
        found = cls.find_with_password(username, password)
        if not found:
            logger.warning(f'Failed login attempt with username {username}')
            return None

        login_user(found, remember=remember)
        logger.info(f'{found.username} successfully logged in')
        return found

    @classmethod
    def find_with_password(cls, username, password):
        user = cls.query\
            .filter(func.lower(User.username) == func.lower(username))\
            .first()
        if not user:
            return None
        return user if user.password == password else None

    @staticmethod
    def logout():
        """
        Logout current user
        """
        if current_user.is_authenticated:
            logout_user()
            logger.info(f'{current_user.username} has logout')
        return True

    @property
    def tasks(self):
        return Task.query.join(Task.project)\
            .filter(Project.users.any(User.id == self.id))

    @property
    def created_tasks(self):
        return Task.query.filter_by(owner_id=self.id)

    @property
    def assigned_tasks(self):
        return Task.query.filter_by(assignee_id=self.id)

    def join_project_rooms(self):
        for project in self.projects:
            project.join_room()

    def leave_project_rooms(self):
        for project in self.projects:
            project.leave_room()


class UserSettings(db.Model):
    """
    User Setting database model
    """
    id = db.Column(db.Integer, primary_key=True)
    primary_color = db.Column(db.String(10))
    secondary_color = db.Column(db.String(10))

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class AnonymousUser(AnonymousUserMixin):
    @property
    def username(self):
        return 'anonymous user'


login_manager.anonymous_user = AnonymousUser


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    return {'message': 'Authorization required'}, 401
