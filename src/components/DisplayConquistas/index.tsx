import { useEffect, useState } from "react"
import { api } from "../../api/axios";


type Conquista = {
    id: number,
    nome: string,
    descricao: string,
    iconeUrl: string,
    desbloqueada: boolean
}



export default function DisplayConquistas() {

    const [conquistas, setConquistas] = useState<Conquista[]>()

    useEffect(() => {

        const buscarConquistas = async () => {
            try {
                const response =  await api.get(`api/conquistas`)
                setConquistas(response.data as Conquista[])
            } catch (error) {
                console.error("Erro ao buscar Conquistas", error);
            }
        }

        buscarConquistas()

    }, [])

    return (

        <div className="flex flex-col gap-y-3.5">
            <h3 className="text-[28px] select-none">Conquistas</h3>

            <div className="flex flex-row gap-x-6">

                {
                    conquistas?.map((conquista, index) => (
                        <Conquista key={index} conquista={conquista} />
                    ))
                }

            </div>
        </div>
    )
}


type Prop = {
    conquista:Conquista
}

function Conquista({ conquista }: Prop) {
    const classeDesbloqueada = "bg-amber-400 text-black";
    const classeBloqueada = "bg-gray-300 text-gray-500 grayscale opacity-60";

    return (
        <div
            className={`flex flex-col  justify-between items-center w-28 h-40 rounded select-none
                outline-4 outline-orange-400 
                ${conquista.desbloqueada ? classeDesbloqueada : classeBloqueada}`}
        >
            <img
                className={`w-14 mt-2 ${!conquista.desbloqueada ? "grayscale opacity-50" : ""}`}
                src={conquista.iconeUrl}
                alt={conquista.nome}
            />

            <p className="text-[14px] font-semibold text-center">{conquista.nome}</p>

            <p className="text-[12px] text-center mb-1.5">{conquista.desbloqueada ? conquista.descricao : "???"}</p>
        </div>
    );
}
