from webserver.extensions import db


# Assoication Tables for Many to Many relationships
users_projects = db.Table(
    'users_projects',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'))
)