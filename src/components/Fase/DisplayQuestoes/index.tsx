import { useCallback, useContext, useEffect, useState } from "react"
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
import { DisplayPontuacao } from "../DisplayPontuacao"


export default function DisplayQuestoes() {

    const { faseState, corrigirAlternativa, proximaQuestao } = useContext(FaseContext);

    const { timeLeft, pauseTimer, resetTimer } = useTimer(faseState.tempoInicial, enviarResposta);
    const [selecionada, setSelecionada] = useState<number | null>(null);

    const [mostrarFeedback, setMostrarFeedback] = useState(false);
    const [respostaAtual, setRespostaAtual] = useState<IResposta | null>(null);


    const correctSound = new Audio("/sound/correct-6033.mp3");
    const wrongSound = new Audio("/sound/wrong-buzzer-6268.mp3");

    useEffect(() => {
        if (mostrarFeedback) {

            if (respostaAtual?.estaCorreta) {
                correctSound.play().catch(() => {});
            } else {
                wrongSound.play().catch(() => {});
            }

            const timeout = setTimeout(() => {
            setMostrarFeedback(false);
            }, 50000);

            return () => clearTimeout(timeout);
        }
    }, [mostrarFeedback]);



    const setHandleSelecionada = useCallback((index: number | null) => {
        setSelecionada(index);
    }, []);


    function enviarResposta() {
        pauseTimer();

        const resposta: IResposta = {
            questionId: faseState.questaoAtualIndex,
            alternativaSelecionada: selecionada,
            tempoRestante: timeLeft,
        };

        const respostaCorrigida = corrigirAlternativa(resposta);
        setRespostaAtual(respostaCorrigida);
        setMostrarFeedback(true);
    }

    function handleProximaQuestao() {
        proximaQuestao()
        resetTimer()
    }

    
    return (
        <BackgroundQuestao >

                <DisplayPontuacao />
            
                <div className="w-full flex flex-row justify-between items-center sticky top-0 bg-zinc-900/80">
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

                
                {mostrarFeedback && respostaAtual && (
                <div className="fixed inset-0 z-50 flex justify-center items-center pointer-events-auto">
                    {/* Camada bloqueadora transparente (sem fundo preto!) */}
                    <div className="fixed inset-0 bg-transparent backdrop-blur-sm pointer-events-auto" />

                    {/* Modal */}
                    <div className="relative bg-gray-800 text-sky-100 rounded-xl p-6 px-15 w-full max-w-sm text-center shadow-xl z-50 border border-zinc-700">
                        <h2 className={`text-xl font-bold mb-2 ${respostaAtual.estaCorreta ? "text-green-400" : "text-red-400"}`}>
                            {respostaAtual.estaCorreta ? "✅ Resposta Correta!" : "❌ Resposta Incorreta"}
                        </h2>

                        <div className="w-full flex justify-center mb-2.5">
                            <p>
                                <strong>
                                    {faseState.tempoInicial - (respostaAtual.tempoRestante ?? 0)} segundos
                                </strong>
                            </p>
                        </div>


                        <div className="flex justify-between">
                            <div className="flex flex-row items-center justify-items-start">
                                <img src="/images/icons/target.svg" alt="coin" />
                                <p className="mb-1">resposta: </p>
                            </div>
                            
                            <p>
                                <strong>
                                    {respostaAtual.valorAcerto || 0} pts
                                </strong>
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex flex-row items-center justify-items-start">
                                <img src="/images/icons/hourglass-medium.svg" alt="hourglass" />
                                <p className="mb-1">bônus de tempo: </p>
                            </div>
                            
                            <p>
                                <strong>
                                    {respostaAtual.bonusTempo ? `${respostaAtual.bonusTempo}` : 0} pts
                                </strong>
                            </p>
                        </div>

                        <div className="flex justify-between">
                            <p className="mb-1">Pontos ganhos: </p>
                            
                            <p>
                                <strong>
                                    +{(respostaAtual.valorAcerto || 0) + (respostaAtual.bonusTempo || 0)} pts
                                </strong>
                            </p>
                        </div>

                        <button
                            onClick={() => setMostrarFeedback(false)}
                            className="mt-4 px-4 py-2 bg-white text-zinc-800 rounded hover:bg-sky-200"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
                )}


        </BackgroundQuestao>
    )
}