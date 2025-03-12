type FormInput = {
    type: string,
    placeholder: string;
    register: any;
    errors: any;
};

export function FormInput({ type, placeholder, register, errors }: FormInput) {
    return (
        <div>
        <input type={type} placeholder={placeholder} {...register} className="text-zinc-200 w-md h-10 border-2 text-lg pl-2.5 outline-none" />
            {errors && <p className="text-red-500">{errors.message}</p>}
        </div>
    );
}