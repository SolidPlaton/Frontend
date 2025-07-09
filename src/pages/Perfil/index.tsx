import Layout from "../../components/Layout";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/axios";
import { IUsuarioRanking } from "../../interfaces/Ranking";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AtualizarTituloJogador from "../../components/PaginaPerfil/AtualizarTituloJogador";
import AtualizarImagemPerfil from "../../components/PaginaPerfil/AtualizarImagemPerfil";


export default function Perfil() {
    const auth = useContext(AuthContext);
    const { user } = useAuth();

    const [userRankingPosicao, setUserRankingPosicao] = useState(0);

    useEffect(() => {
        async function getRankingUsuario() {
            const response = await api.get('/api/ranking');
            const ranking = response.data.ranking as IUsuarioRanking[];

            setUserRankingPosicao(
                ranking.findIndex(usuario => usuario.id === auth.user?.id) + 1
            );
        }

        getRankingUsuario();
    }, [auth.user?.id]);


    return (
        <Layout>
            <div className="w-full my-12 flex flex-col justify-center items-center text-white relative">

                <AtualizarImagemPerfil />
                
                <h2 className="text-3xl mt-4">
                    {user?.nome}
                </h2>

                <AtualizarTituloJogador />

                <p className="mt-4">está na posição #{userRankingPosicao}</p>

            </div>
        </Layout>
    );
}
