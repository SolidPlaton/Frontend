import {z} from 'zod'


export const UserSchemaSignIn = z.object({
    email:z.string().min(1, {message: "email é obrigatório!"}).email({message: "email inválido!"}),
    password:z.string().min(8, {message: "senha menor que 8 caracteres!"}),
})


export type UserSchemaSignInType = z.infer<typeof UserSchemaSignIn>