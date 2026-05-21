/**
 * @typedef {Object} Datos
 * @property {string} marca - slug (europeo|americano|asiatico)
 * @property {string} modelo - id del modelo dentro de la marca
 * @property {string|number} year - año del vehículo
 * @property {string|number} valorVehiculo - valor en USD del vehículo
 * @property {string|number} edadConductor - edad del conductor en años
 * @property {string} ciudad - slug de la ciudad
 * @property {string} uso - slug del uso (particular|comercial|rideshare)
 * @property {string} plan - slug del plan
 */

/**
 * @typedef {Object} CatalogosCotizacion
 * @property {Record<string, number>} [marcaFactor]
 * @property {Record<string, number>} [planFactor]
 * @property {number} [baseDefault]   - usado solo si no hay valorVehiculo
 * @property {number} [tasaSobreValor] - % del valor del vehículo que se cobra como base (default 0.04)
 * @property {number} [descuentoPorYearPct] - % de descuento por año de antigüedad (default 3)
 */

/**
 * @typedef {Object} Desglose
 * @property {number} base
 * @property {number} antiguedad
 * @property {number} factorAntiguedad
 * @property {number} factorEdad
 * @property {number} factorCiudad
 * @property {number} factorUso
 * @property {number} factorMarca
 * @property {number} factorModelo
 * @property {number} factorPlan
 */

/**
 * @typedef {Object} Cotizacion
 * @property {number} total
 * @property {Desglose} desglose
 */

export {};
