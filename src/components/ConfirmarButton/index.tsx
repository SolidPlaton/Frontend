
type Props = {
    selecionada: boolean;
    proxima: () => void
}


export default function ConfirmarButton({ proxima, selecionada }:Props) {
    return (
        <div
                className={`flex justify-center items-center text-black select-none h-12 w-2xs text-xl ${
                                selecionada
                                ? "cursor-pointer bg-orange-400 hover:bg-orange-600 duration-200 ease-out"
                                : "opacity-50 bg-gray-400" 
                            }`}
                onClick={() => selecionada && proxima()}
            >
                confirmar
        </div>
    )
}