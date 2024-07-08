from datetime import timedelta
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from notes.models import Note, Category
from notes.api.serializers import NoteSerializer, CategorySerializer


class NotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['title', 'category', 'category__name']
    search_fields = ['title', 'content']
    lookup_field = 'slug'

    def get_queryset(self):
        """
        Get the notes belonging to the categories this user has created
        """
        return Note.objects.filter(category__user=self.request.user)
    
    @action(
        detail=False,
        methods=['GET'],
        name="Notes within the past 7 days"
    )
    def past_week(self, request):
        """
        Get notes created within the past 7 days
        """
        
        past_week = timezone.now() - timedelta(days=7)
        
        notes = Note.objects.filter(created__gte=past_week)
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)
    
    @action(
        detail=True,
        methods=['GET'],
        name="Past month"
    )
    def past_month(self, request):
        """
        Get notes created within the past month
        """
        
        past_month = timezone.now() - timedelta(days=30)
        
        notes = Note.objects.filter(created__gte=past_month)
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)
        

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']
    lookup_field = 'slug'
    search_fields = ['name']

    def get_queryset(self):
        """
        Get the categories this user has created
        """
        return Category.objects.filter(user=self.request.user)