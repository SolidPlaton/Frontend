import { useContext } from "react";
import { FaseContext } from "../../context/FaseContext";

type Props = {
    selecionada: number | null;
    callback: () => void,
    proxima: () => void
};

export default function ConfirmarButton({ selecionada, callback, proxima }: Props) {
    const { faseState } = useContext(FaseContext);

    const respostaQuestaoAtual = faseState.respostas[faseState.questaoAtualIndex]

    const botaoTexto = respostaQuestaoAtual !== null ? "Próxima" : "Confirmar";

    const handleClick = () => {
        if (botaoTexto === "Confirmar" && selecionada !== null) {
            callback()
        } else if (botaoTexto === "Próxima") {
           proxima();
        }
    };

    return (
        <div
            className={`flex justify-center items-center text-black select-none h-12 w-2xs text-xl ${
                selecionada !== null || botaoTexto === "Próxima"
                    ? "cursor-pointer bg-orange-400 hover:bg-orange-600 duration-200 ease-out"
                    : "opacity-50 bg-gray-400"
            }`}
            onClick={handleClick}
        >
            {botaoTexto}
        </div>
    );
}