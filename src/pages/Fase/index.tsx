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


                <div className="w-full h-96 flex flex-col justify-between items-center mt-24">
                    
                    {img_path && <img draggable="false" src={img_path} alt="Imagem da fase" className="w-40" />}
                    
                    <div className="flex flex-col gap-y-5">
                        <p className="text-white">
                            melhor pontuação: value pts
                        </p>
    
                        <div className="bg-fuchsia-950 text-white h-12 w-48 rounded-xl cursor-pointer
                                            flex items-center justify-center
                                            border-2 border-black hover:border-orange-400 hover:text-orange-400">
                            Iniciar
                        </div>
    
                    </div>
                </div>
            </div>
        </Layout>
    )
}