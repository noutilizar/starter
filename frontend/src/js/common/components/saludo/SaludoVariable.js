import React, { Component } from 'react';

class SaludoVariable extends Component{
    render(){        
        const { match } = this.props;

        return(
            <h3>Hola! {match.params.nombre}, Buenas tardes</h3>
        );
    }
}

export default SaludoVariable;