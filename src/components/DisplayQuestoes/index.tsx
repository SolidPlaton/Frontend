import { useCallback, useContext, useState } from "react"
import DisplayAlternativas from "../DisplayAlternativas"
import ConfirmarButton from "../ConfirmarButton"
import { FaseContext } from "../../context/FaseContext"
import BackgroundQuestao from "./BackgroundQuestao"
import EstiloQuestao from "./EstiloQuestao"
import FecharButton from "../FecharButton"
import { ProgressoQuestoes } from "../ProgressoQuestoes"
import Timer from "../Timer"
import EnunciadoQuestaoAtual from "../EnunciadoQuestaoAtual"
import { IResposta } from "../../interfaces/Fase"


export default function DisplayQuestoes() {

    const { faseState, corrigirAlternativa } = useContext(FaseContext);

    
    const [selecionada, setSelecionada] = useState<number | null>(null);

    const setHandleSelecionada = useCallback((index: number | null) => {
        setSelecionada(index);
    }, []);


    function enviarResposta() {
        
        const resposta:IResposta = {
            questionId: faseState.questaoAtualIndex,
            alternativaSelecionada: selecionada,
            tempoGasto: 300,
        }

        corrigirAlternativa(resposta)
    }

    
    return (
        <BackgroundQuestao >
            
                <div className="w-full flex flex-row justify-between items-center">
                    <FecharButton />

                    <ProgressoQuestoes />

                    {/* <Timer /> */}
                </div>

                <EstiloQuestao>
                    
                    <EnunciadoQuestaoAtual />
                    
                    
                    <DisplayAlternativas 
                        selecionada={selecionada}
                        setSelecionada={setHandleSelecionada} />
        
                </EstiloQuestao>

                <ConfirmarButton 
                    selecionada={selecionada} 
                    callback={enviarResposta} />

        </BackgroundQuestao>
    )
}