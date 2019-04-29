import functools
from contextlib import contextmanager

from webserver.extensions import db
from webserver.config import logger

from sqlalchemy.exc import IntegrityError
from flask_socketio import disconnect
from flask_login import current_user


def authenticated_only(f):
    """
    SocketIO authenication decorator that disconnects non-authenticated 
    """
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if current_user.is_authenticated:
            return f(*args, **kwargs)
        else:
            disconnect()
    return wrapped


@contextmanager
def commit_or_null(session=None):
    if not session:
        session = db.session

    try:
        yield
        session.commit()
    except ValueError as exception:
        logger.info(
            "Database transaction was rolled back due to: %r", exception)

    except IntegrityError as exception:
        logger.error(
            "Database transaction was rolled back due to: %r", exception)
