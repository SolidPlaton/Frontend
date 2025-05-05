import { useCallback, useContext, useEffect } from "react"
import { FaseContext } from "../../context/FaseContext";

type Props = {
    selecionada: number | null;
    setSelecionada: (index: number | null) => void;
};



export default function DisplayAlternativas({ selecionada, setSelecionada }: Props) {

    const { questaoAtual, resultadoQuestoes, indiceQuestao } = useContext(FaseContext);
    const alternativas = questaoAtual.alternativas;

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
                        className={`w-4 h-4 rounded-full cursor-pointer hover:outline-2 hover:outline-amber-600 ${
                            selecionada === index ? "bg-orange-400" : "bg-white"
                        }`}
                        onClick={() => {
                            if (resultadoQuestoes[indiceQuestao] === null) {
                                handleSelecionada(index);
                            }
                        }}
                    ></div>

                    <div className="text-white">{alternativa.texto}</div>
                </div>
            ))}
        </>
    );
}

