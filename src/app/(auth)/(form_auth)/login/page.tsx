import { Metadata } from "next"
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Log in"
}

const ClientComponent = dynamic(() => import('@/app/(auth)/(form_auth)/login/login-form'), { ssr: false });

export default function LoginPage() {
    return (
        <div>
            <ClientComponent />
        </div>
    )
}
