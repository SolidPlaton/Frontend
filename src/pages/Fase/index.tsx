import DisplayQuestoes from "../../components/DisplayQuestoes";
import FecharButton from "../../components/FecharButton";
import FaseContextProvider from "../../context/FaseContext";
import { ProgressoQuestoes } from "../../components/ProgressoQuestoes";




export default function Fase() {

    return (
        <FaseContextProvider>
            <div className="bg-[url('/images/universo.jpg')] w-full h-full overflow-hidden flex justify-center">
                <div className="max-w-2xl min-w-2xl">
                    <div className="w-full flex justify-center">
                        <div className="w-full h-32 flex flex-row justify-between items-center">

                            <FecharButton />

                            <ProgressoQuestoes />
                            
                            <div className="text-white text-3xl">
                                0:31
                            </div>
                            
                        </div>
                    </div>
                    <DisplayQuestoes />
                </div>
            </div>
        </FaseContextProvider>
    )
}

