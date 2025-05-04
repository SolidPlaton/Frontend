import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import Cadastro from "./pages/Cadastro";
import Campanha from "./pages/Campanha";
import DescricaoFase from "./pages/DescricaoFase";
import Questoes from "./pages/Questoes";

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
                    <Route index element={<Login />} />
                    <Route index path="/login" element={ <Login /> } />
                    <Route path="/cadastro" element={ <Cadastro /> } />
                    </>
                )
                :
                (
                    <>
                    <Route index element={ <Campanha /> } />
                    <Route path="/campanha" element={ <Campanha /> } />
                    <Route path="/fase/:id" element={ <DescricaoFase /> } />
                    <Route path="/fase/:id/questoes" element={ <Questoes /> } />
                    </>
                )
            }
        </Routes>
    )
}