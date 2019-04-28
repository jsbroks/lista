# pylint: disable=wrong-import-position,import-error

from flask_migrate import Migrate
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import force_auto_coercion, force_instant_defaults

db = SQLAlchemy()
force_auto_coercion()
force_instant_defaults()

ma = Marshmallow()
login_manager = LoginManager()
socketio = SocketIO()
cors = CORS()
migrate = Migrate(db=db)


def init_app(app):

    extensions = [
        cors,
        db,
        login_manager,
        socketio,
        migrate
        # marshmallow
    ]

    for extension in extensions:
        extension.init_app(app)
