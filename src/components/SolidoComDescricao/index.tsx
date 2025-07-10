import { useState, useRef } from "react";
import { solido } from "../../types/solido";

interface Props {
  fase: {
    concluida: boolean;
    solido: solido;
  };
}

export default function SolidoComDescricao({ fase }: Props) {
  const [hovering, setHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHovering(false);
    }, 300); // delay de 300ms
  };

  return (
    <div
      className="relative flex items-start gap-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hovering && (
        <div className="absolute right-full mr-4 top-0 w-72 bg-gray-800 shadow-xl border border-gray-300 rounded-xl p-4 z-10">
          <h2 className="text-lg text-sky-100 font-bold mb-2">{fase.solido.nome}</h2>
          <p className="text-sm text-sky-100">{fase.solido.descricao}</p>

          <div className="mt-4 border-t pt-2 text-xs text-blue-300">
            <p className="font-semibold mb-1">Saiba Mais:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <a
                  href="https://mundoeducacao.uol.com.br/matematica/solidos-de-platao.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Mundo Educação
                </a>
              </li>
              <li>
                <a
                  href="https://br.neurochispas.com/geometria/os-5-solidos-platonicos-propriedades-diagramas-e-exemplos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Neurochispas
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <img
        draggable="false"
        src={fase.solido.img_path}
        alt="Imagem da fase"
        className={`w-40 transition-all duration-300 ${
          fase.concluida ? "" : "filter grayscale opacity-30"
        }`}
        title={fase.concluida ? "" : "desaparecido"}
      />
    </div>
  );
}
