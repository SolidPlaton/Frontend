import { useCallback, useContext, useEffect } from "react"
import { FaseContext } from "../../context/FaseContext";
import EstadoQuestaoAtual from "../../enums/EstadoQuestaoAtual";

type Props = {
    selecionada: number | null;
    setSelecionada: (index: number | null) => void;
};



export default function DisplayAlternativas({ selecionada, setSelecionada }: Props) {

    const { questaoAtual, estadoQuestaoAtual } = useContext(FaseContext);
    const alternativas = questaoAtual.alternativas;

    useEffect(() => {
        setSelecionada(null);
    }, [questaoAtual]);

    const handleSelecionada = useCallback((numeroAlternativa: number) => {
        setSelecionada(numeroAlternativa);
    }, [setSelecionada]);
        

    return (
        <>
            {alternativas.map(({numero, texto}) => (
                <div key={numero} className="flex flex-row items-center gap-x-2.5 h-12">
                    <div
                        className={`w-4 h-4 rounded-full cursor-pointer hover:outline-2 hover:outline-amber-600 ${
                            selecionada === numero ? "bg-orange-400" : "bg-white"
                        }`}
                        onClick={() => {
                            if (estadoQuestaoAtual === EstadoQuestaoAtual.Respondendo) {
                                handleSelecionada(numero);
                            }
                        }}
                    ></div>

                    <div className="text-white">{texto}</div>
                </div>
            ))}
        </>
    );
}

