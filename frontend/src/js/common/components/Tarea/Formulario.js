import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {    
    renderNumber,
    renderField,    
    renderFilePicker,
    renderTextArea
} from '../Utils/renderField/renderField';

class Formulario extends Component{
    componentWillUnmount = () => {
        const {clearFile} = this.props;
        clearFile();
    }

    render(){
        const {handleSubmit, crear, setArchivo, archivo } = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Tarea' : 'Registrar Tarea';
        let disabled = false;
        
        console.log("Archivo en formulario: ", archivo);

        if(crear == false && editar == false){
            disabled = true;
            titulo = 'Ver Grado';
        }
                
        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>{titulo}</h3>

                <label>Archivo</label>
                <Field
                    accept="image/*,.pdf,document/*"
                    setFile={setArchivo}
                    name="archivo"
                    photo={archivo}
                    component={renderFilePicker}                    
                />
                <a href={archivo} target="_blank" >Adjunto</a>
                
                <br /><br />

                <label>Nombre</label>
                <Field name='nombre' component={renderField} disabled={disabled} />
                <br /><br />

                <label>Punteo</label>
                <Field name='punteo' component={renderNumber} disabled={disabled} />
                <br /><br />                

                <label>Descripción</label>
                <Field name='descripcion' component={renderTextArea} disabled={disabled} />

                <div className='d-flex flex-row justify-content-end mt-3'>
                    <a
                        href='/#/tareas'
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
    form: 'tarea'
})(Formulario)