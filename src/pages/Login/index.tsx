import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { DialogosContext } from "../../context/Dialogos";
import DialogosEnum from "../../enums/Dialogos";
import { UserSchemaSignIn, UserSchemaSignInType } from "../../utils/signinValidation";
import { UserSchemaSignUp, UserSchemaSignUpType } from "../../utils/signupValidation";
import { api } from "../../api/axios";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";

export default function LoginCadastro() {
  const [activeTab, setActiveTab] = useState<"login" | "cadastro">("login");
  const auth = useContext(AuthContext);
  const { triggerDialog } = useContext(DialogosContext);
  const navigate = useNavigate();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<UserSchemaSignInType>({
    resolver: zodResolver(UserSchemaSignIn),
  });

  const {
    register: cadastroRegister,
    handleSubmit: handleCadastroSubmit,
    formState: { errors: cadastroErrors },
  } = useForm<UserSchemaSignUpType>({
    resolver: zodResolver(UserSchemaSignUp),
  });

  function handleSignin(data: UserSchemaSignInType) {
    auth.logar(data.email, data.password);
    navigate("/");
    triggerDialog(DialogosEnum.introducao);
  }

  async function handleSignup(data: UserSchemaSignUpType) {
    try {
      const response = await api.post("api/users", data);
      if (response.status === 200) {
        auth.logar(data.email, data.senha);
        navigate("/");
        triggerDialog(DialogosEnum.introducao);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-screen w-screen text-white">
      
      {/* Lado esquerdo (ilustração) */}
      <div className="w-1/2 bg-slate-900 flex flex-col items-center justify-between">
        
        <div className="flex flex-col items-center text-center px-10 mt-28">
          <img className="w-3xs" src="/images/elementos/earth-icon.png" alt="Earth" />
          <h2 className="text-6xl text-sky-50 mb-4">Solid Platon</h2>
        </div>

        <div className="flex flex-row justify-center items-center mb-10">
            <p>estude matemática para o </p>
            <img className="w-48" src="/images/elementos/enem-logo.png" alt="ENEM" />
        </div>
      </div>

      {/* Lado direito (formulários) */}
      <div className="w-1/2 bg-sky-50 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-normal text-orange-600 mb-10">Bem-vindo</h1>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            className={`px-4 py-2 border-b-2 font-medium ${
              activeTab === "login"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 border-b-2 font-medium ${
              activeTab === "cadastro"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-zinc-500 hover:text-zinc-700"
            }`}
            onClick={() => setActiveTab("cadastro")}
          >
            Cadastro
          </button>
        </div>

        {/* Login Form */}
        {activeTab === "login" && (
          <form
            onSubmit={handleLoginSubmit(handleSignin)}
            className="flex flex-col justify-center items-center gap-y-6 w-80"
          >
            <FormInput
              type="text"
              placeholder="email"
              register={loginRegister("email")}
              errors={loginErrors.email}
            />
            <FormInput
              type="password"
              placeholder="senha"
              register={loginRegister("password")}
              errors={loginErrors.password}
            />
            <FormButton text="Entrar" />

            <p className="text-zinc-600 text-sm mt-4">
              não possui uma conta?{" "}
              <span
                onClick={() => setActiveTab("cadastro")}
                className="text-orange-600 cursor-pointer underline hover:text-orange-700"
              >
                cadastre-se
              </span>
            </p>
          </form>
        )}

        {/* Cadastro Form */}
        {activeTab === "cadastro" && (
          <form
            onSubmit={handleCadastroSubmit(handleSignup)}
            className="flex flex-col justify-center items-center gap-y-6 w-80"
          >
            <FormInput
              type="text"
              placeholder="seu nome"
              register={cadastroRegister("nome")}
              errors={cadastroErrors.nome}
            />
            <FormInput
              type="email"
              placeholder="email"
              register={cadastroRegister("email")}
              errors={cadastroErrors.email}
            />
            <FormInput
              type="password"
              placeholder="senha"
              register={cadastroRegister("senha")}
              errors={cadastroErrors.senha}
            />
            <FormButton text="Cadastrar" />

            <p className="text-zinc-600 text-sm mt-4">
              já tem uma conta?{" "}
              <span
                onClick={() => setActiveTab("login")}
                className="text-orange-600 cursor-pointer underline hover:text-orange-700"
              >
                faça login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
