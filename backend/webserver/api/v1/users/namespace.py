from flask_restplus import Namespace, fields


api = Namespace('users', description='Users related operations')

credential = api.model('Credential', {
    'username': fields.String,
    'password': fields.String,
    'remember': fields.Boolean(default=True)
})

base_user = api.model('BaseUser', {
    'first_name': fields.String(example='Jimmy', description='Users first name', default=''),
    'last_name': fields.String(example='Smith', description='Users last name', default=''),
    'username': fields.String(example='jsmith', description='Identification string')
})

registration = api.inherit('Registration', base_user, {
    'password': fields.String(example='jimsmith123', description='Authentication string')
})

user = api.inherit('User', base_user, {
    'id': fields.Integer(),
    'created': fields.DateTime(),
    'updated': fields.DateTime(),
    'is_admin': fields.Boolean
}) 

user_list = api.model('UserList', {
    'per_page': fields.Integer(example='20'),
    'pages': fields.Integer(),
    'total': fields.Integer(),
    'has_next': fields.Boolean(),
    'has_prev': fields.Boolean(),
    'items': fields.List(fields.Nested(user))
})
