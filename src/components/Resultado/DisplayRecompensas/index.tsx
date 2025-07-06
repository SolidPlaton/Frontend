import CaixaRecompensa from "../CaixaRecompensa"

import estrela_grande from "/images/elementos/Star-grande.png"

import louros from "/images/elementos/louros-removebg-preview.png"
import DisplayEstrelas from "../../DisplayEstrelas"
import { fase } from "../../../types/fase"



type DisplayRecompensasProps = {
    fase: fase,
    faseConcluida: boolean,
    estrelas: number,
    pontuacaoTotal: number
}

export default function DisplayRecompensas({ fase, estrelas, faseConcluida, pontuacaoTotal }:DisplayRecompensasProps) {

    return (
        <div className="flex flex-row gap-x-5">
            <CaixaRecompensa>
                <img className="w-36" draggable="false"
                    src={faseConcluida ? fase.solido.img_path : fase.img_path} 
                    alt={faseConcluida ? "concluída!" : "não concluída..."} />

                <p className="text-white select-none">
                    {faseConcluida ? 'sólido encontrado!' : 'sólido não encontrado' }
                </p>
            </CaixaRecompensa>


            <CaixaRecompensa>
                <img className="w-36" src={estrela_grande} alt="Estrela Grande" draggable="false" />

                <DisplayEstrelas estrelas={estrelas} />
            </CaixaRecompensa>


            <CaixaRecompensa>
                <img className="w-36" src={louros} alt="Louros" draggable="false" />

                <p className="text-white select-none">
                    {pontuacaoTotal} pts
                </p>
            </CaixaRecompensa>
        </div>
    )
}


