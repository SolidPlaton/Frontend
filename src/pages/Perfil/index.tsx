import Layout from "../../components/Layout";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/axios";
import { IUsuarioRanking } from "../../interfaces/Ranking";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const imagensPerfil = [
    "/images/perfil/no-profile-photo-min.png",
    "/images/solidos/dodecaedro.png",
    "/images/solidos/hexaedro.png",
    "/images/solidos/icosaedro.png",
    "/images/solidos/tetraedro.png",
    "/images/solidos/octaedro.png"
];

export default function Perfil() {
    const auth = useContext(AuthContext);
    const { user, setUser } = useAuth();

    const [userRankingPosicao, setUserRankingPosicao] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);

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

    async function handleSelecionarImagem(novaImagem: string) {
        try {
            await api.patch('/api/users', {
                imagemPerfilUrl: novaImagem
            });

            if (user) {
                setUser({ ...user, imagemPerfilUrl: novaImagem });
            }
            setMostrarModal(false);
        } catch (error) {
            console.error("Erro ao atualizar imagem de perfil", error);
        }
    }

    return (
        <Layout>
            <div className="w-full my-12 flex flex-col justify-center items-center text-white relative">

                {/* Foto de perfil com clique */}
                <div onClick={() => setMostrarModal(true)} className="cursor-pointer">
                    <img className="w-40 rounded-full border-4 border-white"
                        src={user?.imagemPerfilUrl || "/images/perfil/no-profile-photo-min.png"} 
                        alt="Foto de Perfil" />
                </div>

                <h2 className="text-3xl mt-4">
                    {user?.nome}
                </h2>

                <h3 className="text-2xl mt-4">
                    {user?.tituloJogador}
                </h3>

                <p>está na posição #{userRankingPosicao}</p>

                {/* Modal de seleção de imagem */}
                {mostrarModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-xl">
                            <h3 className="text-xl font-bold mb-4 text-black">Escolha uma imagem de perfil:</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {imagensPerfil.map((url, idx) => (
                                    <img
                                        key={idx}
                                        src={url}
                                        alt="Opção de perfil"
                                        className="w-24 h-24 object-cover cursor-pointer rounded-full hover:ring-4 ring-blue-500"
                                        onClick={() => handleSelecionarImagem(url)}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
