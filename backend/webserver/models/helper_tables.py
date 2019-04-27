from webserver.extensions import db


# Assoication Tables for Many to Many relationships
users_projects = db.Table(
    'users_projects',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'))
)

task_locations = db.Table(
    'task_locations',
    db.Column('location_id', db.Integer, db.ForeignKey('task.id')),
    db.Column('task_id', db.Integer, db.ForeignKey('location.id'))
)
