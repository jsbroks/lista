from flask_restplus import Resource
from webserver.config import Config

from .namespace import api, config
from .utils import Info


@api.route('/')
class Information(Resource):

    @api.marshal_with(config)
    def get(self):
        """ Returns information about application instance """
        return Info()
