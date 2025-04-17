import { Eye, EyeOff } from "lucide-react";

interface Props {
    id: string,
    label: string,
    formHook?: any,
    type?: string,
    error?: string,
    onChangeTypePassword?: any,
    autoComplete?: string,
    watch?: any, //Follow field watch status empty or not
}

export default function InputEditUser({ id, label, type, error, autoComplete, onChangeTypePassword, formHook, watch }: Props) {
    return (
        <>
            <div className="flex justify-between">
                <label htmlFor={id} className="block text-sm font-semibold ml-2 mb-2">
                    {label}
                </label>
            </div>
            <div className={`relative bg-white border border-gray-300 rounded-full overflow-hidden py-2 px-3 flex ${error && "input-auth-error"}`}>
                <input id={id} type={type} autoComplete={autoComplete ?? "off"} className={`border-none text-base flex-1 bg-transparent outline-none ${(id === "password" || id === "confirmpassword") && "pr-[8%]"} `} {...formHook} />
                {(watch !== "" && (id === "password" || id === "confirmpassword")) && <div className="absolute select-none top-[50%] -translate-y-[50%] right-[3%]">
                    <span onClick={onChangeTypePassword} className="label-auth hover:text-gray-700 cursor-pointer">{type === 'password' ? <EyeOff /> : <Eye />}</span>
                </div>}
            </div>
            {error && <p className="mt-2 ml-2 text-base text-red-400">{error}</p>}
        </>
    )
}
