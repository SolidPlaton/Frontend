import estrela_pequena_dourada from "/images/elementos/Star-pequena-dourada.png"
import estrela_pequena_cinza from "/images/elementos/Star-pequena-cinza.png"


type DisplayEstrelasProps = {
    estrelas:number
}


export default function DisplayEstrelas({ estrelas }:DisplayEstrelasProps) {

    return (
        <div className="flex flex-row gap-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <img className="w-8"
                    key={index} 
                    src={index < estrelas ? estrela_pequena_dourada : estrela_pequena_cinza} 
                    alt={index < estrelas ? "Estrela amarela" : "Estrela cinza"} 
                    draggable="false" 
                />
            ))}
        </div>
    )
}