import { useMemo, useState } from "react";
import useCotizador from "../../hooks/useCotizador";
import { useT } from "../../context/LanguageContext";
import Spinner from "../Spinner";
import { MARCAS, MARCAS_MODELOS, PLANES, CIUDADES, USOS } from "../../constants";
import { exportarPDF } from "../../services/pdf";
import { compartir } from "../../services/share";

const Item = ({ label, value }) => (
    <div className="py-1.5 flex justify-between items-baseline border-b border-slate-200/60 dark:border-slate-700/60 last:border-0">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">{label}</span>
        <span className="font-medium text-sm text-slate-800 dark:text-slate-100">{value}</span>
    </div>
);

const StepResumen = () => {
    const {
        datos, resultado, total, cargando, codigoGuardado,
        anteriorPaso, cotizarSeguro, guardar, reset,
    } = useCotizador();

    const t = useT();
    const [toast, setToast] = useState('');

    const nombre = (lista, id) => lista.find(x => x.id === id)?.nombre ?? '—';
    const nombreModelo = useMemo(
        () => (MARCAS_MODELOS[datos.marca] || []).find(m => m.id === datos.modelo)?.nombre ?? '—',
        [datos.marca, datos.modelo]
    );

    const mostrarToast = msg => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const handleGuardar = () => {
        const codigo = guardar();
        if (codigo) mostrarToast(t('toast.guardada', codigo));
    };

    const handlePDF = async () => {
        mostrarToast(t('toast.generandoPDF'));
        await exportarPDF(datos, total, codigoGuardado);
        mostrarToast(t('toast.pdfDescargado'));
    };

    const handleCompartir = async () => {
        const codigo = codigoGuardado || guardar();
        if (!codigo) return;
        const r = await compartir(codigo);
        if (r === 'shared') mostrarToast(t('toast.compartido'));
        else if (r === 'copied') mostrarToast(t('toast.copiado'));
        else mostrarToast(t('toast.errorCompartir'));
    };

    return (
        <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">{t('resumen.titulo')}</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">STEP_04 / 04</p>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-md p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <Item label="MARCA" value={nombre(MARCAS, datos.marca)} />
                <Item label="MODELO" value={nombreModelo} />
                <Item label="YEAR" value={datos.year} />
                <Item label="VALUE" value={`$${Number(datos.valorVehiculo).toLocaleString('en-US')}`} />
                <Item label="AGE" value={`${datos.edadConductor}`} />
                <Item label="CITY" value={nombre(CIUDADES, datos.ciudad)} />
                <Item label="USAGE" value={nombre(USOS, datos.uso)} />
                <Item label="PLAN" value={nombre(PLANES, datos.plan)} />
            </div>

            {cargando && <Spinner />}

            {!cargando && total > 0 && (
                <>
                    <div className="relative text-center bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-500/10 dark:to-emerald-500/10 border border-emerald-400/50 dark:border-emerald-500/40 rounded-md p-5 mb-4 overflow-hidden">
                        <span className="absolute top-2 left-2 font-mono text-[9px] tracking-widest text-emerald-600 dark:text-emerald-400">█ QUOTE</span>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1 mt-2">{t('resumen.totalAnual')}</div>
                        <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight break-all">{resultado}</div>
                        {codigoGuardado && (
                            <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 mt-3">
                                {t('resumen.codigo')}: <span className="text-sky-600 dark:text-sky-300 font-bold">{codigoGuardado}</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        <button type="button" onClick={handleGuardar}
                            disabled={!!codigoGuardado}
                            className="bg-sky-500 hover:bg-sky-600 text-white font-mono text-xs uppercase tracking-wider py-2 px-3 rounded-md transition-all hover:shadow-[0_0_12px_rgba(14,165,233,0.4)] disabled:opacity-40 disabled:hover:shadow-none">
                            {codigoGuardado ? t('botones.guardada') : t('botones.guardar')}
                        </button>
                        <button type="button" onClick={handlePDF}
                            className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono text-xs uppercase tracking-wider py-2 px-3 rounded-md transition-colors">
                            {t('botones.pdf')}
                        </button>
                        <button type="button" onClick={handleCompartir}
                            className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono text-xs uppercase tracking-wider py-2 px-3 rounded-md transition-colors">
                            {t('botones.compartir')}
                        </button>
                        <button type="button" onClick={reset}
                            className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-mono text-xs uppercase tracking-wider py-2 px-3 rounded-md transition-colors">
                            {t('botones.nueva')}
                        </button>
                    </div>
                </>
            )}

            {!cargando && total === 0 && (
                <div className="flex justify-between">
                    <button type="button" onClick={anteriorPaso}
                        className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono text-sm tracking-wider uppercase py-2 px-6 rounded-md transition-colors">
                        {t('botones.anterior')}
                    </button>
                    <button type="button" onClick={cotizarSeguro}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-sm tracking-wider uppercase py-2 px-6 rounded-md shadow-[0_0_0_1px_rgba(16,185,129,0.5)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                        ▶ {t('botones.cotizar')}
                    </button>
                </div>
            )}

            {toast && (
                <div role="status" aria-live="polite"
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-800 text-sky-300 border border-sky-500/40 px-4 py-2 rounded-md shadow-2xl z-50 text-sm font-mono">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default StepResumen;
