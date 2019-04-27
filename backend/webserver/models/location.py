from webserver.extensions import db


DEFAULT_RADIUS = 5


class Location(db.Model):
    """
    Location database model
    """

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    radius = db.Column(db.Integer, default=DEFAULT_RADIUS, nullable=False)
