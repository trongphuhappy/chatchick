import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Sign up"
}

const ClientComponent = dynamic(() => import('@/app/(auth)/(form_auth)/signup/signup-form'), { ssr: false });

export default function SignUpPage() {
    return (
        <div>
            <ClientComponent />
        </div>
    )
}
