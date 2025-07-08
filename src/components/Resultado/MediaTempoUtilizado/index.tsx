import { IResposta } from "../../../interfaces/Fase";

type MediaTempoUtilizadoProps = {
  respostas: IResposta[];
};

export default function MediaTempoUtilizado({ respostas }: MediaTempoUtilizadoProps) {
  const TEMPO_TOTAL_POR_QUESTAO = 300; // segundos

  const temposUtilizados = respostas.map(
    (resposta) => TEMPO_TOTAL_POR_QUESTAO - resposta.tempoRestante
  );

  const somaTempos = temposUtilizados.reduce((acc, tempo) => acc + tempo, 0);
  const media = respostas.length > 0 ? somaTempos / respostas.length : 0;

  // Formatar média
  const mediaMinutos = Math.floor(media / 60);
  const mediaSegundos = Math.round(media % 60);

  // Formatar total
  const totalMinutos = Math.floor(somaTempos / 60);
  const totalSegundos = Math.round(somaTempos % 60);

  return (
    <div className="text-white w-2xs">
      <div className="flex flex-row justify-between w-full">
          <p>Média de tempo por questão:</p> 
          <p>{mediaMinutos}min {mediaSegundos}s</p>
      </div>

      <div className="flex flex-row justify-between w-full">
          <p>Tempo total utilizado:</p> 
          <p>{totalMinutos}min {totalSegundos}s</p>
      </div>
    </div>
  );
}
