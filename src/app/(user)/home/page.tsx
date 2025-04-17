import dynamic from 'next/dynamic';

const ClientComponent = dynamic(() => import('@/app/(user)/home/home-user'), { ssr: false });

export default function HomeUserPage() {
    return (
        <div>
            <ClientComponent />
        </div>
    )
}
