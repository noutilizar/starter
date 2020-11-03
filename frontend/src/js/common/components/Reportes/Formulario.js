import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {    
    renderField,
    AsyncSelectField,
    renderNumber,
} from '../Utils/renderField/renderField';
import { api } from "../../../utility/api";

const getClientes = (search) => {
    const clientes=[];
    return api.get("user", {search}).then((data)=>{
        console.log("DATA: ", data);
        data.results.forEach(dato=>{
            clientes.push({value: dato.id, label: dato.username});
        })
        return clientes;
    }).catch((error)=>{
        return [];
    })
}

class Formulario extends Component{
    render(){
        const {handleSubmit, selectUser, filtroGasto} = this.props;

        return(
            <form onSubmit={handleSubmit} className='w-25'>
                <h3>Flitros</h3>
                <label>Usuarios</label>                
                <Field
                    isClearable 
                    name='usuario'
                    component={AsyncSelectField}
                    loadOptions={getClientes}
                    onChange={(value)=> {
                        if(value.hasOwnProperty('value'))                        
                            selectUser(value);
                        else
                            selectUser({value: 0, label: ''})
                    }}
                />

                <label>Gastos mayores a:</label>                
                <Field 
                    name='gastos'
                    component={renderNumber}
                    onChange={(e, value)=> filtroGasto(value)}
                />                                
            </form>          
        );
    }
}

export default reduxForm({
    form: 'filtros_reporte' //Identificador único del formulario
})(Formulario)
