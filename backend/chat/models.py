from django.db import models

# Create your models here.
from django.db import models
from projects.models import Project

class ChatMessage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="messages")
    role = models.CharField(max_length=10)  # user / assistant
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
