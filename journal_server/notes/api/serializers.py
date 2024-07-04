from rest_framework import serializers
from notes.models import Note, Category

class NoteSerializer(serializers.ModelSerializer):

    category_name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ['slug']
    
    def get_category_name(self, obj):
        return obj.category.name


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['slug']
        