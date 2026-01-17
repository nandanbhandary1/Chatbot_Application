from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from projects.views import ProjectViewSet, PromptViewSet
from accounts.views import RegisterView, LoginView
from chat.views import ChatWithAgent

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='projects')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', RegisterView.as_view()),
    path('api/login/', LoginView.as_view()),
    path('api/', include(router.urls)),
    path('api/projects/<int:project_id>/prompts/', PromptViewSet.as_view({'get':'list','post':'create'})),
    path('api/projects/<int:project_id>/chat/', ChatWithAgent.as_view()),
]
