import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export default function EstiloQuestao({ children }:Props) {

    return (
        <div className="bg-fuchsia-950 px-8 py-6 my-16 w-full">
            { children }
        </div>
    )
}