import { useCallback, useContext, useState } from "react"
import DisplayAlternativas from "../DisplayAlternativas"
import ConfirmarButton from "../ConfirmarButton"
import { FaseContext } from "../../../context/FaseContext"
import BackgroundQuestao from "./BackgroundQuestao"
import EstiloQuestao from "./EstiloQuestao"
import FecharButton from "../FecharButton"
import { ProgressoQuestoes } from "../ProgressoQuestoes"
import Timer from "../Timer"
import EnunciadoQuestaoAtual from "../EnunciadoQuestaoAtual"
import { IResposta } from "../../../interfaces/Fase"
import useTimer from "../../../hooks/useTimer"


export default function DisplayQuestoes() {

    const { faseState, corrigirAlternativa, proximaQuestao } = useContext(FaseContext);

    const { timeLeft, pauseTimer, resetTimer } = useTimer(15, enviarResposta);
    const [selecionada, setSelecionada] = useState<number | null>(null);

    const setHandleSelecionada = useCallback((index: number | null) => {
        setSelecionada(index);
    }, []);


    function enviarResposta() {
        pauseTimer()
        
        const resposta:IResposta = {
            questionId: faseState.questaoAtualIndex,
            alternativaSelecionada: selecionada,
            tempoRestante: timeLeft,
        }

        corrigirAlternativa(resposta)
    }

    function handleProximaQuestao() {
        proximaQuestao()
        resetTimer()
    }

    
    return (
        <BackgroundQuestao >
            
                <div className="w-full flex flex-row justify-between items-center sticky top-0 bg-zinc-900/95">
                    <FecharButton />

                    <ProgressoQuestoes />

                    <Timer timeLeft={timeLeft} />
                </div>

                <EstiloQuestao>
                    
                    <EnunciadoQuestaoAtual />
                    
                    
                    <DisplayAlternativas 
                        selecionada={selecionada}
                        setSelecionada={setHandleSelecionada} />
        
                </EstiloQuestao>

                <ConfirmarButton 
                    selecionada={selecionada} 
                    callback={enviarResposta}
                    proxima={handleProximaQuestao} />

        </BackgroundQuestao>
    )
}