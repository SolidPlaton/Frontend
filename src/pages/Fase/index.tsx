import DisplayQuestoes from "../../components/Fase/DisplayQuestoes";
import FaseContextProvider from "../../context/FaseContext";


export default function Fase() {

    return (
        <FaseContextProvider>
            <DisplayQuestoes />
        </FaseContextProvider>
    )
}

