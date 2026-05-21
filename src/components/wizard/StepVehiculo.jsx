import useCotizador from "../../hooks/useCotizador";
import { useT } from "../../context/LanguageContext";
import { MARCAS, MARCAS_MODELOS, YEARS } from "../../constants";
import { formatearDinero } from "../../helpers";

const labelClass = "block mb-2 font-mono font-medium text-[10px] tracking-widest text-sky-600 dark:text-sky-400 uppercase";
const inputClass = "w-full p-3 bg-white dark:bg-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-md focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-colors disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400";

const StepVehiculo = () => {
    const { datos, handleChangeDatos, siguientePaso } = useCotizador();
    const t = useT();
    const modelos = MARCAS_MODELOS[datos.marca] || [];
    const valido = datos.marca && datos.modelo && datos.year && datos.valorVehiculo;

    return (
        <div>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-1">{t('vehiculo.titulo')}</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">STEP_01 / 04</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                    <label htmlFor="marca" className={labelClass}>{t('vehiculo.marca')}</label>
                    <select id="marca" name="marca" className={inputClass}
                        onChange={handleChangeDatos} value={datos.marca}>
                        <option value="">{t('vehiculo.seleccionar')}</option>
                        {MARCAS.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="modelo" className={labelClass}>{t('vehiculo.modelo')}</label>
                    <select id="modelo" name="modelo" className={inputClass}
                        onChange={handleChangeDatos} value={datos.modelo} disabled={!datos.marca}>
                        <option value="">
                            {datos.marca ? t('vehiculo.seleccionar') : t('vehiculo.elegirMarcaPrimero')}
                        </option>
                        {modelos.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div>
                    <label htmlFor="year" className={labelClass}>{t('vehiculo.year')}</label>
                    <select id="year" name="year" className={inputClass}
                        onChange={handleChangeDatos} value={datos.year}>
                        <option value="">{t('vehiculo.seleccionar')}</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="valorVehiculo" className={labelClass}>{t('vehiculo.valor')}</label>
                    <input id="valorVehiculo" name="valorVehiculo" type="number"
                        min="0" step="500" placeholder="20000" className={inputClass}
                        onChange={handleChangeDatos} value={datos.valorVehiculo} />
                    {Number(datos.valorVehiculo) > 0 && (
                        <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">
                            {formatearDinero(Number(datos.valorVehiculo))}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" onClick={siguientePaso} disabled={!valido}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-mono text-sm tracking-wider uppercase py-2 px-6 rounded-md shadow-[0_0_0_1px_rgba(14,165,233,0.5)] hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
                    {t('botones.siguiente')}
                </button>
            </div>
        </div>
    );
};

export default StepVehiculo;
