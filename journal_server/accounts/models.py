from django.db import models

from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    Extend the Django User model
    """
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None
    last_name = None

    def __str__(self):
        return self.email