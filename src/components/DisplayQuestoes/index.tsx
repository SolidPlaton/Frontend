import { useState } from "react"
import { IQuestao } from "../../interfaces/Questao"
import { api } from "../../api/axios"
import { useNavigate } from "react-router-dom"


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
        <div>
            <div>
                <img src={`${api.getUri()}${questoes[questaoAtual].imagemUrl}`} alt="Imagem da questão" />
            </div>

            <div>
                {
                    questoes[questaoAtual].alternativas.map((alternativa, index) => {
                        return (
                            <div key={index} className="text-white">
                                {alternativa.texto}
                            </div>
                        )
                    })
                }
            </div>


            <button className="text-white" onClick={() => proximaQuestao()}>Próxima</button>
        </div>
    )
}