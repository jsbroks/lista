
from .location import *
from .comment import *
from .project import *
from .user import *
from .task import *

from webserver.config import logger


def init_app():
    # Touch underlying modules
    logger.info(f'Loading database models')
