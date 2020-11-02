import React, { Component } from 'react';

import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEmpresas extends Component{
    componentWillMount = () => {
        const { listar } = this.props;        
        listar();
    }

    render(){        
        const { listar, data, loader, eliminar, onSortChange, onSearchChange} = this.props;

        return(
            <React.Fragment>
                <center><h3>Empresas Registradas</h3></center>
                <div className='d-flex flex-row justify-content-between align-items-center mb-2'>
                    <a 
                        href='/#/empresas/crear'
                        className='btn btn-primary'
                    >
                        Crear Empresa
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
                            isKey
                            dataField="nombre"
                            dataSort
                        >
                            Nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="direccion"
                            dataSort
                        >
                            Direccion
                        </TableHeaderColumn>
                        
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({
                                editar: 'empresas',
                                ver: 'empresas',
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

export default ListadoEmpresas;