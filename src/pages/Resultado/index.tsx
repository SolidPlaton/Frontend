import { useLocation, useNavigate } from "react-router-dom";
import { IResposta } from "../../interfaces/Fase";
import { scoreCalculation } from "../../utils/scoreCalculation";
import { useEffect, useState } from "react";



export default function Resultado() {

    const navigate = useNavigate();

    const location = useLocation();
    const respostas = location.state?.respostas as IResposta[]
    const initialTime = location.state?.initialTime as number

    const [estrelas, setEstrelas] = useState(0)
    const [faseConcluida, setFaseConcluida] = useState(false)
    const [pontuacaoTotal, setPontuacaoTotal] = useState(0)


    useEffect(() => {
        if (!respostas || initialTime === undefined) {
            navigate('/campanha')
            return
        }
        
        const resultado = scoreCalculation(600, initialTime, respostas)

        setEstrelas(resultado.estrelas)
        setFaseConcluida(resultado.faseConcluida)
        setPontuacaoTotal(resultado.pontuacaoTotal)

    }, [respostas, initialTime, navigate])



    return (
        <div>
            <p>{ `${estrelas} estrelas` }</p>
            <p>{ faseConcluida ? "concluida!" : "Não concluida" }</p>
            <p>{ `${pontuacaoTotal} pontos!` }</p>
        </div>
    )
}