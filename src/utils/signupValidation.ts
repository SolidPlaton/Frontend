import {z} from 'zod'


export const UserSchemaSignUp = z.object({
    nome:z.string().min(1, {message: "nome é obrigatório!"}),
    email:z.string().min(1, {message: "email é obrigatório!"}).email({message: "email inválido!"}),
    senha:z.string().min(8, {message: "senha menor que 8 caracteres!"}),
})

export type UserSchemaSignUpType = z.infer<typeof UserSchemaSignUp>;