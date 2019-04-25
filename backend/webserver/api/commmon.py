
import time
import logging

from contextlib import contextmanager

from webserver.extensions import db
from webserver import logger

from flask_login import login_required, current_user
from sqlalchemy.exc import IntegrityError
from flask_restplus import abort, Model


def profile(func):

    def wrap(*args, **kwargs):
        started_at = time.time()
        result = func(*args, **kwargs)
        diff = time.time() - started_at

        if isinstance(result, dict):
            result['time_ms'] = int(diff * 1000)

        return result

    return wrap


def admin_login_required(func):

    @login_required
    def wrap(*args, **kwargs):
        if current_user.is_admin:
            return func(*args, **kwargs)
        
        abort(code=401, message='Administrator permissions required.')
    
    return wrap


@contextmanager
def commit_or_abort(error_message="Operation failed to complete", session=None):
    if not session:
        session = db.session
    
    try:
        yield
        session.commit()
    except ValueError as exception:
        logger.info("Database transaction was rolled back due to: %r", exception)
        abort(code=409, message=str(exception))
    except IntegrityError as exception:
        logger.error("Database transaction was rolled back due to: %r", exception)
        session.rollback() 
        abort(code=409, message=error_message)
        