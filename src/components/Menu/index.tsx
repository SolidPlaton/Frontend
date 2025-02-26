import path_duotone from '../../assets/menu-icons/path-duotone.svg'
import puzzle_piece_duotone from '../../assets/menu-icons/puzzle-piece-duotone.svg'
import ranking_duotone from '../../assets/menu-icons/ranking-duotone.svg'
import user_circle_duotone from '../../assets/menu-icons/user-circle-duotone.svg'

type PropsNavButton = {
    name: string,
    path_icon: string
}

export function NavButton({name, path_icon}:PropsNavButton) {
    return (
        <div className="flex flex-row items-center justify-start pl-5 gap-2 h-12 w-44 bg-fuchsia-950 rounded-2xl cursor-pointer border-2 border-black hover:border-orange-400 select-none group">
            <img className="w-8 h-8" src={path_icon} alt={name} />
            <p className="text-white group-hover:text-orange-400">{name}</p>
        </div>
    )
}


export default function Menu() {


    return (
        <nav className="flex flex-col items-center justify-between bg-slate-900 min-w-52 h-screen pt-12 pb-5">

            <div className="flex flex-col gap-y-12 items-center">
                <h2 className="text-white text-3xl font-bold font-inria-sans">Solid Platon</h2>

                <div className="flex flex-col gap-y-4">
                    <NavButton name="campanha" path_icon={path_duotone}/>
                    <NavButton name="desafios" path_icon={puzzle_piece_duotone}/>
                    <NavButton name="ranking" path_icon={ranking_duotone}/>
                    <NavButton name="perfil" path_icon={user_circle_duotone}/>
                </div>
            </div>

            <h2 className="text-red-500">Sair</h2>
        </nav>
    )
}