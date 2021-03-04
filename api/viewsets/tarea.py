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

            archivo = data.get("archivo")
            data = json.loads(data["data"])            
            
            serializer = TareaRegistroSerializer(data=data)
            if serializer.is_valid():
                tarea = Tarea.objects.create(
                    nombre = data.get("nombre"),
                    descripcion = data.get("descripcion"),
                    punteo = data.get("punteo"),
                    archivo = File(archivo)
                )
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        try:            
            data = request.data

            archivo = data.get("archivo")
            data = json.loads(data["data"])

            serializer = TareaRegistroSerializer(data=data)
            if serializer.is_valid():
                tarea = Tarea.objects.get(pk=pk)                

                if tarea.archivo is not None:
                    tarea.archivo.delete()
                
                tarea.nombre = data.get("nombre")
                tarea.descripcion = data.get("descripcion")
                tarea.punteo = data.get("punteo")
                tarea.archivo = File(archivo)                
                tarea.save()

                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:            
            tarea = Tarea.objects.get(pk=pk)
            if tarea.archivo is not None:
                tarea.archivo.delete()
            tarea.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    