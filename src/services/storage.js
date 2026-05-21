const KEY = 'cotizaciones-v1';

/**
 * @typedef {Object} CotizacionGuardada
 * @property {string} codigo
 * @property {import('../domain/types').Datos} datos
 * @property {number} total
 * @property {string} fecha - ISO string
 */

function leerTodo() {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function escribirTodo(map) {
    localStorage.setItem(KEY, JSON.stringify(map));
}

function nuevoCodigo() {
    return Math.random().toString(36).slice(2, 8).toUpperCase();
}

/**
 * Guarda una cotización y retorna el código generado.
 * @param {import('../domain/types').Datos} datos
 * @param {number} total
 * @returns {string} código de 6 caracteres
 */
export function guardarCotizacion(datos, total) {
    const map = leerTodo();
    let codigo = nuevoCodigo();
    while (map[codigo]) codigo = nuevoCodigo();
    map[codigo] = { codigo, datos, total, fecha: new Date().toISOString() };
    escribirTodo(map);
    return codigo;
}

/**
 * @param {string} codigo
 * @returns {CotizacionGuardada|null}
 */
export function recuperarCotizacion(codigo) {
    if (!codigo) return null;
    return leerTodo()[codigo.toUpperCase()] ?? null;
}

/**
 * @returns {CotizacionGuardada[]} ordenadas por fecha desc
 */
export function listarCotizaciones() {
    return Object.values(leerTodo()).sort(
        (a, b) => b.fecha.localeCompare(a.fecha)
    );
}

/**
 * @param {string} codigo
 */
export function eliminarCotizacion(codigo) {
    const map = leerTodo();
    delete map[codigo];
    escribirTodo(map);
}
