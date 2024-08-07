"""
URL configuration for journal project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('journal/', include('journal.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

admin.site.site_header = "Journal Admin"
admin.site.site_title = "Personal Journal Admin Portal"
admin.site.index_title = "Welcome to the Admin Portal"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("journal.config.api_router")),
    path("api/schema/", SpectacularAPIView.as_view(), name="api-schema"),
    path("api/account-auth/", include("dj_rest_auth.urls")),
    path(
        "api/account-auth/registration/",
        include("dj_rest_auth.registration.urls"),
    ),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="api-schema"),
        name="api-docs",
    ),
]
