import React, { Component } from 'react';

import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoTareas extends Component{
    componentWillMount = () => {
        const { listar } = this.props;        
        listar();
    }

    render(){        
        const { listar, data, loader, eliminar, onSortChange, onSearchChange} = this.props;

        return(
            <React.Fragment>
                <center><h3>Tareas Registradas</h3></center>
                <div className='d-flex flex-row justify-content-between align-items-center mb-2'>
                    <a 
                        href='/#/tareas/crear'
                        className='btn btn-primary'
                    >
                        Crear Tareas
                    </a>
              
                </div>
                {data &&
                    <Grid
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={listar}
                        //onSortChange={onSortChange}                    
                    >
                        <TableHeaderColumn                            
                            dataField="nombre"                            
                        >
                            Nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="descripcion"                            
                        >
                            Direccion
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataAlign="center"                            
                            dataFormat={standardActions({
                                editar: 'tareas',
                                ver: 'tareas',
                                eliminar: eliminar,
                            })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    </Grid>
                }  
            </React.Fragment>
        );
    }
}

export default ListadoTareas;