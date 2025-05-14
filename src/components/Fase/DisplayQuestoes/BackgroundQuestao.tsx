import { ReactNode } from "react"


type Props = {
    children: ReactNode
}


export default function BackgroundQuestao({ children }:Props) {


    return (
        <div className="bg-[url('/images/universo.jpg')] w-full h-full overflow-clip flex justify-center">
            <div className="max-w-2xl min-w-2xl">
                <div className="w-full flex justify-center">
                    
                        <div className="w-full flex flex-col items-center pb-16 pt-16"> 

                            {children}
                        
                        </div>
                 
                </div>
            </div>
        </div>
    )
}