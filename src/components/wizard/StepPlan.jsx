import useCotizador from "../../hooks/useCotizador";
import { useT } from "../../context/LanguageContext";
import ComparadorPlanes from "../ComparadorPlanes";

const StepPlan = () => {
    const { datos, siguientePaso, anteriorPaso } = useCotizador();
    const t = useT();
    const valido = !!datos.plan;

    return (
        <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">{t('plan.titulo')}</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">STEP_03 / 04</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                {t('plan.instruccion')}
            </p>

            <ComparadorPlanes />

            <div className="flex justify-between mt-6">
                <button type="button" onClick={anteriorPaso}
                    className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-mono text-sm tracking-wider uppercase py-2 px-6 rounded-md transition-colors">
                    {t('botones.anterior')}
                </button>
                <button type="button" onClick={siguientePaso} disabled={!valido}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-mono text-sm tracking-wider uppercase py-2 px-6 rounded-md shadow-[0_0_0_1px_rgba(14,165,233,0.5)] hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                    {t('botones.siguiente')}
                </button>
            </div>
        </div>
    );
};

export default StepPlan;
