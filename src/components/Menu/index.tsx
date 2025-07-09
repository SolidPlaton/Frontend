import { useContext } from 'react';
import path_duotone from '../../assets/menu-icons/path-duotone.svg'
import puzzle_piece_duotone from '../../assets/menu-icons/puzzle-piece-duotone.svg'
import ranking_duotone from '../../assets/menu-icons/ranking-duotone.svg'
import user_circle_duotone from '../../assets/menu-icons/user-circle-duotone.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

type PropsNavButton = {
  name: string,
  path_icon: string,
  to: string,
  currentPath: string
}


export default function Menu() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSignout() {
    await auth.deslogar()
    await navigate('/')
  }

  return (
    <nav className="flex flex-col items-center justify-between bg-slate-900 min-w-52 h-screen pt-12 pb-5">
      <div className="flex flex-col gap-y-12 items-center">
        <h2 className="text-white text-3xl font-bold font-inria-sans">Solid Platon</h2>
        <div className="flex flex-col gap-y-4">
          <NavButton name="campanha" path_icon={path_duotone} to="/campanha" currentPath={location.pathname} />
          <NavButton name="desafios" path_icon={puzzle_piece_duotone} to="/desafios" currentPath={location.pathname} />
          <NavButton name="ranking" path_icon={ranking_duotone} to="/ranking" currentPath={location.pathname} />
          <NavButton name="perfil" path_icon={user_circle_duotone} to={`/usuario/${auth.user?.id}`} currentPath={location.pathname} />
        </div>
      </div>
      <h2 onClick={handleSignout} className="text-red-500 cursor-pointer">Sair</h2>
    </nav>
  );
}



export function NavButton({ name, path_icon, to, currentPath }: PropsNavButton) {
  const isActive = currentPath === to;

  return (
    <Link to={to}>
      <div className={`flex flex-row items-center justify-start pl-5 gap-2 h-12 w-44 rounded-2xl cursor-pointer border-2 
        select-none group
        ${isActive ? 'bg-fuchsia-900 border-orange-400' : 'bg-fuchsia-950 border-black hover:border-orange-400'}
      `}>
        <img className="w-8 h-8" src={path_icon} alt={name} />
        <p className={`text-white ${isActive ? 'text-black font-bold' : 'group-hover:text-orange-400'}`}>{name}</p>
      </div>
    </Link>
  );
}