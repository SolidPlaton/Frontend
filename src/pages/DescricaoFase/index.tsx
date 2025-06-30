import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { IFase } from "../../interfaces/Fase";
import { api } from "../../api/axios"
import { Link, useLocation, useParams } from "react-router-dom";

import caret_left from "/images/icons/caret-left.svg"
import DisplayEstrelas from "../../components/DisplayEstrelas";
import DialogosEnum from "../../enums/Dialogos";
import { DialogosContext } from "../../context/Dialogos";
import { ISolido } from "../../interfaces/Solido";

type FaseParams = {
    id: string;
};

export default function DescricaoFase() {
    const { id } = useParams<FaseParams>()
    const location = useLocation();
    const img_path = location.state?.img_path ?? "";
    const curiosidade = location.state?.curiosidade ?? "";

    const [fase, setFase] = useState<IFase>()
    const [melhorPontuacao, setMelhorPontuacao] = useState<number|null>(null)
    const [estrelas, setEstrelas] = useState(0)

    const [solido, setSolido] = useState<ISolido>()

    const [concluida, setConcluida] = useState(false)

    const { triggerDialog } = useContext(DialogosContext)


    useEffect(() => {
        const fetchFase = async () => {
            try {
                const response =  await api.get(`/api/fase/${id}`)
                const melhorPontuacaoResponse =  await api.get(`/api/fase/${id}/pontuacao`)
                const estrelas =  await api.get(`/api/fase/${id}/estrelas`)
                setFase(response.data.fase)
                setMelhorPontuacao(melhorPontuacaoResponse.data.valor)
                setEstrelas(estrelas.data.quantidade)
            } catch (error) {
                console.error("Erro ao buscar dados da Fase:", error);
            }
        }

        fetchFase()


        const fetchSolido = async () => {
            try {
                const response = await api.get(`/api/solido/${id}`)
                setSolido(response.data.solido) 
            } catch (error) {
                console.error("Erro ao buscar solido da Fase:", error);
            }
        }

        fetchSolido()
    }, [id])

    useEffect(() => {
        if (fase?.nome) {
            const nome = fase?.nome
            const valorEnum = DialogosEnum[nome as keyof typeof DialogosEnum];
            triggerDialog(valorEnum) 
        }

        
        async function faseConcluida() {
            try {
                if (fase?.id) {
                    const res = await api.get<{ quantidade: number | null }>(
                        `/api/fase/${fase?.id}/estrelas`
                    );
                    setConcluida(res.data.quantidade! >= 3);
                }
            } catch (err) {
                setConcluida(false);
            }
        }

        faseConcluida();
    }, [fase])

    return (
        <Layout>

            <Link to='/campanha' className="w-fit flex m-6">
                <div className="flex flex-row items-center justify-start w-16">
                    <img src={caret_left} alt="" className="" />
                    <p className="text-white">
                        voltar
                    </p>
                </div>
            </Link>

            <div className="w-full mb-28 flex flex-col justify-between items-center gap-y-6 mt-5">
                <p className="text-3xl text-white select-none">O {fase?.nome}</p>

                <div>
                    <p className="text-white w-100 select-none text-base text-center font-extralight italic opacity-80">
                        "{ curiosidade }"                    
                    </p>
                </div>
                
            </div>



            <div className="w-full flex flex-row justify-around items-start">

                <div className="text-white flex flex-col gap-y-4">
                    Regras:
                    <p>✅ Cada questão correta valerá +500 pts e uma Estrela.</p>
                    <p>⏱️ Responda em até 5 minutos por questão!</p>
                    <p>⚡ Questões respondidas em menos de 3 minutos recebem um bônus de +200 pts.</p>
                    <p>🆙 Pelo menos 3 acertos para passar de Fase.</p>
                </div>

                <div className="flex flex-col gap-y-7">

                    <div className="flex flex-col items-center gap-y-3.5">
                        <DisplayEstrelas estrelas={estrelas} />
                        <div>
                            {img_path && concluida 
                                ? <img draggable="false" src={solido?.img_path} alt="Imagem da fase" className="w-40" />
                                : <img draggable="false" src={solido?.img_path} alt="Imagem da fase" 
                                       className="w-40 filter grayscale opacity-30" title="desaparecido" />
                            }
                        </div>
                        <p className="text-white">
                            melhor pontuação: {melhorPontuacao || 0} pts
                        </p>
                    </div>
                </div>

            </div>


            <div className="flex flex-row justify-center m-14">
                <Link
                    to={`/fase/${id}/questoes`}
                    state={{ fase, melhorPontuacao }}>
                        <div className="bg-fuchsia-950 text-white h-12 w-48 rounded-xl cursor-pointer
                                            flex items-center justify-center
                                            border-2 border-black hover:border-orange-400 hover:text-orange-400">
                            Iniciar
                        </div>
                </Link >
            </div>


        </Layout>
    )
}