import { createContext, useEffect, useState } from "react"
import { api } from "../api/axios"

export interface IUsuario {
    nome: string,
    email: string,
    senha: string,
    role: Role,
    id?: number,
    tituloJogador?: string,
    imagemPerfilUrl?: string,
}

export enum Role {
    USUARIO_COMUM = 'usuario_comum',
    ADMIN = 'admin'
}

export interface getUsuario {
    message: string
    usuario: IUsuario
}



interface signinResponse {
    token: string,
    id: string
}

interface IAuthContext {
    user: IUsuario | null
    logar: (email:string, password:string) => Promise<void>
    deslogar: () => Promise<void>
    atualizarUser: (user: IUsuario) => void;
    setUser: (user: IUsuario) => void;
}

export const AuthContext = createContext({} as IAuthContext)
setUser: () =>{}

type Props = {
    children: React.ReactNode
}

export function AuthProvider({children}:Props) {

    const [user, setUser] = useState<IUsuario | null>(null)


    async function logar(email:string, senha:string) {
        try {
            const data = {
                email: email,
                senha: senha
            }
            const response =  await api.post('/api/auth/login', data)

            if (response.status === 200) {
                console.log(response.data)
                const {token, id} = response.data as signinResponse
                api.defaults.headers.common.Authorization = `Bearer ${token}`

                const getUserResponse = await api.get(`/api/users/${id}`)
                
                
                const { usuario } = getUserResponse.data as getUsuario
                // const id = Number(userId)
                // const user = {...userData, id:id}
                setUser(usuario)

                localStorage.setItem('auth.token', token)
                localStorage.setItem('auth.user', JSON.stringify(usuario))
            }
        } catch (error) {
            console.error(error)
        }
    }


    async function deslogar() {
        setUser(null)
        localStorage.removeItem('auth.token')
        localStorage.removeItem('auth.user')
        api.defaults.headers.common.Authorization = undefined //maybe it's wrong...
    }


    function atualizarUser(user: IUsuario) {
        setUser(user);
        localStorage.setItem('auth.user', JSON.stringify(user));
    }


    useEffect(() => {
        const token = localStorage.getItem('auth.token')
        // console.log(token)
        const user = localStorage.getItem('auth.user')
        // console.log(user)

        if (token && user) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            setUser(JSON.parse(user))
        }
    }, [])



    return (
        <AuthContext.Provider value={{user, logar, deslogar, atualizarUser, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}