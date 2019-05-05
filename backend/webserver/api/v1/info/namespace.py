from flask_restplus import Namespace, fields


api = Namespace('info', description='Software related operations')

user = api.model('User', {
    'id': fields.Integer,
    'username': fields.String,
    'first_name': fields.String,
    'last_name': fields.String,
    'is_admin': fields.Boolean
})


config = api.model('Config', {
    'name': fields.String(attribute='NAME'),
    'version': fields.String(attribute='VERSION'),
    'repository': fields.String,
    'total_users': fields.Integer,
    'user': fields.Nested(user, skip_none=True),
})
