import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

interface Props {
  posicao: number;
  id: number;
  nome: string;
  imagemPerfilUrl: string | null;
  pontuacaoTotal: number;
}


export default function LinhaRankingUsuario({ posicao, id, nome, imagemPerfilUrl, pontuacaoTotal }: Props) {
  
    const auth = useContext(AuthContext);

    const isYou = auth.user?.id ===id

  
    return (
    <div className="bg-slate-800 text-sky-50 w-120 h-12 flex flex-row justify-between items-center px-3 my-2">
      <div className="flex flex-row justify-between items-center gap-x-2">
        <span>{posicao}</span>
        
        {imagemPerfilUrl ? (
          <img src={imagemPerfilUrl} alt={nome} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 bg-sky-50"></div>
        )}
        
        <p>{nome}</p>

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





