import { useLocation, useNavigate } from "react-router-dom";
import { IQuestao } from "../interfaces/Questao";
import { createContext, useState } from "react";
import { IFaseState, IResposta } from "../interfaces/Fase";
import { scoreCalculation } from "../utils/scoreCalculation";
import { fase } from "../types/fase";



interface IFaseContext {
    fase:fase
    melhorPontuacao: number
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

    const navigate = useNavigate();

    const location = useLocation();
    
    const fase:fase              = location.state?.fase
    const melhorPontuacao:number = location.state?.melhorPontuacao
    const questoes               = location.state?.questoes


    const defaultState: IFaseState = {
        questaoAtualIndex: 0,
        respostas: Array(questoes.length).fill(null),
        tempoInicial: 300,
        pontuacaoTotal: 0,
        respostasCorretas: 0,
        faseConcluida: false
    };

    const [faseState, setFaseState] = useState<IFaseState>(defaultState);



    function corrigirAlternativa(resposta: IResposta) {
        const { alternativaCorreta } = questoes[faseState.questaoAtualIndex]
        resposta = scoreCalculation(resposta, alternativaCorreta, faseState.tempoInicial)

        setFaseState(prevState => {
            const copiaRespostas = [...prevState.respostas]
            copiaRespostas[prevState.questaoAtualIndex] = resposta

            const pontuacaoTotal    = calcularPontuacaoTotal(copiaRespostas)
            const respostasCorretas = copiaRespostas.filter(r => r && r.estaCorreta).length
            const faseConcluida     = respostasCorretas >= 3

            return { ...prevState, respostas: copiaRespostas, pontuacaoTotal, respostasCorretas, faseConcluida }
        });
    };


    function proximaQuestao() {

        const novoState = {
            ...faseState,
            questaoAtualIndex: faseState.questaoAtualIndex + 1
        };

        if (novoState.questaoAtualIndex >= questoes.length) {
            navigate('/fase/resultado', {state: { fase, faseState }});
            return
        }

        setFaseState(novoState);
    }
    

    function calcularPontuacaoTotal(respostas: IResposta[]) {
        return respostas.reduce((soma, resposta)  => {
            if (resposta) {
                return soma + (resposta.valorAcerto || 0) + (resposta.bonusTempo || 0)
            }
            return soma
        }, 0)
    }

    return (
        <FaseContext.Provider value={{fase, melhorPontuacao, questoes, faseState, proximaQuestao, corrigirAlternativa}}>
            {children}
        </FaseContext.Provider>
    )
}