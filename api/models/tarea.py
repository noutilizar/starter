from django.db import models

class Tarea(models.Model):    
    nombre = models.CharField(max_length=50, null=True, blank=True)
    descripcon =  models.CharField(max_length=200, null=True, blank=True)
    archivo = models.FileField(upload_to='archivos_tarea', null=True, blank=True)
    precio = models.DecimalField(max_digits=5, decimal_places=2)
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):        
        self.activo = False
        self.save()
        return True        