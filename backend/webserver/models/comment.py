from webserver.extensions import db
from sqlalchemy_utils import Timestamp


MAX_COMMENT_LENGTH = 512


class Comment(db.Model, Timestamp):
    """
    Comment database model
    """

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(MAX_COMMENT_LENGTH), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='comments', lazy=True)

    task_id = db.Column(db.Integer, db.ForeignKey('task.id'))
    task = db.relationship('Task', back_populates='comments', lazy=True)
