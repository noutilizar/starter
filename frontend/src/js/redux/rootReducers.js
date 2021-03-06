import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import empresa from './modules/empresa/empresa';
import reporte from './modules/reportes/reporte';
import nivel from "./modules/nivel/niveles";
import grado from "./modules/grado/grados";
import tarea from "./modules/tarea/tareas";

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    empresa,
    reporte,
    nivel,
    grado,
    tarea,
});
