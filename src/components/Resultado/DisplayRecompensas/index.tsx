import CaixaRecompensa from "../CaixaRecompensa"
import cubo from "/images/solidos/cubo-removebg-preview.png"
import terremoto from "/images/fases/terremoto.jpg"

import estrela_grande from "/images/elementos/Star-grande.png"

import louros from "/images/elementos/louros-removebg-preview.png"
import DisplayEstrelas from "../../DisplayEstrelas"



type DisplayRecompensasProps = {
    faseConcluida: boolean,
    estrelas: number,
    pontuacaoTotal: number
}

export default function DisplayRecompensas({ estrelas, faseConcluida, pontuacaoTotal }:DisplayRecompensasProps) {

    return (
        <div className="flex flex-row gap-x-5">
            <CaixaRecompensa>
                <img className="w-36" draggable="false"
                    src={faseConcluida ? cubo : terremoto} 
                    alt={faseConcluida ? cubo : terremoto} />

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


