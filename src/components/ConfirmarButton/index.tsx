import { useContext } from "react";
import { FaseContext } from "../../context/FaseContext";

type Props = {
    selecionada: boolean;
}


export default function ConfirmarButton({ selecionada }:Props) {

    const { proximaQuestao } = useContext(FaseContext);


    return (
        <div
                className={`flex justify-center items-center text-black select-none h-12 w-2xs text-xl ${
                                selecionada
                                ? "cursor-pointer bg-orange-400 hover:bg-orange-600 duration-200 ease-out"
                                : "opacity-50 bg-gray-400" 
                            }`}
                onClick={() => selecionada && proximaQuestao()}
            >
                confirmar
        </div>
    )
}