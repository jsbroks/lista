from flask_restplus import Namespace, fields


api = Namespace('locations', description='Location related operations')

location_base = api.model('LocationBase', {
    'name': fields.String,
    'latitude': fields.Float,
    'longitude': fields.Float,
    'radius': fields.Float
})

location = api.inherit('Location', location_base, {
    'id': fields.Integer,
})

location_list = api.model('LocationList', {
    'per_page': fields.Integer,
    'pages': fields.Integer,
    'total': fields.Integer,
    'has_next': fields.Boolean,
    'has_prev': fields.Boolean,
    'items': fields.List(fields.Nested(location))
})
