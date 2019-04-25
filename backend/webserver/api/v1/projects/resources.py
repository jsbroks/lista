from flask_restplus import Resource, marshal, abort
from flask_login import (
    login_user,
    login_required,
    logout_user,
    current_user
)

from webserver.api import commit_or_abort, profile
from webserver.models import db, Project
from webserver import logger

from .namespace import (
    api,
    project,
    project_base,
    project_list
)


@api.route('/')
class Projects(Resource):
    
    @login_required
    @api.marshal_with(project_list)
    def get(self):
        """ Returns a list of users projects """
        return current_user.projects.paginate(1, per_page=100, max_per_page=500)

    @login_required
    @api.expect(project_base)
    @api.marshal_with(project)
    def post(self):
        """ Creates new project """
        args = api.payload

        with commit_or_abort(error_message='Operation failed. Could not create project.'):
            project_model = Project(**args)
            current_user.projects.append(project_model)
            db.session.add(project_model)

        return project_model


@api.route('/<int:project_id>')
class ProjectId(Resource):

    @login_required
    @api.marshal_with(project)
    def get(self, project_id):
        """ Gets projects """
        return False
    
    @login_required
    @api.marshal_with(project)
    def put(self, project_id):
        """ Updates projects """
        return False


    @login_required
    @api.marshal_with(project)
    def delete(self, project_id):
        """ Deletes projects """
        return False
