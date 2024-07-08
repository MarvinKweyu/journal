from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    """
    Journal category
    """
    name = models.CharField(max_length=200)
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='category')
    slug = models.SlugField(unique=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Categories"

class Note(models.Model):
    """
    A note for your journal
    """
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE, related_name='note')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Note, self).save(*args, **kwargs)