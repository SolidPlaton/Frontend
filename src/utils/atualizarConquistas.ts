import { api } from "../api/axios";

export const atualizarConquistas = async () => {
    try {
        const response =  await api.patch(`/api/conquistas`)
    } catch (error) {
        console.error("Erro ao atualizar conquistas", error);
    }
}