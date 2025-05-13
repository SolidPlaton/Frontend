import { useContext, useState } from "react";
import { FaseContext } from "../../context/FaseContext";

type Props = {
    selecionada: number | null;
    callback: () => void
};

export default function ConfirmarButton({ selecionada, callback }: Props) {
    const { proximaQuestao } = useContext(FaseContext);
    
    const [botaoTexto, setBotaoTexto] = useState("Confirmar");

    const handleClick = () => {
        if (botaoTexto === "Confirmar" && selecionada !== null) {
            callback()
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