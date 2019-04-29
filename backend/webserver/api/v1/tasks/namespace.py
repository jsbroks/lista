from flask_restplus import Namespace, fields


api = Namespace('tasks', description='Task related operations')

task_base = api.model('TaskBase', {
    'name': fields.String,
    'project_id': fields.Integer,
    'priority': fields.Integer(default=None),
    'due_date': fields.DateTime,
    'progress': fields.Float(default=None)
})

task = api.inherit('Task', task_base, {
    'id': fields.Integer,
    'created': fields.DateTime,
    'updated': fields.DateTime,
    'owner_id': fields.Integer
})

task_list = api.model('UserList', {
    'per_page': fields.Integer(example='20'),
    'pages': fields.Integer,
    'total': fields.Integer,
    'has_next': fields.Boolean,
    'has_prev': fields.Boolean,
    'items': fields.List(fields.Nested(task))
})
