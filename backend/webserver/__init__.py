import eventlet
from flask import Flask
from werkzeug.contrib.fixers import ProxyFix
from webserver.config import Config, logger
from webserver.api import api_blueprints


eventlet.monkey_patch()


def create_app():

    flask = Flask(__name__,
                  static_url_path='',
                  static_folder='../dist')

    flask.config.from_object(Config)

    if Config.REVERSE_PROXY_SETUP:
        flask.wsgi_app = ProxyFix(app.wsgi_app)

    from . import extensions
    extensions.init_app(flask)

    from . import models
    models.init_app()

    from . import sockets
    sockets.init_app()

    from . import schema
    schema.init_app()

    extensions.db.create_all(app=flask)

    for blueprint in api_blueprints():
        flask.register_blueprint(blueprint)

    return flask


app = create_app()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return 'hello'
