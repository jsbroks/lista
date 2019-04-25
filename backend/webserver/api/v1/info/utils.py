from webserver import Config
from webserver.models import User


class Info(Config):
    """
    Add fields required Config Api model
    """
    def __init__(self):
        self.repository = "github.link"
        self.total_users = User.query.count()
