import AppSeguro from "./components/AppSeguro";
import { CotizadorProvider } from "./context/CotizadorProvider";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CotizadorProvider>
          <AppSeguro />
        </CotizadorProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
