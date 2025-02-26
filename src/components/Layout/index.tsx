import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

export default function Layout({ children }:Props) {

    return (
        <div className="flex flex-row w-screen h-screen">{children}</div>
    )

}