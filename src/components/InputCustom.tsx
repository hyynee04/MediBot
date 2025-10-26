const InputCustom = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            {...props}
            className="text-primary-black text-sm p-4 rounded-full bg-background-white w-full focus:outline-none"
        />
    )
}

export default InputCustom