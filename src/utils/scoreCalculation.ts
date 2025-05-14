import { IResposta } from "../interfaces/Fase";


export const scoreCalculation = (valorBase: number, initialTime: number, respostas: IResposta[]) => {
  let estrelas = 0;
  let pontuacaoTotal = 0;

  respostas.forEach((resposta) => {
    const tempoGasto = initialTime - resposta.tempoRestante

    if (resposta.estaCorreta) {
      estrelas += 1;
      pontuacaoTotal += valorBase;

      if (tempoGasto < 180) {
        pontuacaoTotal += 300;
      } else if (tempoGasto < 240) {
        pontuacaoTotal += 150;
      } else if (tempoGasto < 300) {
        pontuacaoTotal += 50;
      }

    } else {
      valorBase = Math.max(100, valorBase - 100)
    }
  });

  return {
    estrelas,
    pontuacaoTotal,
    faseConcluida: estrelas >= 3
  };
};