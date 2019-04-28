import functools

from flask_login import current_user
from flask_socketio import disconnect


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
