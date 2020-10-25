import React, { Component } from 'react';

import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ListadoEmpresas extends Component{
    componentWillMount = () => {
        const { listar } = this.props;        
        listar();
    }

    render(){        
        const { data, loader, eliminar} = this.props;

        return(
            <React.Fragment>
                <center><h3>Empresas Registradas</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>
                    <a 
                        href='/#/empresas/crear'
                        className='btn btn-primary'
                    >
                        Crear Empresa
                    </a>
                </div>

                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
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
            </React.Fragment>
        );
    }
}

export default ListadoEmpresas;