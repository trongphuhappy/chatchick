/* eslint-disable @next/next/no-img-element */
'use client'
import UpdateAvatarProfilePopup from "@/components/UpdateAvatarProfilePopup/UpdateAvatarProfilePopup";
import { useAppSelector } from "@/stores/store";
import { Skeleton } from "@mui/material";
import TippyHeadless from "@tippyjs/react/headless";
import { Images, SquareUser } from "lucide-react";
import { useEffect, useState } from "react";

interface AvatarProfileProps {
}

export default function AvatarProfile() {

    const userState = useAppSelector(state => state.userSlice);

    const [avatarTooltip, setAvatarToolTip] = useState<boolean>(false);
    const [updateAvatarPopup, setUpdateAvatarPopup] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>("");

    useEffect(() => {
        if (userState.user?.avatar)
            setAvatar(userState.user?.avatar);
    }, [userState])

    const handleToggleAvatarTooltip = () => {
        setAvatarToolTip(prev => !prev);
    }

    const handleCloseAvatarTooltip = () => {
        setAvatarToolTip(false);
    }

    const handleOpenAvatarPopup = () => {
        setUpdateAvatarPopup(true);
        setAvatarToolTip(false);
    }

    const handleCloseAvatarPopup = () => {
        setUpdateAvatarPopup(false);
    }

    return (
        <div>
            <TippyHeadless
                interactive
                placement="left-end"
                offset={[-10, 5]}
                visible={avatarTooltip}
                render={(attrs) => (
                    <div
                        {...attrs}
                        className="w-[350px] max-h-[calc(min((100vh-96px)-60px),734px)] min-h-[30px] py-2 rounded-md shadow-avatar-shadown bg-white z-[999999]">
                        <div className="py-1 px-2 flex flex-col gap-y-1">
                            <div className="px-2 py-1 flex items-center gap-x-2 rounded-md hover:bg-slate-200 select-none cursor-pointer">
                                <i className="">
                                    <SquareUser strokeWidth={1} className="w-7 h-7 text-gray-800  opacity-80" />
                                </i>
                                <p className="text-[15px] font-[400] text-[#1b1b1b] opacity-86">View avatar</p>
                            </div>
                            <div className="px-2 py-1 flex items-center gap-x-2 rounded-md hover:bg-slate-200 select-none cursor-pointer" onClick={handleOpenAvatarPopup}>
                                <i className="">
                                    <Images strokeWidth={1} className="w-7 h-7 text-gray-800  opacity-80" />
                                </i>
                                <p className="text-[15px] font-[400] text-[#1b1b1b] opacity-86">Update avatar</p>
                            </div>
                        </div>
                    </div>
                )}
                onClickOutside={handleCloseAvatarTooltip}
            >
                <figure className={`w-[190px] h-[190px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer ${avatar && "hover:bg-[linear-gradient(to_top,_#d16ba5,_#c777b9,_#ba83ca,_#aa8fd8,_#9a9ae1,_#8aa7ec,_#79b3f4,_#69bff8,_#52cffe,_#41dfff,_#46eefa,_#5ffbf1)]"}`} onClick={handleToggleAvatarTooltip}>
                    {userState.user?.avatar ? <div style={{ borderRadius: '50%', overflow: 'hidden', width: '170px', height: '170px' }}
                        className="flex items-center justify-between" >
                        <img
                            src={userState.user?.avatar}
                            width={170}
                            height={170}
                            alt="avatar"
                        />
                    </div> : <Skeleton variant="circular" width={170} height={170} />}
                </figure>
            </TippyHeadless>
            <div>
                <UpdateAvatarProfilePopup open={updateAvatarPopup} onClose={handleCloseAvatarPopup} />
            </div>
        </div>
    )
}
