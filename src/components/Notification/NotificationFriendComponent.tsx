'use client'
/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/stores/store";
import { X } from "lucide-react";

interface Props {
    onClose: any;
    onAcceptFriend: any;
    onRejectFriend: any;
}

export default function NotificationFriendComponent({ onClose, onAcceptFriend, onRejectFriend }: Props) {
    const notificationFriendState = useAppSelector(state => state.notificationSlice.initialNotificationFriend);

    const handleClose = () => {
        onClose();
    }

    const handleAcceptFriend = () => {
        onAcceptFriend();
    }

    const handleRejectFriend = () => {
        onRejectFriend();
    }

    return (
        <div className="w-[300px] bg-white p-[15px] rounded-lg shadow-box-shadown break-words">
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-base font-semibold">New notification</span>
                    </div>
                    <button
                        type="button"
                        className="w-10 h-10 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center group"
                        onClick={handleClose}
                    >
                        <i>
                            <X strokeWidth={2.75} className='text-gray-500 group-hover:text-gray-950 w-5 h-5' />
                        </i>
                    </button>
                </div>
                <div className="mt-1 flex items-start gap-x-3">
                    <figure className="rounded-full overflow-hidden w-14 h-14"
                    >
                        <img
                            src={notificationFriendState?.cropAvatar}
                            width={100}
                            height={100}
                            alt="avatar"
                        />
                    </figure>
                    <div className="flex-1 flex flex-col gap-y-4">
                        <p className="text-[15px]">
                            <span className="font-semibold">{notificationFriendState?.fullName}{" "}</span>
                            has sent you a friend request.</p>
                        <div className="flex gap-x-3">
                            <button type="button" className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-700" onClick={handleAcceptFriend}>
                                <span className="text-[15px] text-white">Confirm</span>
                            </button>
                            <button type="button" className="px-2 py-1 rounded-md bg-red-400 
                            hover:bg-red-500 group:" onClick={handleRejectFriend}>
                                <span className="text-[15px] text-white">Reject</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
