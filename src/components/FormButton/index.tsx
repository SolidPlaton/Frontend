

type FormButton = {
    text: string
};

export function FormButton({ text }: FormButton) {
    return (
        <button type="submit" className="text-black text-3xl bg-orange-400 w-64 h-16 cursor-pointer">
            {text}
        </button>
    );
}