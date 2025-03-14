

type Props = {
    img_path: string
}


export default function FaseButton({ img_path }:Props) {


    return (
        <img draggable="false" src={img_path} alt={img_path} 
            className="w-24"/>
    )
}