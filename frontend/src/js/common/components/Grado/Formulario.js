import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {    
    renderField,    
} from '../Utils/renderField/renderField';
import { api } from '../../../utility/api';
import {
    AsyncSelectField,    
} from 'Utils/renderField/renderField';

class Formulario extends Component{
    render(){
        const {handleSubmit, crear, obtenerNiveles} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Grado' : 'Registrar Grado';
        let disabled = false;
        
        if(crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Grado';
        }

        
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>

                <label>Nivel</label>
                <Field
                    name="nivel"
                    loadOptions={obtenerNiveles}
                    component={AsyncSelectField}
                    disabled={disabled}
                />
                <br /><br />
                <label>Nombre</label>
                <Field name='nombre' component={renderField} disabled={disabled} />
                
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        href='/#/grados'
                        className='btn btn-secondary btn-sm mr-2'
                    >
                        Cancelar
                    </a>

                    {disabled == false &&
                        <button
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type='submit'
                        >
                            {editar ? 'Actualizar' : 'Registrar' }
                        </button>
                    }    
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'GradoForm'
})(Formulario)