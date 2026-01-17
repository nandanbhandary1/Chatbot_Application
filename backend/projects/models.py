from django.db import models

# Create your models here.
from django.db import models
from accounts.models import User

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Prompt(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="prompts")
    title = models.CharField(max_length=100)
    content = models.TextField()

    def __str__(self):
        return self.title
