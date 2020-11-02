from rest_framework import serializers
from api.models import Servicio

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class ServicioRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('vehiculo', 'nombre', 'precio')