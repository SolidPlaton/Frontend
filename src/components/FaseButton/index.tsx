

type Props = {
    img_path: string
}


export default function FaseButton({ img_path }:Props) {


    return (
        <img draggable="false" src={img_path} alt={img_path} 
            className="w-24 cursor-pointer border-4 rounded-4xl 
            hover:border-orange-400 hover:scale-125
            transition duration-150 ease-in-out"/>
    )
}