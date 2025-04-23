import { Link } from "react-router-dom"


type Props = {
    img_path: string,
    fase_id: number
}


export default function FaseButton({ img_path, fase_id }:Props) {


    return (
        <Link to={`/fase/${fase_id}`} state={{img_path}} >
            <img draggable="false" src={img_path} alt={img_path} 
                className="min-w-[96px] max-w-[96px] cursor-pointer border-4 rounded-4xl 
                hover:border-orange-400 hover:scale-125
                transition duration-150 ease-in-out"/>
        </Link>
    )
}