import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const STORAGE_KEY = 'theme';

function leerInicial() {
    if (typeof window === 'undefined') return 'dark';
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado === 'dark' || guardado === 'light') return guardado;
    return 'dark';
}

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(leerInicial);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
