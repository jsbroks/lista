from webserver.extensions import ma
from webserver.models import Task


class TaskSchema(ma.ModelSchema):
    class Meta:
        model = Task
        exclude = ('project', 'comments')
