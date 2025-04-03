export interface IUsuario {
    nome: string,
    email: string,
    senha: string,
    role: Role,
    id?: number,
    tituloJogador?: string,
    imagemPerfilUrl?: string,
}


export enum Role {
    USUARIO_COMUM = 'usuario_comum',
    ADMIN = 'admin'
}