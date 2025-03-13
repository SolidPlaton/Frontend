import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../components/FormInput";
import { UserSchemaSignUp, UserSchemaSignUpType } from "../../utils/signupValidation";
import { useForm } from "react-hook-form";
import { api } from "../../api/axios";
import { FormButton } from "../../components/FormButton";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";



export default function Cadastro()  {
    const auth = useContext(AuthContext);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserSchemaSignUpType>({
      resolver: zodResolver(UserSchemaSignUp),
    });


    async function handleSignup(data:UserSchemaSignUpType) {

        try {
            const response = await api.post('api/users', data)

            if (response.status === 200) {
                auth.logar(data.email, data.senha)
            }
        } catch (error) {
            console.error(error)
        }
    }
  

  
    return (
        <div className="flex flex-col justify-center items-center w-screen bg-slate-900">
            <h1 className="text-4xl font-normal text-orange-400 mb-20">
                Criar Conta
            </h1>

            <form onSubmit={handleSubmit((data) => handleSignup(data))} className="flex flex-col justify-center items-center gap-y-7">
            
                <FormInput type="text" placeholder="seu nome" register={register("nome")} errors={errors.nome} />
                <FormInput type="email" placeholder="email" register={register("email")} errors={errors.email} />
                <FormInput type="password" placeholder="senha" register={register("senha")} errors={errors.senha} />
                
                <FormButton text="Cadastrar" />

                <p className="text-zinc-200">você tem uma conta? <Link to="/" className="text-orange-400">entre aqui</Link></p>
            </form>
        </div>
    );
}