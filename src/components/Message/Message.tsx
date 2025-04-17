/* eslint-disable @next/next/no-img-element */
'use client'
import MessageBoxComponent from "@/components/Message/MessageBoxComponent";
import { CloseMessage, UnHideMessage } from "@/stores/messageSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Message({ children }: { children: React.ReactNode }) {

    const messageState = useAppSelector(state => state.messageSlice);
    const dispatch = useAppDispatch();

    const handleUnHideMessage = (userId: number) => {
        dispatch(UnHideMessage({
            userId: userId
        }))
    }

    const handleCloseMessage = (userId: number) => {
        dispatch(CloseMessage({
            userId: userId
        }))
    }

    return (
        <div>
            <div>
                <div className="fixed bottom-10 right-5 z-50">
                    <div className="flex flex-col gap-y-2">
                        {messageState.boxMessages?.filter((item: any) => item.active === false)?.map((item: any, index: any) => {
                            return <div key={index} className="relative">
                                <figure className="flex-shrink-0 rounded-full overflow-hidden w-12 h-12 shadow-avatar-shadown cursor-pointer hover group"
                                >
                                    <img
                                        src={item?.avatar}
                                        width={100}
                                        height={100}
                                        alt="avatar"
                                        onClick={() => handleUnHideMessage(item?.userId)}
                                    />
                                    <div className="hidden absolute -top-[80%] right-0 w-max px-2 py-1 shadow-box-shadown rounded-lg bg-slate-100 z-50 group-hover:block">
                                        <span className="text-[12px]">{item?.fullName}</span>
                                    </div>
                                    <button className="hidden absolute -top-1 right-0 group-hover:block z-50" onClick={() => handleCloseMessage(item?.userId)}>
                                        <div className="p-[2px] rounded-full bg-white">
                                            <i>
                                                <X className="w-4 h-4" />
                                            </i>
                                        </div>
                                    </button>
                                </figure>
                            </div>
                        })
                        }

                    </div>
                </div>
                <div className="fixed bottom-0 right-20 z-50">
                    <div className="flex gap-x-2">
                        {messageState?.boxMessages?.filter((item: any) => item.active)?.map((item: any, index: any) => {
                            return <MessageBoxComponent key={index} index={index} userId={item?.userId} avatar={item?.avatar} fullName={item?.fullName} messages={item?.messages} />
                        })
                        }
                    </div>
                </div>
            </div>
            <main>
                {children}
            </main>
        </div>
    )
}
