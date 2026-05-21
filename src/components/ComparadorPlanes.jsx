import { useMemo } from "react";
import useCotizador from "../hooks/useCotizador";
import { useT } from "../context/LanguageContext";
import { PLANES, TODAS_COBERTURAS } from "../constants";
import { cotizar } from "../domain/cotizacion";
import { formatearDinero } from "../helpers";

const ComparadorPlanes = () => {
    const { datos, handleChangeDatos } = useCotizador();
    const t = useT();

    const datosBasicosListos =
        datos.marca && datos.modelo && datos.year && datos.valorVehiculo &&
        datos.edadConductor && datos.ciudad && datos.uso;

    const preciosPorPlan = useMemo(() => {
        if (!datosBasicosListos) return {};
        return Object.fromEntries(
            PLANES.map(p => [
                p.id,
                cotizar({ ...datos, plan: p.id }).total,
            ])
        );
    }, [datos, datosBasicosListos]);

    const seleccionarPlan = id => {
        handleChangeDatos({ target: { name: 'plan', value: id } });
    };

    return (
        <section className="mt-4">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3">
                {t('plan.comparar')}
            </h3>

            {!datosBasicosListos && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    {t('plan.completaDatos')}
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLANES.map(plan => {
                    const seleccionado = datos.plan === plan.id;
                    const precio = preciosPorPlan[plan.id];
                    return (
                        <button
                            type="button"
                            key={plan.id}
                            onClick={() => seleccionarPlan(plan.id)}
                            aria-pressed={seleccionado}
                            className={[
                                "text-left rounded-md p-4 border transition-all relative",
                                seleccionado
                                    ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10 ring-tech"
                                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-sky-400 dark:hover:border-sky-500/50",
                            ].join(" ")}
                        >
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="font-bold text-sm uppercase tracking-wide text-slate-800 dark:text-slate-100">
                                    {plan.nombre}
                                </span>
                                {seleccionado && (
                                    <span className="font-mono text-[9px] tracking-widest bg-sky-500 text-white px-1.5 py-0.5 rounded uppercase">
                                        {t('plan.elegido')}
                                    </span>
                                )}
                            </div>
                            <div className="font-mono text-2xl font-black text-slate-900 dark:text-slate-50 mb-3">
                                {precio !== undefined ? formatearDinero(precio) : '—'}
                            </div>
                            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                                {TODAS_COBERTURAS.map(c => {
                                    const incluye = plan.coberturas.includes(c);
                                    return (
                                        <li key={c} className="flex items-start gap-1.5">
                                            <span aria-hidden="true" className={incluye ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-600'}>
                                                {incluye ? '✓' : '✗'}
                                            </span>
                                            <span className={incluye ? '' : 'line-through text-slate-400 dark:text-slate-500'}>
                                                {c}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default ComparadorPlanes;
