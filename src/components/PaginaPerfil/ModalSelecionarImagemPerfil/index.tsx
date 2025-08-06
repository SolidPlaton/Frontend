
const imagensPerfil = [
    "/images/perfil/no-profile-photo-min.jpg",
    "/images/perfil/platao.png",
    "/images/perfil/dice.png",
    "/images/solidos/dodecaedro.png",
    "/images/solidos/hexaedro.png",
    "/images/solidos/icosaedro.png",
    "/images/solidos/tetraedro.png",
    "/images/solidos/octaedro.png"
];

type Props = {
    handleSelecionarImagem: (novaImagem: string) => void
    fecharModal: () => void
}

export default function ModalSelecionarImagemPerfil({ handleSelecionarImagem, fecharModal }:Props) {


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-[90%] max-w-xl">
                <h3 className="text-xl font-bold mb-4 text-white">Escolha uma imagem de perfil:</h3>
                <div className="flex flex-row flex-wrap gap-12 justify-start">
                    {imagensPerfil.map((url, idx) => (
                        <img
                            key={idx}
                            src={url}
                            alt="Opção de perfil"
                            className="w-24 h-24 object-cover cursor-pointer rounded-full hover:ring-4 duration-200 ease-out ring-blue-500"
                            onClick={() => handleSelecionarImagem(url)}
                        />
                    ))}
                </div>
                <button
                    onClick={() => fecharModal()}
                    className="mt-6 text-gray-800 bg-white px-4 py-2 rounded hover:bg-sky-200 cursor-pointer"
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}