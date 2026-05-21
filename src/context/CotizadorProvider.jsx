import { createContext, useReducer, useCallback, useEffect } from 'react';
import { cotizar } from '../domain/cotizacion';
import { formatearDinero } from '../helpers';
import { recuperarCotizacion, guardarCotizacion } from '../services/storage';
import { leerCodigoDeURL } from '../services/share';

const CotizadorContext = createContext();

export const PASOS = ['vehiculo', 'conductor', 'plan', 'resumen'];
export const PASO_RESUMEN = 3;

const ESTADO_INICIAL = {
    datos: {
        marca: '',
        modelo: '',
        year: '',
        valorVehiculo: '',
        edadConductor: '',
        ciudad: '',
        uso: '',
        plan: '',
    },
    paso: 0,
    error: '',
    resultado: 0,    // string formateado para mostrar
    total: 0,        // número para PDF / storage
    codigoGuardado: '',
    cargando: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_CAMPO': {
            const nextDatos = { ...state.datos, [action.name]: action.value };
            if (action.name === 'marca') nextDatos.modelo = '';
            return {
                ...state,
                datos: nextDatos,
                error: '',
                // si cambia algo después de cotizar, invalidar resultado y código
                resultado: 0,
                total: 0,
                codigoGuardado: '',
            };
        }
        case 'SET_ERROR':
            return { ...state, error: action.error };
        case 'SET_PASO':
            return { ...state, paso: action.paso };
        case 'SIGUIENTE':
            return { ...state, paso: Math.min(state.paso + 1, PASOS.length - 1) };
        case 'ANTERIOR':
            return { ...state, paso: Math.max(state.paso - 1, 0) };
        case 'COTIZAR_INICIO':
            return { ...state, cargando: true, resultado: 0, total: 0, error: '' };
        case 'COTIZAR_EXITO':
            return {
                ...state,
                cargando: false,
                resultado: action.resultado,
                total: action.total,
            };
        case 'GUARDAR_CODIGO':
            return { ...state, codigoGuardado: action.codigo };
        case 'HIDRATAR':
            return {
                ...ESTADO_INICIAL,
                datos: action.datos,
                total: action.total,
                resultado: formatearDinero(action.total),
                codigoGuardado: action.codigo,
                paso: PASO_RESUMEN,
            };
        case 'RESET':
            return ESTADO_INICIAL;
        default:
            return state;
    }
}

const CotizadorProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, ESTADO_INICIAL);

    // Rehidratar desde ?cot=XXXXXX al montar
    useEffect(() => {
        const codigo = leerCodigoDeURL();
        if (!codigo) return;
        const guardada = recuperarCotizacion(codigo);
        if (guardada) {
            dispatch({
                type: 'HIDRATAR',
                datos: guardada.datos,
                total: guardada.total,
                codigo: guardada.codigo,
            });
        }
    }, []);

    const handleChangeDatos = useCallback(e => {
        dispatch({ type: 'SET_CAMPO', name: e.target.name, value: e.target.value });
    }, []);

    const setError = useCallback(error => {
        dispatch({ type: 'SET_ERROR', error });
    }, []);

    const setPaso = useCallback(paso => dispatch({ type: 'SET_PASO', paso }), []);
    const siguientePaso = useCallback(() => dispatch({ type: 'SIGUIENTE' }), []);
    const anteriorPaso = useCallback(() => dispatch({ type: 'ANTERIOR' }), []);

    const cotizarSeguro = useCallback(() => {
        dispatch({ type: 'COTIZAR_INICIO' });
        setTimeout(() => {
            const { total } = cotizar(state.datos);
            dispatch({
                type: 'COTIZAR_EXITO',
                resultado: formatearDinero(total),
                total,
            });
        }, 2000);
    }, [state.datos]);

    const guardar = useCallback(() => {
        if (!state.total) return null;
        const codigo = guardarCotizacion(state.datos, state.total);
        dispatch({ type: 'GUARDAR_CODIGO', codigo });
        return codigo;
    }, [state.datos, state.total]);

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' });
        // limpiar query string si tenía ?cot=
        if (window.location.search) {
            window.history.replaceState({}, '', window.location.pathname);
        }
    }, []);

    return (
        <CotizadorContext.Provider
            value={{
                datos: state.datos,
                paso: state.paso,
                error: state.error,
                resultado: state.resultado,
                total: state.total,
                codigoGuardado: state.codigoGuardado,
                cargando: state.cargando,
                handleChangeDatos,
                setError,
                setPaso,
                siguientePaso,
                anteriorPaso,
                cotizarSeguro,
                guardar,
                reset,
            }}
        >
            {children}
        </CotizadorContext.Provider>
    );
};

export { CotizadorProvider };
export default CotizadorContext;
