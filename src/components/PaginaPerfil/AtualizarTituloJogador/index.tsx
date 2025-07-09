import { api } from "../../../api/axios";
import { useAuth } from "../../../hooks/useAuth";

const titulosDeJogador = [
    "sem título",
    "estudante",
    "matemática",
    "filósofia",
    "professor",
    "professora",
    "focado",
    "competitivo",
    "de boa",
]

export default function AtualizarTituloJogador() {

    const { user, atualizarUser } = useAuth();

    async function handleSelecionarTituloDeJogador(e: React.ChangeEvent<HTMLSelectElement>) {
        const novoTitulo = e.target.value;
        try {
            await api.patch('/api/users', {
                tituloJogador: novoTitulo
            });

            if (user) {
                atualizarUser({ ...user, tituloJogador: novoTitulo });
            }
        } catch (error) {
            console.error("Erro ao atualizar título de jogador", error);
        }
    }

    return (
        <div className="mt-2">
            <select
                className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
                value={user?.tituloJogador || titulosDeJogador[0]}
                onChange={handleSelecionarTituloDeJogador}
            >
                {titulosDeJogador.map((titulo, idx) => (
                    <option key={idx} value={titulo}>
                        {titulo}
                    </option>
                ))}
            </select>
        </div>
    )
}