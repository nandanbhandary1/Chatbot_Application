import requests
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from django.shortcuts import get_object_or_404

from projects.models import Project, Prompt
from .models import ChatMessage


class ChatWithAgent(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, project_id):
        user_message = request.data.get("message")

        project = get_object_or_404(Project, id=project_id, user=request.user)
        prompts = Prompt.objects.filter(project=project)

        system_prompt = " ".join([p.content for p in prompts])

        headers = {
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }

        data = {
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ]
        }

        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data
        )

        result = response.json()

        # Safety check
        if "choices" not in result:
            return Response({"error": result}, status=500)

        bot_reply = result["choices"][0]["message"]["content"]

        # Save chat
        ChatMessage.objects.create(project=project, role="user", message=user_message)
        ChatMessage.objects.create(project=project, role="assistant", message=bot_reply)

        return Response({"reply": bot_reply})
