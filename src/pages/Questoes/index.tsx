import { IQuestao } from "../../interfaces/Questao"
import { useState } from "react"
import { useLocation } from "react-router-dom"

import DisplayQuestoes from "../../components/DisplayQuestoes";
import FecharButton from "../../components/FecharButton";




export default function Questoes() {

    const location = useLocation();
    const questoes: IQuestao[] = location.state?.questoes || [];

    const [resultadoQuestoes, setResultadoQuestoes] = useState<(null | boolean)[]>(Array(questoes.length).fill(null));

    const marcarResposta = (index: number, acertou: boolean) => {
        setResultadoQuestoes(prev => {
            const novoEstado = [...prev];
            novoEstado[index] = acertou;
            return novoEstado;
        });
    };



    return (
        <div className="bg-[url('/images/universo.jpg')] w-full h-full overflow-hidden flex justify-center">
            <div className="max-w-2xl min-w-2xl">
                <div className="w-full flex justify-center">
                    <div className="w-full h-32 flex flex-row justify-between items-center">

                        <FecharButton />

                        <div>
                            <ProgressoQuestoes resultadoQuestoes={resultadoQuestoes} />
                        </div>
                        <div className="text-white text-3xl">
                            0:31
                        </div>
                    </div>
                </div>
                <DisplayQuestoes questoes={questoes} />
            </div>
        </div>
    )
}




export function ProgressoQuestoes({ resultadoQuestoes }: { resultadoQuestoes: (null | boolean)[] }) {
    return (
        <div className="flex gap-2 justify-center my-4">
            {resultadoQuestoes.map((status, index) => (
                <div
                    key={index}
                    className={`w-6 h-6 rounded-full ${
                        status === null ? "bg-gray-500" : status ? "bg-green-500" : "bg-red-500"
                    }`}
                ></div>
            ))}
        </div>
    );
}
