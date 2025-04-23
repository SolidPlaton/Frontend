import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { IFase } from "../../interfaces/Fase";
import { api } from "../../api/axios"
import { Link, useLocation, useParams } from "react-router-dom";

import caret_left from "../../../public/images/icons/caret-left.svg"

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
            <div className="bg-[url('/images/universo.jpg')] w-screen h-screen">

                <Link to='/campanha' className="w-fit flex m-6">
                    <div className="flex flex-row items-center justify-start w-16">
                        <img src={caret_left} alt="" className="" />
                        <p className="text-white">
                            voltar
                        </p>
                    </div>
                </Link>


                {img_path && <img draggable="false" src={img_path} alt="Imagem da fase" />}
                <p>{fase?.id}</p>
                <p>{fase?.nome}</p>
                <p>{fase?.assunto}</p>
            </div>
        </Layout>
    )
}