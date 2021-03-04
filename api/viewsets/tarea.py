import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from api.models import Tarea
from api.serializers import TareaSerializer, TareaRegistroSerializer
from rest_framework.response import Response
from rest_framework import status

class TareaViewset(viewsets.ModelViewSet):
    queryset = Tarea.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",)

    def get_serializer_class(self):        
        if self.action == 'list' or self.action == 'retrieve':
            return TareaSerializer
        else:
            return TareaRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data            
            serializer = TareaRegistroSerializer(data=data)
            if serializer.is_valid():
                
                Grado.objects.create(
                    nivel = nivel,
                    nombre = data.get("nombre")
                )
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        try:            
            data = request.data                                    
            serializer = TareaRegistroSerializer(data=data)
            if serializer.is_valid():
                tarea = Tarea.objects.get(pk=pk)                
                grado.nivel = nivel
                grado.nombre = data.get("nombre")
                grado.save()
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)