import { useLocation, useNavigate } from "react-router-dom";
import { IQuestao } from "../interfaces/Questao";
import { createContext, useState } from "react";


interface IFaseContext {
    questoes: IQuestao[]
    resultadoQuestoes: (null | boolean)[]
    questaoAtual: IQuestao
    proximaQuestao: () => void
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

    const [resultadoQuestoes, setResultadoQuestoes] = useState<(null | boolean)[]>(Array(questoes.length).fill(null));


    function proximaQuestao() {
        setIndiceQuestao(prevIndice => {
            if (prevIndice < questoes.length - 1) {
                return prevIndice + 1;
            } else {
                navigate('/campanha');
                return prevIndice;
            }
        });
    }
    


    return (
        <FaseContext.Provider value={{questoes, resultadoQuestoes, questaoAtual, proximaQuestao}}>
            {children}
        </FaseContext.Provider>
    )
}