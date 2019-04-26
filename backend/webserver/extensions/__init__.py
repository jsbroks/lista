# pylint: disable=wrong-import-position,import-error

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import force_auto_coercion, force_instant_defaults

db = SQLAlchemy()
force_auto_coercion()
force_instant_defaults()

from flask_marshmallow import Marshmallow
marshmallow = Marshmallow()

from flask_login import LoginManager
login_manager = LoginManager()

from flask_socketio import SocketIO
socketio = SocketIO()

from flask_cors import CORS
cors = CORS()

from flask_migrate import Migrate
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

