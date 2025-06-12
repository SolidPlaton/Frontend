import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../api/axios";


type Props = {
    img_path: string,
    fase_id: number
}


export default function FaseButton({ img_path, fase_id }:Props) {

    const [desbloqueada, setDesbloqueada] = useState(false);


    useEffect(() => {
        if (fase_id === 1) {
            setDesbloqueada(true);
            return;
        }


        async function checkFaseAnterior() {
            try {
                const res = await api.get<{ quantidade: number | null }>(
                    `/api/fase/${fase_id - 1}/estrelas`
                );
                setDesbloqueada(res.data.quantidade! > 0);
            } catch (err) {
                setDesbloqueada(false);
            }
        }

        checkFaseAnterior();
    }, [fase_id]);


        return (
            <>
                {desbloqueada ? (
                    <Link to={`/fase/${fase_id}`} state={{ img_path }}>
                        <img
                            draggable="false"
                            src={img_path}
                            alt={`Fase ${fase_id}`}
                            className="min-w-[150px] max-w-[150px] cursor-pointer hover:scale-125 transition duration-150 ease-in-out select-none"
                        />
                    </Link>
                ) : (
                    <div title="Indisponível">
                        <img
                            draggable="false"
                            src={img_path}
                            alt={`Fase ${fase_id} (bloqueada)`}
                            className="min-w-[155px] max-w-[150px] filter grayscale opacity-50 select-none"
                        />
                    </div>
                )}
            </>
        );
    }
