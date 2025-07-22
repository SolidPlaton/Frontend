import { useLocation, useNavigate } from "react-router-dom";
import { IFaseState } from "../../interfaces/Fase";
import { useContext, useEffect, useState } from "react";
import ProximoButton from "../../components/Resultado/ProximoButton";
import DisplayRecompensas from "../../components/Resultado/DisplayRecompensas";
import { api } from "../../api/axios";
import { DialogosContext } from "../../context/Dialogos";
import DialogosEnum from "../../enums/Dialogos";
import { fase } from "../../types/fase";
import MediaTempoUtilizado from "../../components/Resultado/MediaTempoUtilizado";
import { atualizarConquistas } from "../../utils/atualizarConquistas";



export default function Resultado() {

    const navigate = useNavigate();

    const {triggerDialog} = useContext(DialogosContext)

    const location = useLocation();
    const fase:fase = location.state?.fase
    const faseState = location.state?.faseState as IFaseState

    const [estrelas, setEstrelas] = useState(0)
    const [faseConcluida, setFaseConcluida] = useState(false)
    const [pontuacaoTotal, setPontuacaoTotal] = useState(0)


    useEffect(() => {
        if (!faseState) {
            navigate('/campanha')
            return
        }

        const salvarDadosDaFase = async () => {
            try {
                const promises = []

                if (faseState.pontuacaoTotal > 0) {
                    promises.push(api.patch(`/api/fase/${fase.id}/pontuacao`, { valor: faseState.pontuacaoTotal }))
                }

                if (faseState.respostasCorretas > 0) {
                    promises.push(api.patch(`/api/fase/${fase.id}/estrelas`, { quantidade: faseState.respostasCorretas }))
                }

                await Promise.all(promises)

                atualizarConquistas()
            } catch (error) {
                console.error("Erro ao salvar Fase no Banco", error);
            }
        }

        salvarDadosDaFase()

        setEstrelas(faseState.respostasCorretas)
        setFaseConcluida(faseState.faseConcluida)
        setPontuacaoTotal(faseState.pontuacaoTotal)

        switch (faseState.respostasCorretas) {
            case 1: 
                triggerDialog(DialogosEnum.uma_estrela)
                break;
            case 2:
                triggerDialog(DialogosEnum.duas_estrelas)
                break;
            case 3:
                triggerDialog(DialogosEnum.tres_estrelas)
                break;
            case 4:
                triggerDialog(DialogosEnum.quatro_estrelas)
                break;
            case 5:
                triggerDialog(DialogosEnum.cinco_estrelas)
                break;
        }

    }, [faseState, navigate])



    return (
        <div className="bg-[url('/images/universo.jpg')] w-screen h-screen overflow-clip flex flex-col justify-around items-center">
            <p className="text-white select-none">recompensas</p>

            <div className="flex flex-col items-center gap-y-3.5">
                <DisplayRecompensas
                    fase={fase}
                    estrelas={estrelas}
                    faseConcluida={faseConcluida}
                    pontuacaoTotal={pontuacaoTotal} />
                <MediaTempoUtilizado respostas={faseState.respostas}/>
            </div>

            <ProximoButton />
        </div>
    )
}

