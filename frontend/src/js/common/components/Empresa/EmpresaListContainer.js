import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/empresa/empresa';
import EmpresaList from './EmpresaList';

const ms2p = (state) => {
    return {
        ...state.empresa,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(EmpresaList);