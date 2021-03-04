import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';

const GUARDAR_LISTADO_TAREAS = 'GUARDAR_LISTADO_TAREAS';
const GUARDAR_REGISTRO_TAREA = 'GUARDAR_REGISTRO_TAREA';
const GUARDAR_ARCHIVO = 'GUARDAR_ARCHIVO';

export const listar = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().empresa;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;

    api.get('/tareas', params).then((response)=>{
        //console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_TAREAS, data: response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al listar las tareas',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/tareas/${id}`).then((response)=>{
        console.log("Response: ", response);
        console.log("archivo: ", response.archivo);
        dispatch({type: GUARDAR_ARCHIVO, archivo: response.archivo});
        dispatch({type: GUARDAR_REGISTRO_TAREA, registro: response});
        dispatch(initializeForm('tarea', response));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroTarea = (data={}, attachments=[]) => (dispatch, getStore) => {    
    console.log("data: ", data);
    console.log("attachments: ", attachments);

    api.postAttachments("/tareas", data, attachments).then((response)=>{
        NotificationManager.success(
            'Tarea registrada correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/tareas'));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al registrar la empresa',
            'ERROR',
            0
        );
    });    
    
}

export const actualizarTarea = (data={}, attachments) => (dispatch, getStore) => {    
    console.log("update data: ", data);
    console.log("update attachments: ", attachments);

        
    api.putAttachments(`/tareas/${data.id}`, data, attachments).then((response)=>{
        NotificationManager.success(
            'Tarea actualizada correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/tareas'));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al actualizar la empresa',
            'ERROR',
            0
        );
    });    
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/tareas/${id}`).then((response)=>{
        NotificationManager.success(
            'Tarea eliminada correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al eliminar la empresa',
            'ERROR',
            0
        );
    })  
}

export const clearFile = () => (dispatch) => {
    dispatch({type: GUARDAR_ARCHIVO, archivo: null});
}

export const actions = {
    registroTarea,
    actualizarTarea,
    listar,
    leer,
    eliminar,
    clearFile,
};

export const reducers = {
    [GUARDAR_LISTADO_TAREAS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_TAREA]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_ARCHIVO]: (state, { archivo }) => {
        return {
            ...state,
            archivo,
        };
    },       
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    ordering: '',
    search: '',
    archivo: null,
}; 

export default handleActions(reducers, initialState);