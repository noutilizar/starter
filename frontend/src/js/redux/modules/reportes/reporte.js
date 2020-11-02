import {handleActions} from 'redux-actions';
import {NotificationManager} from 'react-notifications';
import {api} from "../../../utility/api";

const SET_DATA_REPORTE = 'SET_DATA_REPORTE';

export const reportePrincipal = () => (dispatch, getStore) => {
    api.get('/reportes/reportePrincipal').then((response)=>{
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

export const actions = {
    reportePrincipal,
}

export const reducers = {
    [SET_DATA_REPORTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },    
};

export const initialState = {
    data: null,
};

export default handleActions(reducers, initialState);