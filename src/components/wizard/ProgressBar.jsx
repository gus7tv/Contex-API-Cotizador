import useCotizador from "../../hooks/useCotizador";
import { PASOS } from "../../context/CotizadorProvider";
import { useT } from "../../context/LanguageContext";

const ProgressBar = () => {
    const { paso, setPaso } = useCotizador();
    const t = useT();

    return (
        <ol className="flex items-start mb-6 sm:mb-8 relative" aria-label={t('aria.progreso')}>
            {/* línea base */}
            <span className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
            {/* línea de progreso */}
            <span
                aria-hidden="true"
                className="absolute top-3 sm:top-4 left-3 sm:left-4 h-px bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300"
                style={{ width: `calc((100% - 1.5rem) * ${paso / (PASOS.length - 1)})` }}
            />
            {PASOS.map((slug, i) => {
                const nombre = t(`pasos.${slug}`);
                const activo = i === paso;
                const completado = i < paso;
                const accesible = i <= paso;
                return (
                    <li key={slug} className="flex-1 flex flex-col items-center relative z-10 min-w-0">
                        <button
                            type="button"
                            onClick={() => accesible && setPaso(i)}
                            disabled={!accesible}
                            aria-current={activo ? 'step' : undefined}
                            className={[
                                "w-6 h-6 sm:w-8 sm:h-8 rounded-md font-mono font-bold text-[10px] sm:text-xs flex items-center justify-center transition-all border shrink-0",
                                activo
                                    ? "bg-sky-500 border-sky-400 text-white shadow-[0_0_12px_rgba(14,165,233,0.5)] scale-110"
                                    : completado
                                        ? "bg-sky-500/20 border-sky-500/50 text-sky-600 dark:text-sky-300 cursor-pointer hover:bg-sky-500/30"
                                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed",
                            ].join(" ")}
                        >
                            {completado ? '✓' : String(i + 1).padStart(2, '0')}
                        </button>
                        <span className={[
                            "text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest font-mono mt-1.5 sm:mt-2 text-center truncate max-w-full px-1",
                            activo ? "font-bold text-sky-600 dark:text-sky-300" : "text-slate-500 dark:text-slate-400",
                        ].join(" ")}>
                            {nombre}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
};

export default ProgressBar;
