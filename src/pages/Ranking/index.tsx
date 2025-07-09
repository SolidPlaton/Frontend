import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import LinhaRankingUsuario from "../../components/LinhaRankingUsuario";
import { IUsuarioRanking } from "../../interfaces/Ranking";

export default function Ranking() {

    const auth = useContext(AuthContext);
    const [ranking, setRanking] = useState<IUsuarioRanking[]>([])


    useEffect(() => {

        async function getRanking() {
            const response = await api.get('/api/ranking')

            setRanking (
                response.data.ranking as IUsuarioRanking[]
            )
        }

        getRanking()

    }, [])

    const userRankingPosicao = ranking.findIndex(usuario => usuario.id === auth.user?.id) + 1;



    return (
         <Layout>
            <div className="w-full h-full flex flex-col items-center">

                <div className="flex flex-col items-center gap-y-2.5 my-10">
                    <div>
                        <img src="/public/images/icons/crown.svg" alt="crown" />
                    </div>
                    <h1 className="text-orange-400 text-5xl">
                        ranking
                    </h1>
                    <p className="text-sky-50">
                        sua posição: #{userRankingPosicao}
                    </p>
                </div>


                <div>
                    {ranking.map((usuario, index) => (
                        <LinhaRankingUsuario
                            key={usuario.id}
                            posicao={index + 1}
                            id={usuario.id}
                            nome={usuario.nome}
                            imagemPerfilUrl={usuario.imagemPerfilUrl || "/images/perfil/no-profile-photo-min.jpg"}
                            pontuacaoTotal={usuario.pontuacaoTotal} />
                    ))}
                </div>

            </div>
         </Layout>
    )
}


