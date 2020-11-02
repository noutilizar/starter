from rest_framework import serializers
from api.models import Vehiculo

class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__'

class VehiculoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = ('propietario', 'nombre', 'modelo')
