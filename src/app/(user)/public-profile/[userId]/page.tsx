import dynamic from "next/dynamic";

const ClientOnlyComponent = dynamic(() => import('@/app/(user)/public-profile/[userId]/public-profile'), {
    ssr: false,
});


export default function ProfilePage({ params }: any) {
    return (
        <div>
            <ClientOnlyComponent userId={params?.userId} />
        </div>
    )
}
