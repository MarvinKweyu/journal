from rest_framework import serializers
from notes.models import Note, Category

class NoteSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(write_only=True)
    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ['slug']

    def create(self, validated_data):
        category_name = validated_data.pop('category_name', None)
        
        if category_name:
            category, created = Category.objects.get_or_create(
                name=category_name.lower().strip(), 
                defaults={'user': self.context['request'].user}
            )
            validated_data['category'] = category
        
        return super().create(validated_data)
    
    def get_category_name(self, obj):
        return obj.category.name


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['slug']

    def create(self, validated_data):
        user = self.context['request'].user
        category, created = Category.objects.get_or_create(user=user, **validated_data)
        return category
        