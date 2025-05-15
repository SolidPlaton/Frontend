import { IResposta } from "../interfaces/Fase";


export const scoreCalculation = (valorBase: number, initialTime: number, respostas: IResposta[]) => {
  let estrelas = 0;
  let pontuacaoTotal = 0;

  const tresMinutos   = 180;
  const quatroMinutos = 240;
  const cincoMinutos  = 300;

  respostas.forEach((resposta) => {
    const tempoGasto = initialTime - resposta.tempoRestante

    if (resposta.estaCorreta) {
      estrelas += 1;
      pontuacaoTotal += valorBase;

      if (tempoGasto < tresMinutos) {
        pontuacaoTotal += 400;
      } else if (tempoGasto < quatroMinutos) {
        pontuacaoTotal += 200;
      } else if (tempoGasto < cincoMinutos) {
        pontuacaoTotal += 100;
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