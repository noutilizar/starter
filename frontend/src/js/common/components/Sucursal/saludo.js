import React, { Component } from 'react';

class Saludo extends Component{
    render(){
        const {match} = this.props;        
        const nombre = match.params.nombre;

        return(
            <div>
                <h3>Hola {nombre}, buenos días.</h3>
            </div>
        );
    }
}

export default Saludo;