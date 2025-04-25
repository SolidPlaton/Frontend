import { useNavigate } from "react-router-dom";
import fechar_questoes from "/images/icons/fechar-questoes.svg"



export default function FecharButton() {
    const navigate = useNavigate();
    
    return (
        <div onClick={() => navigate("/campanha")} className="w-60px h-60px bg-pink-700 cursor-pointer">
            <img src={fechar_questoes} alt="fechar questão" />
        </div>
    )
}