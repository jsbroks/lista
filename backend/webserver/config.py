import os
import logging


logger = logging.getLogger('gunicorn.error')


class Config:
    NAME = os.getenv('NAME', 'Lista')
    VERSION = os.getenv('VERSION', '0.0-alpha')

    LOG_LEVEL = 'debug'
    SWAGGER_UI_JSONEDITOR = True

    DEBUG = os.getenv('DEBUG', False)
    TESTING = os.getenv('TESTING', True)
    SECRET_KEY = os.getenv('SECRET_KEY', '<-- SECERT KEY -->')

    REVERSE_PROXY_SETUP = False

    # Database Settings
    SQLALCHEMY_DATABASE_URI =\
        os.getenv('DATABASE_URL',
                  'sqlite:////workspace/database/test.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
