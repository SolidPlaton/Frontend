type FormInput = {
    placeholder: string
}


export function FormInput({ placeholder }:FormInput) {

    return (
        <input type="text" placeholder={placeholder} className="text-zinc-200 w-md h-10 border-2 text-lg pl-2.5 outline-none"/>
    )

}


export default function Login() {

    return (
        <div className="flex flex-col justify-center items-center w-screen bg-slate-900">


            <h1 className="text-4xl font-normal text-orange-400 mb-20">
                Login
            </h1>

            <form action="" className="flex flex-col justify-center items-center gap-y-7">

                <FormInput placeholder="email"/>

                <FormInput placeholder="senha"/>

                <button type="submit" className="text-black text-3xl bg-orange-400 w-64 h-16 cursor-pointer">
                    Entrar
                </button>

                <p className="text-zinc-200">não possui uma conta? cadastre-se</p>
            </form>


        </div>
    )

}