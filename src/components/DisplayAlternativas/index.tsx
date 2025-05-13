import { useContext, useEffect } from "react"
import { FaseContext } from "../../context/FaseContext";

type Props = {
    selecionada: number | null;
    setSelecionada: (index: number | null) => void;
};


export default function DisplayAlternativas({ selecionada, setSelecionada }: Props) {

    const { faseState, questoes } = useContext(FaseContext);

    const questaoAtual = faseState.questaoAtualIndex;

    const alternativas = questoes[questaoAtual].alternativas;

    useEffect(() => {
        setSelecionada(null);
    }, [questaoAtual]);

    
    function handleSelecionada(numeroAlternativa: number) {
        if (faseState.respostas[questaoAtual] === null) {
            setSelecionada(numeroAlternativa);
        }
    };
        

    return (
        <div className="mt-4">
            {alternativas.map(({numero, texto}) => (
                <div key={numero} className="flex flex-row items-center gap-x-2.5 h-12">
                    <div
                        className={`w-4 h-4 rounded-full cursor-pointer hover:outline-2 hover:outline-amber-600 ${
                            selecionada === numero ? "bg-orange-400" : "bg-white"
                        }`}
                        onClick={() => handleSelecionada(numero) }
                    ></div>

                    <div className="text-white">{texto}</div>
                </div>
            ))}
        </div>
    );
}

