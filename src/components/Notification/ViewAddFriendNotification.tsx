'use clien'
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface ViewAddFriendNotificationProps {
    notificationFriends: any,
    onAcceptFriend: any,
    onRejectFriend: any,
}

export default function ViewAddFriendNotification({ notificationFriends, onAcceptFriend, onRejectFriend }: ViewAddFriendNotificationProps) {
    const handleAcceptFriend = (user: any) => {
        onAcceptFriend(user);
    }

    const handleRejectFriend = (user: any) => {
        onRejectFriend(user);
    }

    const BoxAddFriend = (user: any) => {
        return <div className="mt-1 flex items-start gap-x-3">
            <figure className="rounded-full overflow-hidden w-16 h-16"
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_SERVER}/${process.env.NEXT_PUBLIC_SERVER_GET_IMAGE}${user?.data?.cropAvatar}`}
                    width={100}
                    height={100}
                    alt="avatar"
                />
            </figure>
            <div className="flex-1 flex flex-col gap-y-4">
                <p className="text-[15px]">
                    <span className="font-semibold">{user?.data?.fullName}{" "}</span>
                    has sent you a friend request.</p>
                <div className="flex gap-x-3">
                    <button className="w-1/2 h-8 rounded-md bg-blue-600 hover:bg-blue-700" onClick={() => handleAcceptFriend(user)}>
                        <span className="text-[15px] text-white">Confirm</span>
                    </button>
                    <button className="w-1/2 h-8 rounded-md bg-red-400 
                hover:bg-red-500 group:" onClick={() => handleRejectFriend(user)}>
                        <span className="text-[15px] text-white">Reject</span>
                    </button>
                </div>
            </div>
        </div>
    }

    const ListNotificationFriend = () => {
        return notificationFriends?.map((item: any, index: number) => {
            return <BoxAddFriend key={index} data={item} />
        })
    }

    return (
        <div>
            <header className="flex items-center justify-between">
                <p className="text-base text-gray-900 font-semibold">Friend Request</p>
                <Link href="#!">
                    <div className="px-2 py-2 hover:bg-slate-200 rounded-lg">
                        <span className="text-base text-[#0064d1] font-light">View more</span>
                    </div>
                </Link>
            </header>
            <section className={`py-2 flex flex-col gap-y-5`}>
                {ListNotificationFriend()}
            </section>
        </div>
    )
}
