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
        <div className="bg-[url('/images/universo.jpg')] w-screen h-screen overflow-clip flex flex-col justify-center items-center gap-y-60">
            <p className="text-white">recompensas</p>
            <p className="text-white">{ faseConcluida ? "concluida!" : "Não concluida" }</p>
            <ProximoButton />
        </div>
    )
}



function ProximoButton() {

    const navigate = useNavigate();

    return (
        <div className="w-48 h-10 bg-orange-400 flex justify-center items-center cursor-pointer select-none"
             onClick={() => navigate('/campanha')}>
            próxima
        </div>
    )
}