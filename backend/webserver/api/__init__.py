import os

import importlib

from flask import Blueprint
from flask_restplus import Api

from webserver.config import Config, logger

from .commmon import *


API_PATH = './webserver/api'
NAMESPACE_SUFFIX = 'ns'


def get_namespaces(path):
    """
    Dynamically import namespaces from API directory.
    Files must contain an api variable
    """
    directories = sorted(os.listdir(path))
    namespaces = []
    modules = []
    
    for namespace in directories:
        if '__pycache__' in namespace:
            continue
        
        namespace_path = os.path.join(path, namespace)
        if os.path.isdir(namespace_path):
            import_string = namespace_path.replace('/', '.')[2:]
            module = importlib.import_module(import_string)
            namespaces.append(module.api)
            modules.append(namespace)
    
    logger.info(f'API: {path} loaded modules {modules}')
    return namespaces


def api_blueprints():
    """
    Dynamically import API blueprints
    """
    blueprints = []
    for version in os.listdir(API_PATH):
        path = os.path.join(API_PATH, version)

        # Directories starting with 'v' (e.g v1_2, or v2_4) are only valid
        if os.path.isdir(path) and version.startswith('v'):
            version = version.replace('_', '.')
            blueprint = Blueprint(
                f'api_{version}',
                __name__,
                url_prefix=f'/api/{version}'
            )
            api = Api(
                blueprint,
                title=Config.NAME,
                version=f'{version}'
            )

            # Add namespaces from directory
            for ns in get_namespaces(path):
                api.add_namespace(ns)

            blueprints.append(blueprint)

    return blueprints
