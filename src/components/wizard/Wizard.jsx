import { AnimatePresence, motion } from "framer-motion";
import useCotizador from "../../hooks/useCotizador";
import ProgressBar from "./ProgressBar";
import StepVehiculo from "./StepVehiculo";
import StepConductor from "./StepConductor";
import StepPlan from "./StepPlan";
import StepResumen from "./StepResumen";

const PASOS_COMPONENTES = [StepVehiculo, StepConductor, StepPlan, StepResumen];

const Wizard = () => {
    const { paso } = useCotizador();
    const StepActual = PASOS_COMPONENTES[paso] ?? StepVehiculo;

    return (
        <div>
            <ProgressBar />
            <AnimatePresence mode="wait">
                <motion.div
                    key={paso}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <StepActual />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Wizard;
