import { useState } from "react";
import SetaAmarela from "../SetaAmarela";

type Props = {
    text: string[]
    onClose: () => void
}

export default function CaixaDialogo({ text, onClose }:Props) {


    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = () => {
        if (currentIndex < text.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0" style={{ pointerEvents: "none" }}></div>


            {/* Caixa de diálogo */}
            <div onClick={handleClick} 
                className="relative min-w-160 h-50 z-50 p-px
                flex flex-row justify-between items-end
                bg-stone-900 opacity-95 text-neutral-400 border-3 rounded-lg
                select-none">

                <div className="self-start h-full w-100 pl-4 pt-2">

                    <div className="text-orange-400 text-lg font-inria-sans">
                        Platão
                    </div>

                     <p>{text[currentIndex]}</p>

                </div>

                <div>
                    <img src="/images/platao/platao-removebg-preview.png" alt="Platão" 
                        className="w-80" />
                </div>

                <div className="absolute left-1/2">
                    <SetaAmarela />
                </div>
            </div>
        </div>
    )
}   