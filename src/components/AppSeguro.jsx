import { lazy, Suspense, useState } from "react";
import useCotizador from "../hooks/useCotizador";
import Wizard from "./wizard/Wizard";
import EmptyState from "./EmptyState";
import MisCotizaciones from "./MisCotizaciones";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";
import { SPLINE_BY_MARCA } from "../constants";
import { useT } from "../context/LanguageContext";

const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineFallback = ({ label }) => (
    <div
        aria-label={label}
        className="animate-pulse bg-sky-500/5 border border-sky-500/20 rounded-lg w-full h-full min-h-[300px] sm:min-h-[400px] flex items-center justify-center"
    >
        <span className="font-mono text-xs text-sky-600 dark:text-sky-400 tracking-widest">
            LOADING_3D…
        </span>
    </div>
);

const AppSeguro = () => {
    const { datos } = useCotizador();
    const { marca } = datos;
    const splineScene = SPLINE_BY_MARCA[marca];
    const t = useT();

    const [mostrarMisCotizaciones, setMostrarMisCotizaciones] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 bg-tech-grid text-slate-900 dark:text-slate-100 transition-colors">
            <header className="pt-6 pb-4 sm:pt-8 sm:pb-6 px-4 sm:px-8 md:px-16 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse shrink-0" />
                        <h1 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight text-gradient-tech truncate">
                            {t('app.titulo')}
                        </h1>
                        <span className="hidden lg:inline-block font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-sky-500/40 text-sky-600 dark:text-sky-400 shrink-0">
                            v1.0
                        </span>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                            type="button"
                            onClick={() => setMostrarMisCotizaciones(true)}
                            aria-label={t('app.misCotizaciones')}
                            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 rounded-md border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5"
                        >
                            <span aria-hidden="true">▦</span>
                            <span className="hidden lg:inline">{t('app.misCotizaciones')}</span>
                        </button>
                        <LanguageToggle />
                        <DarkModeToggle />
                    </div>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-8 md:px-16 py-6 sm:py-8">
                <main className="bg-white/90 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-6 md:p-8 shadow-xl relative">
                    {/* esquinas decorativas */}
                    <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-sky-500/60 -translate-x-px -translate-y-px" />
                    <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-sky-500/60 translate-x-px -translate-y-px" />
                    <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-sky-500/60 -translate-x-px translate-y-px" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-sky-500/60 translate-x-px translate-y-px" />
                    <Wizard />
                </main>
                <div className="relative rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-800/50 min-h-[280px] md:min-h-[500px]">
                    {!splineScene
                        ? <EmptyState />
                        : (
                            <Suspense fallback={<SplineFallback label={t('aria.cargandoSpline')} />}>
                                <Spline key={splineScene} scene={splineScene} />
                            </Suspense>
                        )
                    }
                </div>
            </div>

            {mostrarMisCotizaciones && (
                <MisCotizaciones onClose={() => setMostrarMisCotizaciones(false)} />
            )}
        </div>
    );
};

export default AppSeguro;
