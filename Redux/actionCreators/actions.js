export const setClient = client => ({
    type: 'SET_CLIENT',
    payload: client,
});

export const setTipoSolicitud = tipoSolicitud => ({
    type: 'SET_TIPO_SOLICITUD',
    payload: tipoSolicitud,
});

export const emptySolicitud = () => ({
    type: 'EMPTY_TIPO_SOLICITUD',
    payload: [],
});  