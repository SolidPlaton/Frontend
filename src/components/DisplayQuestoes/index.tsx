import { useCallback, useContext, useState } from "react"
import { api } from "../../api/axios"
import DisplayAlternativas from "../DisplayAlternativas"
import ConfirmarButton from "../ConfirmarButton"
import { FaseContext } from "../../context/FaseContext"


export default function DisplayQuestoes() {

    const { questaoAtual } = useContext(FaseContext);

    
    const [selecionada, setSelecionada] = useState<number | null>(null);

    const setHandleSelecionada = useCallback((index: number | null) => {
        setSelecionada(index);
    }, []);

    
    return (
        <div className="w-full flex flex-col items-center pb-16"> 
            <div className="bg-fuchsia-950 px-8 py-6 mb-24 w-full">
                <div>
                    <img className="w-full" src={`${api.getUri()}${questaoAtual.imagemUrl}`} alt="Imagem da questão" />
                </div>
                
                <div className="mt-4">
                    <DisplayAlternativas 
                        selecionada={selecionada}
                        setSelecionada={setHandleSelecionada} />
                </div>
            </div>

            <ConfirmarButton selecionada={selecionada !== null} />
        
        </div>
    )
}