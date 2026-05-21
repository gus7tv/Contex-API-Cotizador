import empty from '../img/empty.svg';
import { useT } from '../context/LanguageContext';

const EmptyState = () => {
  const t = useT();
  return (
    <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 opacity-80">
      <img className="w-2/5 mx-auto opacity-50 dark:opacity-30" src={empty} alt="" />
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-sky-400/70 text-center mt-6">
        // {t('empty.seleccionaMarca')}
      </p>
    </div>
  );
};

export default EmptyState;
