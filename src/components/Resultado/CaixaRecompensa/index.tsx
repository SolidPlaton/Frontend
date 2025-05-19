import { ReactNode } from "react"

type CaixaRecompensaProps = {
    children: ReactNode
}


export default function CaixaRecompensa({ children }:CaixaRecompensaProps) {

    return (
        <div className="bg-fuchsia-950 w-50 h-60 pt-10 pb-3 flex flex-col justify-between items-center">
            { children }
        </div>
    )
}
