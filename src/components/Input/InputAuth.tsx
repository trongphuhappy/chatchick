import { Eye, EyeOff } from "lucide-react";

interface InputAuthProps {
    id: string,
    label: string,
    formHook?: any,
    type?: string,
    error?: string,
    onChangeTypePassword?: any,
    autoComplete?: string,
    watch?: any,
}

export default function InputAuth({ id, label, type, error, autoComplete, onChangeTypePassword, formHook, watch }: InputAuthProps) {
    return (
        <>
            <div className="flex justify-between">
                <label htmlFor={id} className="label-auth">
                    {label}
                </label>

            </div>
            <div className={`relative input-auth ${error && "input-auth-error"}`}>
                <input id={id} type={type} autoComplete={autoComplete ?? "off"} className={`border-none outline-none w-full ${(id === "password" || id === "confirmpassword") && "pr-[8%]"} `} {...formHook} />
                {(watch !== "" && (id === "password" || id === "confirmpassword")) && <div className="absolute select-none top-[50%] -translate-y-[50%] right-[3%]">
                    <span onClick={onChangeTypePassword} className="label-auth hover:text-gray-700 cursor-pointer">{type === 'password' ? <EyeOff /> : <Eye />}</span>
                </div>}
            </div>
            {error && <p className="text-base text-red-400">{error}</p>}
        </>
    )
}
