import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
    const { theme, toggle } = useTheme();
    const esOscuro = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={esOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={esOscuro ? 'Modo claro' : 'Modo oscuro'}
            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-sky-400 w-10 h-10 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-lg transition-colors"
        >
            {esOscuro ? '☀' : '☾'}
        </button>
    );
};

export default DarkModeToggle;
