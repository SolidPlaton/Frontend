import { useContext } from "react";
import { FaseContext } from "../../../context/FaseContext";


export function DisplayPontuacao() {
    const { faseState } = useContext(FaseContext);

    return (
        <div className="text-white select-none fixed right-0 top-0">
            <div className="flex flex-col items-end">
                <p>pontuação</p>
                <p className="text-4xl">{ faseState.pontuacaoTotal }</p>
            </div>
        </div>
    )
}