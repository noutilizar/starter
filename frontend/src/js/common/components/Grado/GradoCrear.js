import React, {Component} from 'react';
import Formulario from './Formulario';

class Grado extends Component{
    state={
        creacion: true,
    }

    componentWillMount = () => {
        const { leerGrado, match } = this.props;
        const id = match.params.id;

        if(id){
            this.setState({creacion: false});
            leerGrado(id);
        }
    }

    acualizarGrado = (data) => {
        const { editarGrado } = this.props;
        const id = data.id;
        editarGrado(id, data);
    }

    render(){
        const { crearGrado, obtenerNiveles } = this.props;                
        const { creacion } = this.state;

        const funcionEnvio = creacion ? crearGrado : this.acualizarGrado;

        return(
            <React.Fragment>                
                <Formulario
                    crear={creacion}
                    obtenerNiveles={obtenerNiveles}
                    onSubmit={funcionEnvio}
                />
            </React.Fragment>
        );
    }
}

export default Grado;