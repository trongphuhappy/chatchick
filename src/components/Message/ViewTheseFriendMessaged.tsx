/* eslint-disable @next/next/no-img-element */
import { getTheseFriendsMessagedThunk, OpenMessage } from "@/stores/messageSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store"
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react"

interface Props {
    onClose: any
}

export default function ViewTheseFriendMessaged({ onClose }: Props) {

    const messageState = useAppSelector(state => state.messageSlice);
    const dispatch = useAppDispatch();
    const [data, setData] = useState<any>(null);

    const fetchTheseFriendsMessaged = async () => {
        const res = await dispatch(getTheseFriendsMessagedThunk()).unwrap();
        setData(res?.data);
    }

    useEffect(() => {
        fetchTheseFriendsMessaged();
    }, [])

    const handleClickOpenMessage = (item: any) => {
        dispatch(OpenMessage({
            userId: item?.partnerId,
            avatar: item?.cropAvatar,
            fullName: item?.fullName,
        }));
        return onClose();
    }

    const boxUserMessage = (index: number, item: any) => {
        return <div key={index} className="flex gap-x-3 items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer" onClick={() => handleClickOpenMessage(item)}>
            <figure className="rounded-full overflow-hidden w-14 h-14"
            >
                <img
                    src={item?.cropAvatar}
                    width={100}
                    height={100}
                    alt="avatar"
                />
            </figure>
            <div className="flex flex-col">
                <h4 className="text-base font-sans font-semibold">{item?.fullName}</h4>
                <span className="text-[14px] font-sans font-normal text-zinc-600">{item?.content}</span>
            </div>
        </div>
    }

    const listUserMessages = () => {
        return data?.map((item: any, index: number) => {
            return boxUserMessage(index, item);
        })
    }

    return (
        <div>
            {messageState?.statusGetTheseFriend === "loading" ?
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CircularProgress color="inherit" style={{ color: "#3b82f6" }} />
                </div>
                :
                <div className="py-3 px-1">
                    <div className="flex flex-col gap-y-2">
                        {listUserMessages()}
                    </div>
                </div>
            }

        </div>
    )
}
