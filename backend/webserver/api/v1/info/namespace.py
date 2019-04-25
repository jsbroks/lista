from flask_restplus import Namespace, fields


api = Namespace('info', description='Software related operations')

config = api.model('Config', {
    'name': fields.String(attribute='NAME'),
    'version': fields.String(attribute='VERSION'),
    'repository': fields.String,
    'total_users': fields.Integer
})
