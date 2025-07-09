import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";
import Cadastro from "./pages/Cadastro";
import Campanha from "./pages/Campanha";
import DescricaoFase from "./pages/DescricaoFase";
import Fase from "./pages/Fase";
import Resultado from "./pages/Resultado";
import Ranking from "./pages/Ranking";
import { useEffect } from "react";
import Perfil from "./pages/Perfil";

export function Router() {
    const {user} = useAuth()
    const isLogged = !!user
    const location = useLocation()

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged && location.pathname === "/") {
            navigate("/campanha");
        }
    }, [isLogged, location, navigate]);



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
                    <Route path="/fase/:id/questoes" element={ <Fase /> } />
                    <Route path="/fase/resultado" element={ <Resultado /> } />
                    <Route path="/ranking" element={ <Ranking /> } />
                    <Route path="/usuario/:id" element={ <Perfil /> } />
                    </>
                )
            }
        </Routes>
    )
}