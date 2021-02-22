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
from api.models import Nivel
from api.serializers import NivelSerializer, NivelRegistroSerializer
from rest_framework.response import Response
from rest_framework import status

class NivelViewset(viewsets.ModelViewSet):
    queryset = Nivel.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",)

    def get_serializer_class(self):        
        if self.action == 'list' or self.action == 'retrieve' or self.action == "reportePrincipal":
            return NivelSerializer
        else:
            return NivelRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

    '''
    def list(self, request):
        try:
            user = request.user        
            data = request.query_params

            pagina = data.get("page") 
            print("pagina: ", pagina)   
            
            return Response({"detail":"Todo bien"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)            
    '''

    '''
    def create(self, request):
        try:
            with transaction.atomic():
                user = request.user        
                data = request.data

                #Validación a través del serializer
                serializer = CatedraticoSerializer(data=data)

                
                if verify.is_valid():
                    #Estoy registrando...
                    user = User.objects.create(
                        email=data.get("profile").get("user").get("email"),
                        password=data.get("profile").get("user").get("password"),
                    )

                    profile = Profile.objects.create(
                        user = user,
                        nombre = data.get("profile").get("nombre"),
                        apellido = data.get("profile").get("apellido"),
                        direccion = data.get("profile").get("direccion"),
                    )

                    profesion = Profesion.objects.get(pk=data.get("profesion").get("value"))

                    catedratico = Catedratico.objects.create(
                        profesion =
                    )

                    nivel = Nivel.objects.create(
                        nombre = data.get("nombre")
                    )

                else:
                    print("Error en la verificacion")

                serializer = NivelRegistroSerializer(nivel)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)            
    '''
    
    @action(detail=True, methods=['get'])
    def customMethod(self, request):
        params = request.query_params
        pass