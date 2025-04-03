import { Assunto, IQuestao } from "./Questao"

export interface IFase {
    nome: string
    assunto: Assunto
    id?: number
    questoes?: IQuestao[]
}