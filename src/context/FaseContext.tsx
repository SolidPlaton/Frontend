import { useLocation, useNavigate } from "react-router-dom";
import { IQuestao } from "../interfaces/Questao";
import { createContext, useState } from "react";
import EstadoQuestaoAtual from "../enums/EstadoQuestaoAtual";


type resultadoQuestao = {
    estaCorreta: boolean
    tempoUtilizado: number
}

interface IFaseContext {
    questoes: IQuestao[]
    resultadoQuestoes: (resultadoQuestao | null)[]
    indiceQuestao: number
    questaoAtual: IQuestao
    estadoQuestaoAtual: EstadoQuestaoAtual
    proximaQuestao: () => void
    corrigirAlternativa: (selecionada:number) => void
}

export const FaseContext = createContext({} as IFaseContext)



type Props = {
    children: React.ReactNode
}

export default function FaseContextProvider({children}:Props) {

    const navigate = useNavigate();
    const location = useLocation();
    
    const questoes: IQuestao[] = location.state?.questoes || [];

    const [indiceQuestao, setIndiceQuestao] = useState(0);
    const questaoAtual = questoes[indiceQuestao] || null;

    const [estadoQuestaoAtual, setEstadoQuestaoAtual] = useState(EstadoQuestaoAtual.Respondendo)


    const [resultadoQuestoes, setResultadoQuestoes] = useState<(resultadoQuestao | null)[]>(Array(questoes.length).fill(null));


    function corrigirAlternativa(selecionada:number) {
        const estaCorreta = selecionada === questaoAtual.alternativaCorreta

        const tempoUtilizado = 300
        atualizarResultados({estaCorreta, tempoUtilizado})
        setEstadoQuestaoAtual(EstadoQuestaoAtual.Confirmada)
    }

    function atualizarResultados({ estaCorreta, tempoUtilizado }: resultadoQuestao) {
        setResultadoQuestoes(prev => {
            const novosResultados = [...prev];
            novosResultados[indiceQuestao] = { estaCorreta, tempoUtilizado };
            return novosResultados;
        });
    }
    


    function proximaQuestao() {
        setIndiceQuestao(prevIndice => {
            if (prevIndice < questoes.length - 1) {
                setEstadoQuestaoAtual(EstadoQuestaoAtual.Respondendo)
                return prevIndice + 1;
            } else {
                navigate('/campanha');
                return prevIndice;
            }
        });
    }
    


    return (
        <FaseContext.Provider value={{questoes, resultadoQuestoes, indiceQuestao, questaoAtual, estadoQuestaoAtual, proximaQuestao, corrigirAlternativa}}>
            {children}
        </FaseContext.Provider>
    )
}