import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../api/axios";
import DisplayEstrelas from "../DisplayEstrelas";


type Props = {
    img_path: string,
    fase_id: number,
    curiosidade: string
}


export default function FaseButton({ img_path, fase_id, curiosidade }:Props) {

    const [desbloqueada, setDesbloqueada] = useState(false);
    const [melhorPontuacao, setMelhorPontuacao] = useState<number|null>(null)
    const [estrelas, setEstrelas] = useState(0)


    useEffect(() => {

        const fetchFase = async () => {
            try {
                const melhorPontuacaoResponse = await api.get(`/api/fase/${fase_id}/pontuacao`)
                const estrelas                = await api.get(`/api/fase/${fase_id}/estrelas`)
                setMelhorPontuacao(melhorPontuacaoResponse.data.valor)
                setEstrelas(estrelas.data.quantidade)
            } catch (error) {
                console.error("Erro ao buscar dados da Fase:", error);
            }
        }

        fetchFase()


        if (fase_id === 1) {
            setDesbloqueada(true);
            return;
        }


        async function checkFaseAnterior() {
            try {
                const res = await api.get<{ quantidade: number | null }>(
                    `/api/fase/${fase_id - 1}/estrelas`
                );
                setDesbloqueada(res.data.quantidade! >= 3);
            } catch (err) {
                setDesbloqueada(false);
            }
        }

        checkFaseAnterior();
    }, [fase_id]);


        return (
            <>
                {desbloqueada ? (
                    <Link
                        to={`/fase/${fase_id}`}
                        state={{ img_path, curiosidade }}
                        className="group relative flex flex-col items-center" >
                        
                        <div className="opacity-0 group-hover:opacity-100 transition duration-150">
                            <DisplayEstrelas
                                estrelas={estrelas}
                            />
                        </div>

                        <img
                            draggable="false"
                            src={img_path}
                            alt={`Fase ${fase_id}`}
                            className="min-w-[150px] max-w-[150px] cursor-pointer group-hover:scale-125 transition duration-150 ease-in-out select-none"
                        />

                        <p className="text-white opacity-0 group-hover:opacity-100 transition duration-150">
                            {melhorPontuacao || 0} pts
                        </p>
                    </Link>

                ) : (
                    <div title="Indisponível">
                        <img
                            draggable="false"
                            src={img_path}
                            alt={`Fase ${fase_id} (bloqueada)`}
                            className="min-w-[155px] max-w-[150px] filter grayscale  select-none"
                        />
                    </div>
                )}
            </>
        );
    }
