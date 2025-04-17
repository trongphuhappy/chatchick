'use client'
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Toaster } from 'sonner'


const Scene = dynamic(() => import("@/components/Thread/Scene"), { ssr: false })

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const handleClose = () => {
        router.push("/");
    }

    return (
        <div className="relative text-base flex items-center h-[100vh]">
            <Toaster
                position="top-right"
                richColors
                expand={true}
                style={{ marginRight: 28 }}
            />
            <section className="w-[45%] h-full bg-auth-gradient">
                <Scene />
            </section>
            <section className=" bg-white flex-1" >
                <div className="absolute top-5 right-10 p-2 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer" onClick={handleClose}>
                    <X />
                </div>
                {children}
            </section>
        </div>
    );
}