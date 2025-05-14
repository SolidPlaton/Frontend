import { Assunto, IQuestao } from "./Questao"

export interface IFase {
    nome: string
    assunto: Assunto
    id?: number
    questoes?: IQuestao[]
}


export interface IFaseState {
  questaoAtualIndex: number;
  respostas: IResposta[];
  tempoInicial: number;
}


export interface IResposta {
  questionId: number;
  alternativaSelecionada: number | null; // null caso o tempo acabe sem resposta
  tempoRestante: number;
  estaCorreta?: boolean;
}