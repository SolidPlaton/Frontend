import { useContext } from "react";
import {FaseContext} from "../../context/FaseContext";
import { api } from "../../api/axios"



export default function EnunciadoQuestaoAtual() {

    const { faseState, questoes } = useContext(FaseContext);

    const index = faseState.questaoAtualIndex;

    const urlImage = questoes[index].imagemUrl;

    const imagem = `${api.getUri()}${urlImage}`

    return (
        <img className="w-full" 
            src={imagem} 
            alt="Imagem da questão" />
    )
}