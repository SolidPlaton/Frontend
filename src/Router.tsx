import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

export function Router() {

    return (
            <Routes location={location} key={location.pathname}>
                {/* Adicionar paginas da aplicacao aqui!  */}
                <Route path="/login" element={ <Login /> } />
            </Routes>
    )
}