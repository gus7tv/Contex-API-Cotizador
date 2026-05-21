import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import es from '../i18n/es';
import en from '../i18n/en';

const DICTS = { es, en };
const STORAGE_KEY = 'lang';

const LanguageContext = createContext();

function leerInicial() {
    if (typeof window === 'undefined') return 'es';
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado === 'es' || guardado === 'en') return guardado;
    const navLang = (navigator.language || 'es').slice(0, 2);
    return navLang === 'en' ? 'en' : 'es';
}

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(leerInicial);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const value = useMemo(() => {
        const dict = DICTS[lang];
        // t('vehiculo.titulo') o t('toast.guardada', 'ABC123') si la entrada es función
        const t = (path, ...args) => {
            const v = path.split('.').reduce((acc, k) => acc?.[k], dict);
            if (v === undefined) return path;
            return typeof v === 'function' ? v(...args) : v;
        };
        return { lang, setLang, t };
    }, [lang]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLang = () => useContext(LanguageContext);
export const useT = () => useContext(LanguageContext).t;
