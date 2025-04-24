import { useState } from "react"
import { Alternativa } from "../../interfaces/Questao"

type Props = {
    alternativas: Alternativa[]
}


export default function DisplayAlternativas({ alternativas }: Props) {
    const [selecionada, setSelecionada] = useState<number | null>(null);

    return (
        <>
            {alternativas.map((alternativa, index) => (
                <div key={index} className="flex flex-row items-center gap-x-2.5 h-12">
                    <div
                        className={`w-4 h-4 rounded-full cursor-pointer ${
                            selecionada === index ? "bg-orange-400" : "bg-white"
                        }`}
                        onClick={() => setSelecionada(index)}
                    ></div>

                    <div className="text-white">{alternativa.texto}</div>
                </div>
            ))}
        </>
    );
}

