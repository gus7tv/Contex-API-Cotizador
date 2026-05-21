import {
    MARCA_FACTOR,
    PLAN_FACTOR,
    MARCAS_MODELOS,
    CIUDADES,
    USOS,
} from '../constants';

const BASE_DEFAULT = 2000;
const TASA_SOBRE_VALOR = 0.04;
const DESCUENTO_POR_YEAR_PCT = 3;

/**
 * Recarga por edad del conductor.
 * <25 → +25%; 25-69 → 0; >=70 → +15%.
 * @param {number} edad
 * @returns {number}
 */
function factorEdad(edad) {
    if (!Number.isFinite(edad) || edad <= 0) return 1;
    if (edad < 25) return 1.25;
    if (edad >= 70) return 1.15;
    return 1;
}

function factorCiudad(idCiudad) {
    return CIUDADES.find(c => c.id === idCiudad)?.factor ?? 1;
}

function factorUso(idUso) {
    return USOS.find(u => u.id === idUso)?.factor ?? 1;
}

function factorModelo(marca, idModelo) {
    return (MARCAS_MODELOS[marca] || []).find(m => m.id === idModelo)?.factor ?? 1;
}

/**
 * Calcula la cotización del seguro de forma 100% pura.
 *
 * Fórmula:
 *   base = valorVehiculo * tasaSobreValor   (o BASE_DEFAULT si no hay valor)
 *   total = base
 *   total -= base * antiguedad * descuentoPorYearPct%
 *   total *= factorEdad * factorCiudad * factorUso * factorMarca * factorModelo * factorPlan
 *
 * @param {import('./types').Datos} datos
 * @param {import('./types').CatalogosCotizacion} [catalogos]
 * @param {() => number} [nowYear] - inyectable para tests
 * @returns {import('./types').Cotizacion}
 */
export function cotizar(
    datos,
    catalogos = {},
    nowYear = () => new Date().getFullYear()
) {
    const {
        marcaFactor = MARCA_FACTOR,
        planFactor = PLAN_FACTOR,
        baseDefault = BASE_DEFAULT,
        tasaSobreValor = TASA_SOBRE_VALOR,
        descuentoPorYearPct = DESCUENTO_POR_YEAR_PCT,
    } = catalogos;

    const year = Number(datos.year);
    const valor = Number(datos.valorVehiculo);
    const edad = Number(datos.edadConductor);

    const antiguedad = Number.isFinite(year) && year > 0 ? nowYear() - year : 0;
    const base = Number.isFinite(valor) && valor > 0 ? valor * tasaSobreValor : baseDefault;

    const fAnt = Math.max(0, 1 - (antiguedad * descuentoPorYearPct) / 100);
    const fEdad = factorEdad(edad);
    const fCiudad = factorCiudad(datos.ciudad);
    const fUso = factorUso(datos.uso);
    const fMarca = marcaFactor[datos.marca] ?? 1;
    const fModelo = factorModelo(datos.marca, datos.modelo);
    const fPlan = planFactor[datos.plan] ?? 1;

    const total = base * fAnt * fEdad * fCiudad * fUso * fMarca * fModelo * fPlan;

    return {
        total,
        desglose: {
            base,
            antiguedad,
            factorAntiguedad: fAnt,
            factorEdad: fEdad,
            factorCiudad: fCiudad,
            factorUso: fUso,
            factorMarca: fMarca,
            factorModelo: fModelo,
            factorPlan: fPlan,
        },
    };
}
