import React, {Component} from 'react';
import {RenderCurrency} from '../Utils/renderField/renderReadField';
import Formulario from "./Formulario";

class Reporte extends Component{
    componentWillMount = () => {
        const { reportePrincipal } = this.props;
        reportePrincipal();
    }

    render(){
        const { data, selectUser, filtroGasto } = this.props;
        console.log("Data reporte: ", data);

        return(
            <div className='mt-2'>
                <Formulario
                    selectUser={selectUser}
                    filtroGasto={filtroGasto}
                    onSubmit={()=>console.log(" ")}
                />
                {data &&
                <React.Fragment>                                        
                    <div className='d-flex flex-row justify-content-between'>
                        <h3> Reporte Principal</h3>
                        <h3><RenderCurrency value={data.total} /></h3>
                    </div>
                    <h4> Listado de Vehículos y Gastos por usuario</h4>    

                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Total de Vehículos</th>
                                <th>Total de gastos de servicio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.listado_con_vehiculo.map((registro, i)=>(
                                <tr key={i}>
                                    <td>{registro.username}</td>
                                    <td>{registro.total_vehiculos}</td>
                                    <td><RenderCurrency value={registro.total_gastado} /></td>
                                </tr>
                            ))}                        
                        </tbody>
                    </table>

                    <h4> Listado de Vehículos</h4>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Modelo</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {data.listado_vehiculos.map((registro, i)=>(
                                <tr key={i}>
                                    <td>{registro.nombre}</td>
                                    <td>{registro.modelo}</td>                                
                                </tr>
                            ))}                        
                        </tbody>
                    </table> 

                    <h4> Listado de Servicios</h4>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {data.listado_servicios.map((registro, i)=>(
                                <tr key={i}>
                                    <td>{registro.nombre}</td>
                                    <td><RenderCurrency value={registro.precio} /></td>                                
                                </tr>
                            ))}                        
                        </tbody>
                    </table>
                </React.Fragment>
                }                             
            </div>
        );
    }    
}

export default Reporte;