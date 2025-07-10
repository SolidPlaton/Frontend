import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface Props {
  posicao: number;
  id: number;
  nome: string;
  imagemPerfilUrl: string | null;
  pontuacaoTotal: number;
  titulo: string | null
}


export default function LinhaRankingUsuario({ posicao, id, nome, imagemPerfilUrl, pontuacaoTotal, titulo }: Props) {
  
    const auth = useContext(AuthContext);

    const isYou = auth.user?.id ===id

  
    return (
    <div className={`bg-slate-800 text-sky-50 w-120 h-12 flex flex-row justify-between items-center px-3 my-2 ${isYou && "border-2 border-amber-400"}`}>
      <div className="flex flex-row justify-between items-center gap-x-2">
        <span>{posicao}</span>
        

        <img src={imagemPerfilUrl || "/images/perfil/no-profile-photo-min.jpg"} 
             alt={nome} 
             className="w-10 h-10 rounded-full" />
        
        <div>
          <p>{nome}</p>
          <p className="text-[10px]">{titulo}</p>
        </div>

        {
            isYou ? (
                <span className="italic font-extralight text-amber-200">(você)</span>
            ) : (
                <></>
            )
        }
      </div>

      <span>{pontuacaoTotal} pts</span>
    </div>
  );
}





