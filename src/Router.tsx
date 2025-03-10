import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./hooks/useAuth";

export function Router() {
    const {user} = useAuth()
    const isLogged = !!user
    const location = useLocation()

    return (
        <Routes location={location} key={location.pathname}>
            {
                !isLogged ?
                (
                    <Route path="/login" element={ <Login /> } />
                )
                :
                (
                    <></>
                )
            }
        </Routes>
    )
}