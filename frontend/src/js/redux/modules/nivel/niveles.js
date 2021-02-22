import { handleActions } from 'redux-actions';
import { createReducer } from '../baseReducer/baseReducer';

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    'nivel', //Identificador dentro del estado
    'niveles', //endpoint a donde se realizaran las peticiones
    'NivelForm', //Formulario que utilizará
    '/niveles' //Ruta a la que se irá una vez que ejecute las peticiones.
);


export default handleActions(reducers, initialState);