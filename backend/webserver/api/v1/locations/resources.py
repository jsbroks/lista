from flask_restplus import Resource, marshal, abort
from flask_login import login_required, current_user

from webserver.api import commit_or_abort, profile
from webserver.models import db, Project
from webserver import logger

from .namespace import (
    api,
    location,
    location_base,
    location_list
)


@api.route('/')
class Location(Resource):

    @login_required
    @api.marshal_with(location_list)
    def get(self):
        """ Returns a list of users locations """
        return {}
