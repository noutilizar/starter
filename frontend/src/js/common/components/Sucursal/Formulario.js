import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'

class Formulario extends Component{
    render(){
        return(                           
            <div className='d-flex flex-column w-25'>
                <form>
                    <div className="form-group">
                        <label for="nombre">Nombre</label>                    
                        <Field 
                            name='nombre' 
                            component='input' 
                            type='text' 
                            className='form-control' 
                        />
                    </div>
                    <div className="form-group">
                        <label for="direccion">Dirección</label>                    
                        <Field 
                            name='direccion' 
                            component='input' 
                            type='text' 
                            className='form-control' 
                        />
                    </div>
                    <div className="form-group">
                        <label for="telefono">Teléfono</label>                    
                        <Field 
                            name='telefono' 
                            component='input' 
                            type='text' 
                            className='form-control' 
                        />
                    </div>
                    <div className='d-flex flex-row justify-content-end'>
                        <button 
                            type="submit"
                            className='btn btn-primary btn-sm'
                        >
                            Guardar
                        </button>
                    </div>                                        
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'sucursal' //El nombre debe ser único
})(Formulario)