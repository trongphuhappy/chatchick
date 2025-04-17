import { BadgeCheck, CircleCheck } from "lucide-react";

interface Props {
    type: string,
    title: string,
    desc: string
}

function ToastAlert({ type, title, desc }: Props) {
    return (
        <div
            className={`flex items-center p-3 min-w-[400px] max-w-[450px] border-l-4 shadow-md ${type === "success"
                ? "bg-white border-l-green-500 text-green-500"
                : type === "error"
                    ? "bg-white border-l-red-500 text-red-500"
                    : type === "warning"
                        ? "bg-white border-l-yellow-500 text-yellow-500"
                        : ""
                }`}
        >
            <div className="text-xl p-2">
                <BadgeCheck className="w-[40px] h-[40px]" />
            </div>
            <div className="flex-grow pr-2 pl-5">
                <h3 className="font-poppins text-[18px] font-semibold text-gray-800">{title}</h3>
                <p className="mt-1 text-base text-gray-600">{desc}</p>
            </div>
            <div className="border-l-2 border-gray-900  text-xl text-gray-500 cursor-pointer">
            </div>
        </div>
    );
}

export default ToastAlert;
