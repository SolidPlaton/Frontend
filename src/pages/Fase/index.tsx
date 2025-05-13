import DisplayQuestoes from "../../components/DisplayQuestoes";
import FaseContextProvider from "../../context/FaseContext";


export default function Fase() {

    return (
        <FaseContextProvider>
            <DisplayQuestoes />
        </FaseContextProvider>
    )
}

