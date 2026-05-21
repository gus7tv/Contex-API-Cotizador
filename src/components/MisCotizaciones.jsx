import { useState } from "react";
import { useT } from "../context/LanguageContext";
import { listarCotizaciones, eliminarCotizacion } from "../services/storage";
import { urlCotizacion } from "../services/share";
import { MARCAS, MARCAS_MODELOS, PLANES } from "../constants";
import { formatearDinero } from "../helpers";

const nombre = (lista, id) => lista.find(x => x.id === id)?.nombre ?? '—';
const nombreModelo = (marca, modelo) =>
    (MARCAS_MODELOS[marca] || []).find(m => m.id === modelo)?.nombre ?? '—';

const MisCotizaciones = ({ onClose }) => {
    const [items, setItems] = useState(() => listarCotizaciones());
    const t = useT();

    const handleEliminar = codigo => {
        eliminarCotizacion(codigo);
        setItems(listarCotizaciones());
    };

    const handleAbrir = codigo => {
        window.location.href = urlCotizacion(codigo);
    };

    return (
        <div role="dialog" aria-modal="true" aria-label={t('app.misCotizaciones')}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-40 p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col relative">
                {/* Esquinas tech */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-sky-500/60 -translate-x-px -translate-y-px" />
                <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-sky-500/60 translate-x-px -translate-y-px" />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-sky-500/60 -translate-x-px translate-y-px" />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-sky-500/60 translate-x-px translate-y-px" />

                <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                        <h2 className="font-mono text-sm uppercase tracking-widest text-slate-700 dark:text-slate-200">{t('app.misCotizaciones')}</h2>
                    </div>
                    <button type="button" onClick={onClose}
                        aria-label={t('aria.cerrar')}
                        className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 text-2xl leading-none transition-colors">
                        ×
                    </button>
                </header>

                <div className="overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <p className="text-center font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 py-12">
                            // {t('resumen.sinCotizaciones')}
                        </p>
                    ) : (
                        <ul className="space-y-2">
                            {items.map(c => (
                                <li key={c.codigo}
                                    className="border border-slate-200 dark:border-slate-700 rounded-md p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:border-sky-400 dark:hover:border-sky-500/50 hover:bg-sky-50/30 dark:hover:bg-sky-500/5 transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                                            <span className="font-mono font-bold text-sky-600 dark:text-sky-300 text-sm">
                                                {c.codigo}
                                            </span>
                                            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">
                                                {new Date(c.fecha).toLocaleDateString('es-MX')}
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-700 dark:text-slate-200 truncate">
                                            {nombre(MARCAS, c.datos.marca)} · {nombreModelo(c.datos.marca, c.datos.modelo)} · {c.datos.year} · {nombre(PLANES, c.datos.plan)}
                                        </div>
                                        <div className="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">
                                            {formatearDinero(c.total)}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button type="button" onClick={() => handleAbrir(c.codigo)}
                                            className="flex-1 sm:flex-initial bg-sky-500 hover:bg-sky-600 text-white font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 rounded">
                                            {t('botones.abrir')}
                                        </button>
                                        <button type="button" onClick={() => handleEliminar(c.codigo)}
                                            aria-label={`${t('botones.eliminar')} ${c.codigo}`}
                                            className="flex-1 sm:flex-initial bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/50 font-mono text-[10px] uppercase tracking-wider py-1.5 px-3 rounded transition-colors">
                                            {t('botones.eliminar')}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MisCotizaciones;
