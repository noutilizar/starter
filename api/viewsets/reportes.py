from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User
from api.models import Vehiculo, Servicio
from django.db.models import Q, Count, Sum
from api.serializers import VehiculoSerializer, ServicioSerializer, UserReporteSerializer

class ReporteView(GenericViewSet):
    queryset = User.objects.all()

    @action(detail=False, methods=['get'])
    def reportePrincipal(self, request):
        try:
            #Listado de vehiculos
            listado_vehiculos = Vehiculo.objects.all()

            #Listado de servicios
            listado_servicios = Servicio.objects.all()

            #El total de vehículos por propietario            
            usuarios_vehiculo = User.objects.annotate(
                total_vehiculos = Count("vehiculo_user__id")
            ).annotate(
                total_gastado =  Sum("vehiculo_user__servicio_vehiculo__precio")
            )

            total_acumulado = 0
            queryset = Servicio.objects.aggregate(total=Sum('precio'))
            if queryset is not None:
                total_acumulado = queryset['total']

            data = {
                'listado_vehiculos': VehiculoSerializer(listado_vehiculos, many=True).data,
                'listado_servicios': ServicioSerializer(listado_servicios, many=True).data,
                'listado_con_vehiculo': UserReporteSerializer(usuarios_vehiculo, many=True).data,
                'total': total_acumulado,
            }            

            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BD_REQUEST)