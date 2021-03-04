from rest_framework.permissions import BasePermission

class IsProfesor(BasePermission):
    def has_permission(self, request, view):
        print("request: ", request.method)

        if request.user:
            #if request.user.profile_user.rol == "catedratico"
            if request.user.username == "ricky":
                return True
            else:
                return False
        else:
            return False

class ProfesorRead(BasePermission):
    def has_permission(self, request, view):
        print("request: ", request.method)

        if request.user:
            #if request.user.is_superuser:

            if request.user.username == "ricky" and request.method =="GET":
                return True
            else:
                return False
        else:
            return False