import React, {Component} from 'react';
import Formulario from './Formulario';

class Tarea extends Component{
    state={
        crear: true,
        archivo: null,
    }

    componentWillMount = () => {
        const { leer, match } = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leer(id);
        }
    }

    setArchivo = (archivo) => {
        console.log("archivo: ", archivo);
        this.setState({ archivo });
    };

    registro = (data) => {
        const {registroTarea, archivo} = this.props;
        registroTarea({...data, archivo:null}, [{ file: this.state.archivo, name: 'archivo' },])
    }

    actualizar = (data) => {
        const {actualizarTarea, archivo} = this.props;
        actualizarTarea({...data, archivo:null}, [{ file: this.state.archivo, name: 'archivo' },])
    }    

    render(){        
        const { archivo, clearFile } = this.props;                
        const { crear } = this.state;
        const funcionEnvio = crear ? this.registro : this.actualizar;

        return(
            <React.Fragment>                
                <Formulario
                    crear={crear}
                    onSubmit={funcionEnvio}
                    setArchivo={this.setArchivo}
                    archivo={archivo}
                    clearFile={clearFile}
                />
            </React.Fragment>
        );
    }
}

export default Tarea;