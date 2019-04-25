from webserver.extensions import db, login_manager
from .helper_tables import users_projects

from sqlalchemy import func
from sqlalchemy_utils import Timestamp
from sqlalchemy_utils.types.password import PasswordType

from flask_login import UserMixin
from .task import Task
from .project import Project

MAX_USERNAME_LENGTH = 80


class User(db.Model, Timestamp, UserMixin):
    """
    User database model
    """
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(length=MAX_USERNAME_LENGTH), unique=True, nullable=False)
    password = db.Column(
        PasswordType(
            max_length=128,
            schemes=('bcrypt', )
        ),
        nullable=False
    )
    
    # email = db.Column(db.String(length=120), unique=True, nullable=False)
    first_name = db.Column(db.String(length=30), default='', nullable=False)
    last_name = db.Column(db.String(length=30), default='', nullable=False)

    is_online = db.Column(db.Boolean(), default=False, nullable=False)
    is_admin = db.Column(db.Boolean(), default=False, nullable=False)

    projects = db.relationship(
        'Project',
        secondary=users_projects,
        lazy='dynamic',
        back_populates='users'
    )

    @classmethod
    def find_with_password(cls, username, password):
        user = cls.query.filter(func.lower(User.username) == func.lower(username)).first()
        if not user:
            return None
        return user if user.password == password else None
    
    @property
    def tasks(self):
        return Task.query.join(Task.project)\
                .filter(Project.users.any(User.id == self.id))


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@login_manager.unauthorized_handler
def unauthorized():
    return {'message': 'Authorization required'}, 401