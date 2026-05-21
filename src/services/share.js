/**
 * Construye la URL de la cotización con el código en query string.
 */
export function urlCotizacion(codigo) {
    const url = new URL(window.location.href);
    url.search = `?cot=${codigo}`;
    return url.toString();
}

/**
 * Lee el código de cotización del query string actual (si existe).
 * @returns {string|null}
 */
export function leerCodigoDeURL() {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('cot');
}

/**
 * Intenta abrir el diálogo nativo de compartir; si no está disponible,
 * copia la URL al portapapeles.
 * @param {string} codigo
 * @returns {Promise<'shared'|'copied'|'error'>}
 */
export async function compartir(codigo) {
    const url = urlCotizacion(codigo);
    const titulo = 'Mi cotización de seguro';
    const texto = `Mira mi cotización (código ${codigo})`;

    if (navigator.share) {
        try {
            await navigator.share({ title: titulo, text: texto, url });
            return 'shared';
        } catch {
            // usuario canceló o falló; intentar fallback
        }
    }

    try {
        await navigator.clipboard.writeText(url);
        return 'copied';
    } catch {
        return 'error';
    }
}
