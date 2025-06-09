import { useLocation, useNavigate } from "react-router-dom";
import { IFase, IFaseState } from "../../interfaces/Fase";
import { useEffect, useState } from "react";
import ProximoButton from "../../components/Resultado/ProximoButton";
import DisplayRecompensas from "../../components/Resultado/DisplayRecompensas";
import { api } from "../../api/axios";



export default function Resultado() {

    const navigate = useNavigate();

    const location = useLocation();
    const fase = location.state?.fase as IFase
    const faseState = location.state?.faseState as IFaseState

    const [estrelas, setEstrelas] = useState(0)
    const [faseConcluida, setFaseConcluida] = useState(false)
    const [pontuacaoTotal, setPontuacaoTotal] = useState(0)


    useEffect(() => {
        if (!faseState) {
            navigate('/campanha')
            return
        }

        const salvarPontuacao = async (valor:number) => {
            try {
                if (valor > 0) {
                    const response =  await api.patch(`/api/fase/${fase.id}/pontuacao`, { valor })
                }
            } catch (error) {
                console.error("Erro ao salvar Fase no Banco", error);
            }
        }

        salvarPontuacao(faseState.pontuacaoTotal)


        setEstrelas(faseState.respostasCorretas)
        setFaseConcluida(faseState.faseConcluida)
        setPontuacaoTotal(faseState.pontuacaoTotal)

    }, [faseState, navigate])



    return (
        <div className="bg-[url('/images/universo.jpg')] w-screen h-screen overflow-clip flex flex-col justify-around items-center">
            <p className="text-white select-none">recompensas</p>

            <DisplayRecompensas 
                estrelas={estrelas} 
                faseConcluida={faseConcluida} 
                pontuacaoTotal={pontuacaoTotal} />

            <ProximoButton />
        </div>
    )
}

