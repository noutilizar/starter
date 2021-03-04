from rest_framework import serializers
from api.models import Tarea

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = (
            'id',
            'nombre',
            'punteo',
            'descripcion',
            'archivo'
        )

class TareaRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ('nombre','punteo')