import {handleActions} from 'redux-actions';
import {NotificationManager} from 'react-notifications';
import {api} from "../../../utility/api";

const SET_DATA_REPORTE = 'SET_DATA_REPORTE';
const SET_ID_USUARIO = 'SET_ID_USUARIO';
const SET_GASTO_MINIMO = 'SET_GASTO_MINIMO';

export const reportePrincipal = () => (dispatch, getStore) => {
    const initial_state = getStore().reporte;
    const params={
        usuario: initial_state.usuario,
        gasto: initial_state.gasto,
    }
 
    api.get('/reportes/reportePrincipal', params).then((response)=>{
        //console.log("Reporte: ", response);
        dispatch({type: SET_DATA_REPORTE, data: response});
    }).catch((error)=>{
        NotificationManager.error(
            `Ocurrió un error al obtener el reporte ${error.detail}`,
            'ERROR',
            0
        );
    });
}

export const selectUser = (usuario) => (dispatch) => {
    const id_usuario = usuario.value;
    dispatch({type: SET_ID_USUARIO, usuario:id_usuario});
    dispatch(reportePrincipal());
}

export const filtroGasto = (gasto) => (dispatch) => {    
    if(gasto === ''){
        gasto = 0;
    }

    dispatch({type: SET_GASTO_MINIMO, gasto});
    dispatch(reportePrincipal());
}

export const actions = {
    reportePrincipal,
    selectUser,
    filtroGasto,
}

export const reducers = {
    [SET_DATA_REPORTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_ID_USUARIO]: (state, { usuario }) => {
        return {
            ...state,
            usuario,
        };
    },
    [SET_GASTO_MINIMO]: (state, { gasto }) => {
        return {
            ...state,
            gasto,
        };
    },    
};

export const initialState = {
    data: null,
    usuario: 0,
    gasto: 0,
};

export default handleActions(reducers, initialState);