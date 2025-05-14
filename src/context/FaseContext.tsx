import { useLocation } from "react-router-dom";
import { IQuestao } from "../interfaces/Questao";
import { createContext, useState } from "react";
import { IFaseState, IResposta } from "../interfaces/Fase";



interface IFaseContext {
    questoes: IQuestao[]
    faseState: IFaseState
    proximaQuestao: () => void
    corrigirAlternativa: (resposta: IResposta) => void
}

export const FaseContext = createContext({} as IFaseContext)



type Props = {
    children: React.ReactNode
}

export default function FaseContextProvider({children}:Props) {

    const location = useLocation();
    
    const questoes: IQuestao[] = location.state?.questoes || [];

    const defaultState: IFaseState = {
        questaoAtualIndex: 0,
        respostas: Array(questoes.length).fill(null),
        tempoInicial: 300
    };

    const [faseState, setFaseState] = useState<IFaseState>(defaultState);



    function corrigirAlternativa(resposta: IResposta) {
        const questaoAtual = questoes[faseState.questaoAtualIndex]
        resposta.estaCorreta = resposta.alternativaSelecionada === questaoAtual.alternativaCorreta

        setFaseState(prevState => {
            const copiaRespostas = [...prevState.respostas]
            copiaRespostas[prevState.questaoAtualIndex] = resposta

            return { ...prevState, respostas: copiaRespostas }
        });
    };


    function proximaQuestao() {
        setFaseState(prevState => ({
            ...prevState,
            questaoAtualIndex: prevState.questaoAtualIndex + 1
        }))
    }
    

    return (
        <FaseContext.Provider value={{questoes, faseState, proximaQuestao, corrigirAlternativa}}>
            {children}
        </FaseContext.Provider>
    )
}