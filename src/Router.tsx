import { Routes } from "react-router-dom";

export function Router() {

    return (
            <Routes location={location} key={location.pathname}>
                {/* Adicionar paginas da aplicacao aqui!  */}
            </Routes>
    )
}