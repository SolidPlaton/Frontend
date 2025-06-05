import { useContext } from "react";
import { FaseContext } from "../../../context/FaseContext";




export function ProgressoQuestoes() {

    const { faseState } = useContext(FaseContext);

    const respostas = faseState.respostas

    return (
        <div className="flex gap-2 justify-center my-4">
            {respostas.map((status, index) => (
                <div
                    key={index}
                    className={`w-6 h-6 rounded-full 
                        ${ index === faseState.questaoAtualIndex && "outline-4 outline-orange-400" }
                        ${ status === null ? "bg-gray-500" : status.estaCorreta ? "bg-green-500" : "bg-red-500" }`}
                ></div>
            ))}
        </div>
    );
}