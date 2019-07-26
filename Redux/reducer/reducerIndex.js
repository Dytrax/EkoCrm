import {combineReducers} from 'redux'
import cliente from './crearSolicitudReducer'
import typeSolicitud from './userSolicitudReducer'
export default combineReducers({
    cliente,
    typeSolicitud
})