import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { IFase } from "../../interfaces/Fase";
import { api } from "../../api/axios"
import { useLocation, useParams } from "react-router-dom";

type FaseParams = {
    id: string;
};

export default function Fase() {
    const { id } = useParams<FaseParams>()
    const location = useLocation();
    const img_path = location.state?.img_path ?? "";

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
                {img_path && <img draggable="false" src={img_path} alt="Imagem da fase" />}
                <p>{fase?.id}</p>
                <p>{fase?.nome}</p>
                <p>{fase?.assunto}</p>
            </div>
        </Layout>
    )
}