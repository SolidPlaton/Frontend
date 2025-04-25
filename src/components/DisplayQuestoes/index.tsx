import { useCallback, useState } from "react"
import { IQuestao } from "../../interfaces/Questao"
import { api } from "../../api/axios"
import { useNavigate } from "react-router-dom"
import DisplayAlternativas from "../DisplayAlternativas"


type Props = {
    questoes: IQuestao[]
}


export default function DisplayQuestoes( { questoes }:Props ) {

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
            <div className="bg-fuchsia-950 px-8 py-6 mb-24">
                <div className="max-w-3xl">
                    <img src={`${api.getUri()}${questoes[questaoAtual].imagemUrl}`} alt="Imagem da questão" />
                </div>
                <div className="mt-4">
                    <DisplayAlternativas 
                        alternativas={questoes[questaoAtual].alternativas} 
                        questaoAtual={questaoAtual}
                        selecionada={selecionada}
                        setSelecionada={setHandleSelecionada} />
                </div>
            </div>

            <div
                className={`flex justify-center items-center text-black select-none h-12 w-2xs text-xl ${
                                selecionada === null 
                                ? "opacity-50 bg-gray-400" 
                                : "cursor-pointer bg-orange-400 hover:bg-orange-600 duration-200 ease-out"
                            }`}
                onClick={() => selecionada !== null && proximaQuestao()}
            >
                confirmar
            </div>
        
        </div>
    )
}