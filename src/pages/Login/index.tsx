import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

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

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<UserSchemaSignInType>({
    resolver: zodResolver(UserSchemaSignIn),
  });

  // Cadastro form
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
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-normal text-orange-400 mb-10">Bem-vindo</h1>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "login" ? "border-orange-400 text-orange-400" : "border-transparent text-zinc-400"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 border-b-2 ${
            activeTab === "cadastro" ? "border-orange-400 text-orange-400" : "border-transparent text-zinc-400"
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

          <p className="text-zinc-300 text-sm mt-4">
            não possui uma conta?{" "}
            <span
              onClick={() => setActiveTab("cadastro")}
              className="text-orange-400 cursor-pointer underline"
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

          <p className="text-zinc-300 text-sm mt-4">
            já tem uma conta?{" "}
            <span
              onClick={() => setActiveTab("login")}
              className="text-orange-400 cursor-pointer underline"
            >
              faça login
            </span>
          </p>
        </form>
      )}
    </div>
  );
}
