export enum Assunto {
    GEOMETRIA = 'geometria',
    RAZAO_PROPORCAO = 'razao_proporcao', 
    FUNCAO = 'funcao',
    ESTATISTICA = 'estatistica',
    PORCENTAGEM = 'porcentagem'
}

export enum Dificuldade {
    FACIL = 'facil',
    MEDIA = 'media',
    DIFICIL = 'dificil'
}


export type Alternativa = {
    numero: number,
    texto: string
}

export interface IQuestao {
    alternativas: Alternativa[],
    alternativaCorreta: number,
    assuntos: Assunto,
    dificuldade: Dificuldade,
    imagemUrl: string
}