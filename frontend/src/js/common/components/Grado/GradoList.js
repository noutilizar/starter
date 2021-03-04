import React, { Component } from 'react';

import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoGrados extends Component{
    componentWillMount = () => {
        const { listar } = this.props;        
        listar();
    }

    render(){        
        const { listar, data, loader, eliminar, onSortChange, onSearchChange} = this.props;

        return(
            <React.Fragment>
                <center><h3>Grados Registrados</h3></center>
                <div className='d-flex flex-row justify-content-between align-items-center mb-2'>
                    <a 
                        href='/#/grados/crear'
                        className='btn btn-primary'
                    >
                        Crear Grado
                    </a>

                    <input  
                        className='form-control w-25'
                        placeholder='Buscar...'
                        onChange={(e)=> onSearchChange(e.target.value)}
                    />
                </div>
                {data &&
                    <Grid
                        hover
                        striped
                        data={data}
                        loading={loader}
                        onPageChange={listar}
                        onSortChange={onSortChange}                    
                    >
                        <TableHeaderColumn                            
                            dataField="nombre"
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>

                        <TableHeaderColumn                            
                            dataField="nivel"
                            dataSort
                            dataFormat={(cell, row)=>{
                                return cell.nombre;                                
                            }}
                        >
                            Nivel
                        </TableHeaderColumn>                                                
                        
                        <TableHeaderColumn
                            isKey
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({
                                editar: 'grados',
                                ver: 'grados',
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

export default ListadoGrados;