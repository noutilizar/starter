import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { Login, Profile, Registro } from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from './common/components/Examples/Grids';
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import Saludo from './common/components/saludo/index';
import SaludoVariable from './common/components/saludo/SaludoVariable';

import EmpresaListContainer from './common/components/Empresa/EmpresaListContainer';
import EmpresaCrearContainer from './common/components/Empresa/EmpresaCrearContainer';

import Reporte from './common/components/Reportes/reporteContainer';

import NivelListContainer from "./common/components/Nivel/NivelListContainer";
import NivelCrearContainer from "./common/components/Nivel/NivelCrearContainer";

import GradoListContainer from "./common/components/Grado/GradoListContainer";
import GradoCrearContainer from "./common/components/Grado/GradoCrearContainer";

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute
                    exact
                    path="/user-profile"
                    component={Profile}
                />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute
                    exact
                    path="/notifications"
                    component={Notificaciones}
                />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                
                <ProtectedRoute exact path="/saludo" component={Saludo} />
                <ProtectedRoute exact path="/saludo/:nombre" component={SaludoVariable} />

                <ProtectedRoute exact path='/empresas/crear' component={EmpresaCrearContainer} />
                <ProtectedRoute exact path='/empresas/:id' component={EmpresaCrearContainer} />
                <ProtectedRoute exact path='/empresas/:id/editar' component={EmpresaCrearContainer} />
                <ProtectedRoute exact path='/empresas' component={EmpresaListContainer} />

                <ProtectedRoute exact path='/niveles/crear' component={NivelCrearContainer} />
                <ProtectedRoute exact path='/niveles/:id' component={NivelCrearContainer} />
                <ProtectedRoute exact path='/niveles/:id/editar' component={NivelCrearContainer} />
                <ProtectedRoute exact path='/niveles' component={NivelListContainer} /> 

                <ProtectedRoute exact path='/grados/crear' component={GradoCrearContainer} />
                <ProtectedRoute exact path='/grados/:id' component={GradoCrearContainer} />
                <ProtectedRoute exact path='/grados/:id/editar' component={GradoCrearContainer} />
                <ProtectedRoute exact path='/grados' component={GradoListContainer} />                 

                <ProtectedRoute exact path='/reporte' component={Reporte} />

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
