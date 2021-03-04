import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';
import {api} from "api";
import { NotificationManager } from 'react-notifications';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------

const baseReducer = createReducer(
    'grado', //Identificador dentro del estado
    'grados', //endpoint a donde se realizaran las peticiones
    'GradoForm', //Formulario que utilizará
    '/grados' //Ruta a la que se irá una vez que ejecute las peticiones.
);

const crearGrado = (data) => (dispatch) => {
    console.log("data en formulario: ", data);
    const formData = {
        nivel: data.nivel.value,
        nombre: data.nombre
    }

    api.post("grados", formData)
        .then(() => {
            NotificationManager.success('Registro creado', 'Éxito', 3000);            
            dispatch(push("/grados"));
        })
        .catch(() => {
            NotificationManager.error('Error en la creación', 'ERROR');
        }).finally(() => {            

        });
};

const leerGrado = (id) => (dispatch) => {    
    api.get(`grados/${id}`)
        .then((response) => {
            console.log("data de lectura de grado: ", response)
            response.nivel = {value: response.nivel.id , label: response.nivel.nombre};
            dispatch(initializeForm("GradoForm", response));
        })
        .catch(() => {})
        .finally(() => {            
        });
};

const editarGrado = (id, data) => (dispatch) => {
    const formData = {
        nivel: data.nivel.value,
        nombre: data.nombre
    }

    api.put(`grados/${id}`, formData)
        .then(() => {                
            NotificationManager.success(
                'Registro actualizado',
                'Éxito',
                3000
            );
            dispatch(push("/grados"));
        })
        .catch(() => {
            NotificationManager.error('Error en la edición', 'ERROR', 0);
        })
        .finally(() => {
  
        });
};

const obtenerNiveles = (search) => () => {    
    return api.get("niveles", {search}).then(data=>{        
        if(data){
            const niveles = [];
            data.results.forEach(nivel=>{
                niveles.push({
                    value: nivel.id,
                    label: nivel.nombre
                })
            })
            return niveles;
        }
    }).catch(error=>{
        console.log("error: ", error);
        return [];
    })
}

export const actions = {
    ...baseReducer.actions,
    crearGrado,
    leerGrado,
    editarGrado,
    obtenerNiveles,
}

export const initialState = {
    ...baseReducer.initialState
}

export const reducers = {
    ...baseReducer.reducers
}

export default handleActions(reducers, initialState)