import { useContext, useState } from "react";
import { FaseContext } from "../../context/FaseContext";

type Props = {
    selecionada: number | null;
};

export default function ConfirmarButton({ selecionada }: Props) {
    const { proximaQuestao, corrigirAlternativa } = useContext(FaseContext);
    
    const [botaoTexto, setBotaoTexto] = useState("Confirmar");

    const handleClick = () => {
        if (botaoTexto === "Confirmar" && selecionada !== null) {
            corrigirAlternativa(selecionada);
            setBotaoTexto("Próxima");
        } else if (botaoTexto === "Próxima") {
            proximaQuestao();
            setBotaoTexto("Confirmar"); 
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