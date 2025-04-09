import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { IFase } from "../../interfaces/Fase";
import { api } from "../../api/axios"
import { useParams } from "react-router-dom";

type FaseParams = {
    id: string;
};

export default function Fase() {
    const { id } = useParams<FaseParams>()

    const [fase, setFase] = useState<IFase>()

    useEffect(() => {
        const fetchFase = async () => {
            try {
                const response =  await api.get(`/api/fase/${id}`)
                setFase(response.data.fase)
            } catch (error) {
                console.error("Erro ao buscar dados da Fase:", error);
            }
        }

        fetchFase()
    }, [id])

    return (
        <Layout>
            <div >
                <p>{fase?.id}</p>
                <p>{fase?.nome}</p>
                <p>{fase?.assunto}</p>
            </div>
        </Layout>
    )
}