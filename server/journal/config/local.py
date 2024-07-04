from .base import *
from .base import env


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-fae&@v(k28f_)lot$q)@nlvj1b40e21)7a1ze9vz3j=&yj$8k2"

DEBUG = True
ALLOWED_HOSTS = ["localhost", "0.0.0.0", "127.0.0.1"]
CORS_ALLOW_ALL_ORIGINS=True

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
