from flask_restplus import Namespace, fields


api = Namespace('projects', description='Project related operations')

project_base = api.model('ProjectBase', {
    'name': fields.String
})

project = api.inherit('Project', project_base, {
    'id': fields.Integer,
})

project_list = api.model('ProjectList', {
    'per_page': fields.Integer(example='20'),
    'pages': fields.Integer,
    'total': fields.Integer,
    'has_next': fields.Boolean,
    'has_prev': fields.Boolean,
    'items': fields.List(fields.Nested(project))
})