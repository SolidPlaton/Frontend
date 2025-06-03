import { IResposta } from "../interfaces/Fase";


export const scoreCalculation = (resposta:IResposta, alternativaCorreta: number, initialTime: number) => {
  const tresMinutos   = 180;

  resposta.estaCorreta = resposta.alternativaSelecionada === alternativaCorreta

  if (resposta.estaCorreta) {
    resposta.valorAcerto = 500

    const tempoGasto = initialTime - resposta.tempoRestante

    if (tempoGasto <= tresMinutos) {
      resposta.bonusTempo = 200;
    }

  }

  return resposta
};