import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {    
    renderField,    
} from '../Utils/renderField/renderField';

class Formulario extends Component{
    render(){
        console.log("PROPS: ", this.props);

        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Nivel' : 'Registrar Nivel';
        let disabled = false;
        
        if(crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Nivel';
        }

        
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>
                <label>Nombre</label>
                <Field name='nombre' component={renderField} disabled={disabled} />
                
                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        href='/#/niveles'
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
    form: 'NivelForm'
})(Formulario)