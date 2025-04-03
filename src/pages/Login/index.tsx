import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserSchemaSignIn, UserSchemaSignInType } from "../../utils/signinValidation";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";



export default function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaSignInType>({
    resolver: zodResolver(UserSchemaSignIn),
  });

  function handleSignin(data: UserSchemaSignInType) {
    const { email, password } = data;

    if (email && password) {
      auth.logar(email, password);
      navigate("/");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-slate-900">
      <h1 className="text-4xl font-normal text-orange-400 mb-20">Login</h1>
      <form onSubmit={handleSubmit((data) => handleSignin(data))} className="flex flex-col justify-center items-center gap-y-7">
        <FormInput type="text" placeholder="email" register={register("email")} errors={errors.email} />
        <FormInput type="password" placeholder="senha" register={register("password")} errors={errors.password} />

        <FormButton text="Entrar" />
        
        <p className="text-zinc-200">não possui uma conta? <Link to="/cadastro" className="text-orange-400">cadastre-se</Link></p>
      </form>
    </div>
  );
}
