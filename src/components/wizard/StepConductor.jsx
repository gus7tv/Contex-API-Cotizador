import useCotizador from "../../hooks/useCotizador";
import { useT } from "../../context/LanguageContext";
import { CIUDADES, USOS } from "../../constants";

const labelClass = "block mb-2 font-mono font-medium text-[10px] tracking-widest text-sky-600 dark:text-sky-400 uppercase";
const inputClass = "w-full p-3 bg-white dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-colors";

const StepConductor = () => {
    const { datos, handleChangeDatos, siguientePaso, anteriorPaso } = useCotizador();
    const t = useT();
    const valido = datos.edadConductor && datos.ciudad && datos.uso;

    return (
        <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">{t('conductor.titulo')}</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">STEP_02 / 04</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                    <label htmlFor="edadConductor" className={labelClass}>{t('conductor.edad')}</label>
                    <input id="edadConductor" name="edadConductor" type="number"
                        min="18" max="99" placeholder="35" className={inputClass}
                        onChange={handleChangeDatos} value={datos.edadConductor} />
                </div>
                <div>
                    <label htmlFor="ciudad" className={labelClass}>{t('conductor.ciudad')}</label>
                    <select id="ciudad" name="ciudad" className={inputClass}
                        onChange={handleChangeDatos} value={datos.ciudad}>
                        <option value="">{t('vehiculo.seleccionar')}</option>
                        {CIUDADES.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </select>
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="uso" className={labelClass}>{t('conductor.uso')}</label>
                <select id="uso" name="uso" className={inputClass}
                    onChange={handleChangeDatos} value={datos.uso}>
                    <option value="">{t('vehiculo.seleccionar')}</option>
                    {USOS.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                </select>
            </div>

            <div className="flex justify-between">
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

export default StepConductor;
