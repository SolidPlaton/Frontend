import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../api/axios";
import ModalSelecionarImagemPerfil from "../ModalSelecionarImagemPerfil";




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
            fecharModal()
        } catch (error) {
            console.error("Erro ao atualizar imagem de perfil", error);
        }
    }

    function fecharModal() {
        setMostrarModal(false)
    }


    return (
        <>
            <div onClick={() => setMostrarModal(true)} className="cursor-pointer relative">
                <img className="w-40 rounded-full border-4 border-white"
                    src={user?.imagemPerfilUrl || "/images/perfil/no-profile-photo-min.jpg"} 
                    alt="Foto de Perfil" />
                <div className="absolute bottom-2 right-1 flex flex-row gap-x-1.5 w-16 bg-black border-amber-50 border-2 rounded">
                    <img src="/images/icons/pencil-simple.svg" alt="edit" />
                    <p>Edit</p>
                </div>
            </div>

            {mostrarModal && ( 
                <ModalSelecionarImagemPerfil 
                    handleSelecionarImagem={handleSelecionarImagem}
                    fecharModal={fecharModal} /> 
            )}
        </>
    )
}