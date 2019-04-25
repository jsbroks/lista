from flask_restplus import Resource, marshal, abort
from flask_login import login_required, current_user

from webserver.api import commit_or_abort
from webserver.models import db, Task, Project, User
from webserver import logger

from .namespace import (
    api,
    task,
    task_base,
    task_list
)


@api.route('/')
class Projects(Resource):
    @login_required
    @api.marshal_with(task_list)
    def get(self):
        """ Returns a list of users tasks """
        return current_user.tasks.paginate(1, per_page=100, max_per_page=500)
    
    @login_required
    @api.expect(task_base)
    @api.marshal_with(task)
    def post(self):
        """ Creates a new task """
        args = api.payload

        with commit_or_abort(error_message='Operation failed. Could not create task.'):
            task_model = Task(**args)
            db.session.add(task_model)

        return task_model


@api.route('/<int:task_id>')
class TaskId(Resource):
    @login_required
    @api.marshal_with(task)
    def get(self, task_id):
        """ Gets task """
        return False
    
    @login_required
    @api.marshal_with(task)
    def put(self, project_id):
        """ Updates task """
        return False

    @login_required
    @api.marshal_with(task)
    def delete(self, task_id):
        """ Deletes task """
        return False
