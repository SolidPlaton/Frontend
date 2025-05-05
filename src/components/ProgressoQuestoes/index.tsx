import { useContext } from "react";
import { FaseContext } from "../../context/FaseContext";




export function ProgressoQuestoes() {

    const { resultadoQuestoes } = useContext(FaseContext);

    return (
        <div className="flex gap-2 justify-center my-4">
            {resultadoQuestoes.map((status, index) => (
                <div
                    key={index}
                    className={`w-6 h-6 rounded-full ${
                        status === null ? "bg-gray-500" : status.estaCorreta ? "bg-green-500" : "bg-red-500"
                    }`}
                ></div>
            ))}
        </div>
    );
}