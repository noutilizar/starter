import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';

const GUARDAR_LISTADO_EMPRESAS = 'GUARDAR_LISTADO_EMPRESAS';
const GUARDAR_REGISTRO_EMPRESA = 'GUARDAR_REGISTRO_EMPRESA';
const ORDERING_EMPRESA = 'ORDERING_EMPRESA';
const SEARCH_EMPRESA = 'SEARCH_EMPRESA';

export const listar = (page = 1) => (dispatch, getStore) => {
    const estado = getStore().empresa;    
    let params = { page };
    params.ordering = estado.ordering;
    params.search = estado.search;

    api.get('/empresa', params).then((response)=>{
        //console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_EMPRESAS, data: response});
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al listar las empresas',
            'ERROR',
            0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/empresa/${id}`).then((response)=>{
        console.log("Response: ", response);
        dispatch({type: GUARDAR_REGISTRO_EMPRESA, registro: response});
        dispatch(initializeForm('empresa', response));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al consultar el registro',
            'ERROR',
            0
        );
    });
}

export const registroEmpresa = () => (dispatch, getStore) => {    
    const formData = getStore().form.empresa.values;
    api.post('/empresa', formData).then((response)=>{
        NotificationManager.success(
            'Empresa registrada correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/empresas'));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al registrar la empresa',
            'ERROR',
            0
        );
    })    
}

export const actualizarEmpresa = () => (dispatch, getStore) => {    
    const formData = getStore().form.empresa.values;
    const id = formData.id;
    api.put(`/empresa/${id}`, formData).then((response)=>{
        NotificationManager.success(
            'Empresa actualizada correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/empresas'));
    }).catch((error)=>{
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrió un error al actualizar la empresa',
            'ERROR',
            0
        );
    })    
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/empresa/${id}`).then((response)=>{
        NotificationManager.success(
            'Empresa eliminada correctamente',
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

const onSortChange = (ordering) => (dispatch, getStore) => {
    const estado = getStore().empresa;
    const sort = estado.ordering;

    if(ordering == sort){
        dispatch({type: ORDERING_EMPRESA, ordering: `-${ordering}`});
    }else{
        dispatch({type: ORDERING_EMPRESA, ordering});
    }
    
    dispatch(listar());
}

const onSearchChange = (search) => (dispatch) => {
    dispatch({type: SEARCH_EMPRESA, search});
    dispatch(listar());
}

export const actions = {
    registroEmpresa,
    actualizarEmpresa,
    listar,
    leer,
    eliminar,
    onSortChange,
    onSearchChange,
};

export const reducers = {
    [GUARDAR_LISTADO_EMPRESAS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_EMPRESA]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [ORDERING_EMPRESA]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH_EMPRESA]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },    
};

export const initialState = {
    loader: false,
    data: null,
    registro: null,
    ordering: '',
    search: '',
}; 

export default handleActions(reducers, initialState);