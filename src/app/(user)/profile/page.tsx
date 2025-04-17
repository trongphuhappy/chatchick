import dynamic from "next/dynamic";

const ClientOnlyComponent = dynamic(() => import('@/app/(user)/profile/profile'), {
    ssr: false,
});


export default function ProfilePage({ params }: any) {
    return (
        <div>
            <ClientOnlyComponent />
        </div>
    )
}
