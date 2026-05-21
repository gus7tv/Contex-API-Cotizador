import { useLang } from "../context/LanguageContext";

const LanguageToggle = () => {
    const { lang, setLang } = useLang();
    const otro = lang === 'es' ? 'en' : 'es';

    return (
        <button
            type="button"
            onClick={() => setLang(otro)}
            aria-label={`Switch to ${otro === 'es' ? 'Español' : 'English'}`}
            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-sky-400 text-xs font-mono font-bold w-10 h-10 rounded-md border border-slate-200 dark:border-slate-700 uppercase transition-colors"
        >
            {otro}
        </button>
    );
};

export default LanguageToggle;
