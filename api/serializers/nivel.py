from rest_framework import serializers
from api.models import Nivel

class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = (
            'id',
            'nombre'
        )

class NivelRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = ('nombre',)