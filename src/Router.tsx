import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import Cadastro from "./pages/Cadastro";
import Campanha from "./pages/Campanha";

export function Router() {
    const {user} = useAuth()
    const isLogged = !!user
    const location = useLocation()

    return (
        <Routes location={location} key={location.pathname}>
            {
                !isLogged ?
                (
                    <>
                    <Route path="/" element={ <Login /> } />
                    <Route path="/cadastro" element={ <Cadastro /> } />
                    </>
                )
                :
                (
                    <>
                    <Route path="/" element={ <Campanha /> } />
                    </>
                )
            }
        </Routes>
    )
}