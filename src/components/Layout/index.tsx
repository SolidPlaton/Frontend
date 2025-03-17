import { ReactNode } from 'react';
import Menu from '../Menu';

type Props = {
    children: ReactNode
}

export default function Layout({ children }:Props) {

    return (
        <div className="flex flex-row w-screen h-screen">
            <Menu />
            {children}
        </div>
    )

}