from .connection import *
from .projects import *


def init_app():
    # Touch underlying modules
    logger.info('Loading sockets module')
