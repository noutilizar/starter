from django.db import models

class Nivel(models.Model):
    nombre = models.CharField(max_length=50)    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)    

    def delete(self, *args):        
        self.activo = False
        self.save()
        return True