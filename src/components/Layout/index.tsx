import { ReactNode } from 'react';
import Menu from '../Menu';

type Props = {
    children: ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <div className="bg-[url('/images/universo.jpg')] bg-repeat-y flex flex-row min-h-screen overflow-x-hidden">
            <Menu />

            <div className="flex-1 relative ml-48">
                {children}
            </div>
        </div>
    );
}
