import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { api } from "../../api/axios"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import caret_left from "/images/icons/caret-left.svg"
import DisplayEstrelas from "../../components/DisplayEstrelas";
import DialogosEnum from "../../enums/Dialogos";
import { DialogosContext } from "../../context/Dialogos";
import { fase } from "../../types/fase";
import { IQuestao } from "../../interfaces/Questao";

type FaseParams = {
    id: string;
};

export default function DescricaoFase() {
    const { id } = useParams<FaseParams>()
    const location = useLocation();
    const navigate = useNavigate();
    
    const fase = location.state?.fase as fase;

    const [melhorPontuacao, setMelhorPontuacao] = useState<number|null>(null)
    const [estrelas, setEstrelas] = useState(0)

    const [concluida, setConcluida] = useState(false)

    const { triggerDialog } = useContext(DialogosContext)


    useEffect(() => {
        const fetchFase = async () => {
            try {
                const melhorPontuacaoResponse =  await api.get(`/api/fase/${fase.id}/pontuacao`)
                const estrelas =  await api.get(`/api/fase/${fase.id}/estrelas`)


                const nome = fase.nome
                const valorEnum = DialogosEnum[nome as keyof typeof DialogosEnum];
                triggerDialog(valorEnum) 


                setConcluida(estrelas.data.quantidade >= 3);

                setMelhorPontuacao(melhorPontuacaoResponse.data.valor)
                setEstrelas(estrelas.data.quantidade)


            } catch (error) {
                console.error("Erro ao buscar dados da Fase:", error);
            }
        }

        fetchFase()
    }, [fase])

    
    const handleIniciar = async () => {
        try {
            const questoesResponse = await api.get(`/api/fase/${fase.id}/questoes`);
            const questoes: IQuestao[] = questoesResponse.data.questoes;

            navigate(`/fase/${id}/questoes`, {
                state: {
                    fase,
                    melhorPontuacao,
                    questoes
                }
            });
        } catch (error) {
            console.error("Erro ao buscar questões:", error);
        }
    };


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
                <p className="text-3xl text-white select-none">{fase.nome}</p>

                <div>
                    <p className="text-white w-100 select-none text-base text-center font-extralight italic opacity-80">
                        "{ fase.curiosidade }"                    
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
                            {concluida 
                                ? <img draggable="false" src={fase.solido.img_path} alt="Imagem da fase" className="w-40" />
                                : <img draggable="false" src={fase.solido.img_path} alt="Imagem da fase" 
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
                <button
                    onClick={handleIniciar}
                    className="bg-fuchsia-950 text-white h-12 w-48 rounded-xl cursor-pointer
                               flex items-center justify-center
                               border-2 border-black hover:border-orange-400 hover:text-orange-400">
                    Iniciar
                </button>
            </div>


        </Layout>
    )
}