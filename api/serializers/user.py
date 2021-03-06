from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Profile
'''
class UserRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',            
            'password',            
        )

class ProfileRegistroSerializer(serializers.ModelSerializer):
    user = UserRegistroSerializer()

    class Meta:
        model = User
        fields = (
            'user',
            'nombre',
            'apellido',
            'direccion',
            'correo',
            'telefono',            
        )

class ProfesionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profesion
        fields = (
            'nombre',                    
        )    

class CatedraticoRegistroSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    profesion = ProfesionRegistroSerializer()

    class Meta:
        model = Catedratico
        fields = (            
            'profile',
            'profesion',                    
        )
'''






class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):    
    profile = ProfileSerializer(required=False)
    total_vehiculos = serializers.IntegerField(default=0)
    total_gasto =  serializers.FloatField(default=0)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'profile',
            'password',            
            'total_vehiculos',
            'total_gasto',
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )

class UserReporteSerializer(serializers.ModelSerializer):
    total_vehiculos = serializers.IntegerField(default=0)
    total_gastado = serializers.FloatField(default=0)

    class Meta:
        model = User
        fields = (
            'username',
            'total_vehiculos',
            'total_gastado',
        )

