import { useState } from "react"
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

    function proximaQuestao() {
        if (questoes[questaoAtual + 1]) {
            setQuestaoAtual(prev => prev + 1)
            return
        }
        navigate('/campanha')
    }


    if (questoes.length === 0) {
        navigate('/campanha')
    }

    
    return (
        <div className="w-full flex flex-col items-center"> 
            <div className="bg-fuchsia-950 px-8 py-6">
                <div className="max-w-3xl">
                    <img src={`${api.getUri()}${questoes[questaoAtual].imagemUrl}`} alt="Imagem da questão" />
                </div>
                <div className="mt-4">
                    <DisplayAlternativas alternativas={questoes[questaoAtual].alternativas} />
                </div>
                <button className="text-white" onClick={() => proximaQuestao()}>Próxima</button>
            </div>
        
        </div>
    )
}