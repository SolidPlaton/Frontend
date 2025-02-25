
type PropsNavButton = {
    name: string,
    path_icon: string
}

export function NavButton({name, path_icon}:PropsNavButton) {
    return (
        <div className="flex flex-row items-center justify-start pl-5 gap-2 h-12 w-44 bg-fuchsia-950 rounded-2xl cursor-pointer border-2 border-fuchsia-950 hover:border-orange-400 select-none group">
            <img className="w-8 h-8" src={path_icon} alt={name} />
            <p className="text-white group-hover:text-orange-400">{name}</p>
        </div>
    )
}


export default function Menu() {


    return (
        <nav>

            <h2>Solid Platon</h2>

            <NavButton name="campanha" path_icon=""/>
            <NavButton name="desafios" path_icon=""/>
            <NavButton name="ranking" path_icon=""/>
            <NavButton name="perfil" path_icon=""/>

        </nav>
    )
}