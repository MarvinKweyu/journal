from django.contrib import admin
from notes.models import Category, Note

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'user')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created', 'updated')
    list_filter = ('category', 'created', 'updated')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}

