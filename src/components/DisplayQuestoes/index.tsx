import { useCallback, useContext, useState } from "react"
import { api } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import DisplayAlternativas from "../DisplayAlternativas"
import ConfirmarButton from "../ConfirmarButton"
import { FaseContext } from "../../context/FaseContext"


export default function DisplayQuestoes() {

    const { questoes } = useContext(FaseContext);

    const navigate = useNavigate();
    const [questaoAtual, setQuestaoAtual] = useState(0);
    const [selecionada, setSelecionada] = useState<number | null>(null);

    const setHandleSelecionada = useCallback((index: number | null) => {
        setSelecionada(index);
    }, []);
    

    function proximaQuestao() {
        if (questoes[questaoAtual + 1]) {
            setQuestaoAtual(prev => prev + 1)
            setSelecionada(null);
            return
        }
        navigate('/campanha')
    }


    if (questoes.length === 0) {
        navigate('/campanha')
    }

    
    return (
        <div className="w-full flex flex-col items-center pb-16"> 
            <div className="bg-fuchsia-950 px-8 py-6 mb-24 w-full">
                <div>
                    <img className="w-full" src={`${api.getUri()}${questoes[questaoAtual].imagemUrl}`} alt="Imagem da questão" />
                </div>
                
                <div className="mt-4">
                    <DisplayAlternativas 
                        alternativas={questoes[questaoAtual].alternativas} 
                        questaoAtual={questaoAtual}
                        selecionada={selecionada}
                        setSelecionada={setHandleSelecionada} />
                </div>
            </div>

            <ConfirmarButton selecionada={selecionada !== null} proxima={proximaQuestao} />
        
        </div>
    )
}