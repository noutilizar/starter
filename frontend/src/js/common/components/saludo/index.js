import React, { Component } from 'react';

class Saludo extends Component{
    render(){
        return(
            <React.Fragment>
                <h3>Hola! Buenas tardes</h3>
                <a
                    href='/#/saludo/Juan'
                >Abrir el otro componente de saludo</a>
            </React.Fragment>
        );
    }
}

export default Saludo;