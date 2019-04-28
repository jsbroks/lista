from webserver.config import logger

from .tasks import *


def init_app():
    # Touch underlying modules
    logger.info('Loading schema module')
