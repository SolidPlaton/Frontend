import { useCallback, useEffect } from "react"
import { Alternativa } from "../../interfaces/Questao"

type Props = {
    alternativas: Alternativa[];
    questaoAtual: number;
    selecionada: number | null;
    setSelecionada: (index: number | null) => void;
};



export default function DisplayAlternativas({ alternativas, questaoAtual, selecionada, setSelecionada }: Props) {

    useEffect(() => {
        setSelecionada(null);
    }, [questaoAtual]);

    const handleSelecionada = useCallback((index: number) => {
        setSelecionada(index);
    }, [setSelecionada]);
        

    return (
        <>
            {alternativas.map((alternativa, index) => (
                <div key={index} className="flex flex-row items-center gap-x-2.5 h-12">
                    <div
                        className={`w-4 h-4 rounded-full cursor-pointer ${
                            selecionada === index ? "bg-orange-400" : "bg-white"
                        }`}
                        onClick={() => {
                            handleSelecionada(index);
                        }}
                    ></div>

                    <div className="text-white">{alternativa.texto}</div>
                </div>
            ))}
        </>
    );
}

