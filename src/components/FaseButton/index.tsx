import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../api/axios";
import DisplayEstrelas from "../DisplayEstrelas";
import { fase } from "../../types/fase";


type Props = {
    fase: fase
}


export default function FaseButton({ fase }:Props) {

    const [desbloqueada, setDesbloqueada] = useState(false);
    const [melhorPontuacao, setMelhorPontuacao] = useState<number|null>(null)
    const [estrelas, setEstrelas] = useState(0)


    useEffect(() => {

        const fetchFase = async () => {
            try {
                const melhorPontuacaoResponse = await api.get(`/api/fase/${fase.id}/pontuacao`)
                const estrelas                = await api.get(`/api/fase/${fase.id}/estrelas`)
                setMelhorPontuacao(melhorPontuacaoResponse.data.valor)
                setEstrelas(estrelas.data.quantidade)
            } catch (error) {
                console.error("Erro ao buscar dados da Fase:", error);
            }
        }

        fetchFase()


        if (fase.id === 1) {
            setDesbloqueada(true);
            return;
        }


        async function checkFaseAnterior() {
            try {
                const res = await api.get<{ quantidade: number | null }>(
                    `/api/fase/${fase.id - 1}/estrelas`
                );
                setDesbloqueada(res.data.quantidade! >= 3);
            } catch (err) {
                setDesbloqueada(false);
            }
        }

        checkFaseAnterior();
    }, [fase.id]);


        return (
            <>
                {desbloqueada ? (
                    <Link
                        to={`/fase/${fase.id}`}
                        state={{ fase }}
                        className="group relative flex flex-col items-center" >
                        
                        <div className="opacity-0 group-hover:opacity-100 transition duration-150">
                            <DisplayEstrelas
                                estrelas={estrelas}
                            />
                        </div>

                        <img
                            draggable="false"
                            src={fase.img_path}
                            alt={`Fase ${fase.id}`}
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
                            src={fase.img_path}
                            alt={`Fase ${fase.id} (bloqueada)`}
                            className="min-w-[155px] max-w-[150px] filter grayscale  select-none"
                        />
                    </div>
                )}
            </>
        );
    }
