from flask_restplus import Resource, marshal, abort
from flask_login import (
    login_required,
    current_user,
    login_user
)

from webserver.api import commit_or_abort, admin_login_required
from webserver.models import db, User
from webserver import logger

from .namespace import (
    api,
    user,
    user_list,
    credential,
    registration
)


@api.route('/login')
class Login(Resource):

    @api.marshal_with(user)
    @api.expect(credential)
    def post(self):

        args = api.payload
        found = User.login(**args)
        if not found:
            abort(code=400, message='Invalid username or password')

        return found


@api.route('/logout')
class Logout(Resource):
    def get(self):
        User.logout()
        return {'success': True}


@api.route('/register')
class Register(Resource):
    @api.expect(registration)
    @api.marshal_with(user)
    def post(self):
        args = api.payload

        with commit_or_abort(error_message='Operation failed. Could not create user.'):
            user_model = User(**args)
            db.session.add(user_model)

        return user_model


@api.route('/')
class Users(Resource):
    @login_required
    @api.marshal_with(user_list)
    def get(self):
        return User.query.paginate(1, per_page=100, max_per_page=500)


@api.route('/<int:user_id>')
class UserId(Resource):
    @api.marshal_with(user)
    @admin_login_required
    def get(self, user_id):
        """ Returns information of the user """
        return User.query.get_or_404(user_id)

    @admin_login_required
    @api.marshal_with(user)
    def put(self, user_id):
        """ Updates user """
        return User.query.get_or_404(user_id)

    @admin_login_required
    @api.marshal_with(user)
    def delete(self, user_id):
        """ Deletes user """
        return User.query.get_or_404(user_id)


@api.route('/<int:user_id>/login')
class UserIdLogin(Resource):

    @admin_login_required
    @api.marshal_with(user)
    def post(self, user_id):
        """ Login as a specific user """
        user_model = User.query.get_or_404(user_id)
        login_user(user_model)
        return user_model


@api.route('/me')
class UsersMe(Resource):
    @login_required
    @api.marshal_with(user)
    def get(self):
        """ Returns current user """
        return User.query.get(current_user.id)

    @login_required
    @api.marshal_with(user)
    def put(self):
        """ Updates current user """
        return User.query.get(current_user.id)

    @login_required
    @api.marshal_with(user)
    def delete(self):
        """ Deletes current user """
        return User.query.get(current_user.id)
