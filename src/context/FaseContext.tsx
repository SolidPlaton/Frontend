import { useLocation } from "react-router-dom";
import { IQuestao } from "../interfaces/Questao";
import { createContext, useState } from "react";


interface IFaseContext {
    questoes: IQuestao[]
    resultadoQuestoes: (null | boolean)[]
}

export const FaseContext = createContext({} as IFaseContext)



type Props = {
    children: React.ReactNode
}

export default function FaseContextProvider({children}:Props) {

    const location = useLocation();
    const questoes: IQuestao[] = location.state?.questoes || [];

    const [resultadoQuestoes, setResultadoQuestoes] = useState<(null | boolean)[]>(Array(questoes.length).fill(null));


    return (
        <FaseContext.Provider value={{questoes, resultadoQuestoes}}>
            {children}
        </FaseContext.Provider>
    )
}