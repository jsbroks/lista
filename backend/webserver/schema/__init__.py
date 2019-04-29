from webserver.config import logger

from webserver.extensions import ma
from webserver.models import *


class ProjectSchema(ma.ModelSchema):
    class Meta:
        model = Project


class TaskSchema(ma.ModelSchema):
    class Meta:
        model = Task
        exclude = ('project', 'comments')


def init_app():
    # Touch underlying modules
    logger.info('Loading schema module')
