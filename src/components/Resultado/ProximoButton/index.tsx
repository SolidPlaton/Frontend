import { useNavigate } from "react-router-dom";

export default function ProximoButton() {

    const navigate = useNavigate();

    return (
        <div className="w-48 h-10 bg-orange-400 flex justify-center items-center cursor-pointer select-none"
             onClick={() => navigate('/campanha')}>
            próxima
        </div>
    )
}