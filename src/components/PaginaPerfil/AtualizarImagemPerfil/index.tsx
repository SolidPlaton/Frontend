import { useState } from "react";
import { api } from "../../../api/axios";
import { useAuth } from "../../../hooks/useAuth";


const imagensPerfil = [
    "/images/perfil/no-profile-photo-min.png",
    "/images/solidos/dodecaedro.png",
    "/images/solidos/hexaedro.png",
    "/images/solidos/icosaedro.png",
    "/images/solidos/tetraedro.png",
    "/images/solidos/octaedro.png"
];


export default function AtualizarImagemPerfil() {

    const { user, atualizarUser } = useAuth();
    
    const [mostrarModal, setMostrarModal] = useState(false);

    async function handleSelecionarImagem(novaImagem: string) {
        try {
            await api.patch('/api/users', {
                imagemPerfilUrl: novaImagem
            });

            if (user) {
                atualizarUser({ ...user, imagemPerfilUrl: novaImagem });
            }
            setMostrarModal(false);
        } catch (error) {
            console.error("Erro ao atualizar imagem de perfil", error);
        }
    }

    return (
        <>
            <div onClick={() => setMostrarModal(true)} className="cursor-pointer">
                <img className="w-40 rounded-full border-4 border-white"
                    src={user?.imagemPerfilUrl || "/images/perfil/no-profile-photo-min.png"} 
                    alt="Foto de Perfil" />
            </div>

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
        </>
    )
}