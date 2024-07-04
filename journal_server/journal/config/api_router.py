from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter


from notes.api.views import NotesViewSet, CategoryViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()


app_name = "api"
router.register("notes", NotesViewSet)
router.register("categories", CategoryViewSet)
urlpatterns = router.urls
