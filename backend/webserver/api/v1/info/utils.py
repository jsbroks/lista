from webserver import Config
from webserver.models import User

from flask_login import current_user


class Info(Config):
    """
    Add fields required Config Api model
    """

    def __init__(self):
        self.repository = "github.link"
        self.total_users = User.query.count()
        self.user = current_user if current_user.is_authenticated else None
