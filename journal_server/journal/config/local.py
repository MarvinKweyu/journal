from __future__ import absolute_import, unicode_literals

import os
from pathlib import Path

from journal.config.base import *

SECRET_KEY = os.environ.get(
    "SECRET_KEY", "a^(6eqi@if&6lyt0h1od^o450!8h8@s0*x_rf9(bx(3fiuhj*6")

DEBUG = True
# ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1"]=}BszY@E9We_Wy@=}BszY@E9We_Wy@
ALLOWED_HOSTS = ["*"]
CORS_ALLOW_ALL_ORIGINS=True

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DATABASE_NAME"),
        "USER": os.environ.get("DATABASE_USER"),
        "PASSWORD": os.environ.get("DATABASE_PASSWORD"),
        "HOST": os.environ.get("DATABASE_HOST"),
        "PORT": os.environ.get("DATABASE_PORT"),
    }
}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"