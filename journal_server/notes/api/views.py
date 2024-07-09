from datetime import datetime, timedelta
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Sum
from django.utils import timezone
from notes.models import Note, Category
from notes.api.serializers import NoteSerializer, CategorySerializer


class NotesViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['title', 'category', 'category__name']
    search_fields = ['title', 'content']
    # lookup_field = 'slug'

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
        detail=False,
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
    
    @action(
        detail=False,
        methods=['GET'],
        name="overview"
    )
    def overview(self, request):
        """
        Highlight the count of notes today, this week and through the past month
        """
        today = timezone.now().date()
        past_week = timezone.now() - timedelta(days=7)
        past_month = timezone.now() - timedelta(days=30)

        notes = Note.objects.filter(category__user=self.request.user)

        notes_today = notes.filter(created__date=today).count()
        notes_week = notes.filter(created__gte=past_week).count()
        notes_month = notes.filter(created__gte=past_month).count()
        
        return Response({
            "today": notes_today,
            "past_week": notes_week,
            "past_month": notes_month
        })
    
    @action(
        detail=False,
        methods=['GET'],
        name="summary"
    )
    def summary(self, request):
        """
        Get the number of notes created by the user 
        """

        # ?Thought: Use this as a stat summary of moods for this user
        notes = Note.objects.filter(category__user=self.request.user)
        notes_today = past_day(user=self.request.user, notes=notes)
        past_week = past_7_days(user=self.request.user, notes=notes)
        past_month = past_four_weeks(user=self.request.user, notes=notes)

        return Response({
            "today": notes_today,
            "week": past_week,
            "month": past_month
        })
    
def past_day(user, notes) -> list:
    """
    Get all notes today
    """
    today = datetime.now().date()
    results = []
    notes = notes.filter(category__user=user, updated__date=today)
    top_category = notes.values("category__name").annotate(count=Count("category__name")).order_by("-count").first()
    results.append({"day": today, "notes": notes.count(), "top_category": top_category})

    return results

def past_7_days(user, notes) -> list:
    today = datetime.now().date()
    seven_days_ago = today - timedelta(days=7)
    results = []

    current_date = seven_days_ago
    while current_date <= today:
        notes = notes.filter(category__user=user, updated__date=current_date)
        top_category = notes.values("category__name").annotate(count=Count("category__name")).order_by("-count").first()
        
        results.append({"day": current_date, "notes": notes.count() , "top_category": top_category})
        current_date += timedelta(days=1)

    return results


def past_four_weeks(user, notes) -> list:
    """
    Get all notes within the past four weeks
    """
    # Get the date four weeks ago from today
    today = datetime.now().date()
    four_weeks_ago = today - timedelta(weeks=4)
    results = []

    current_date = four_weeks_ago
    while current_date <= today:
        # Filter notes for the current week
        notes = Note.objects.filter(category__user=user, updated__week=current_date.isocalendar()[1])
        top_category = notes.values("category__name").annotate(count=Count("category__name")).order_by("-count").first()

        results.append({"week": current_date, "notes": notes.count(), "top_category": top_category})

        current_date += timedelta(weeks=1)

    return results     

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