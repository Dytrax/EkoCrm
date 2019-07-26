const typeSolicitud = (state = {} , action) => {
    switch (action.type) {
        case 'SET_TIPO_SOLICITUD':
            return action.payload 
        case 'EMPTY_TIPO_SOLICITUD':
            return action.payload    
    default:
        return state;
    }
  };

  export default typeSolicitud;
