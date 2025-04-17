/* eslint-disable @next/next/no-img-element */
import { logoutUser } from "@/stores/authSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import {  Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import MenuAvatarHeader from "@/components/MenuAvatar/MenuAvatarHeader";
import SearchComponent from "@/components/Search/SearchComponent";
import NotificationComponent from "@/components/Notification/NotificationComponent";
import MessageComponent from "@/components/Message/MessageComponent";

export default function HeaderComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const authState = useAppSelector(state => state.authSlice);
    const userState = useAppSelector(state => state.userSlice);

    const [visibleAvatarTooltip, setVisibleAvatarTooltip] = useState<boolean>(false);

    const handleToggleVisibleAvatarTooltip = () => {
        setVisibleAvatarTooltip(prev => !prev)
    }

    const handleCloseVisibleAvatarTooltip = () => {
        setVisibleAvatarTooltip(false)
    }

    const navigateHome = () => {
        router.push("/home");
    }

    const handleLogout = async () => {
        await dispatch(logoutUser());
        location.href = "/";
    }

    return (
        <header className="px-3 flex flex-row items-center gap-x-5 justify-between shadow-header-shadown bg-white">
            <div className="flex items-center gap-x-2 cursor-pointer" onClick={navigateHome}>
                <img src="chatchick.png" alt="logo" className="w-10 h-10 object-contain" />
                <h1 className="text-4xl font-matemasie font-normal">
                    <span className="text-blue-500">Chat</span>
                    <span className="text-yellow-400">Chick</span>
                </h1>
            </div>

            <section className="basis-2/4">
                <SearchComponent />
            </section>
            <section className="basis-1/4 flex items-center justify-end gap-x-5">
                <div className="group h-max inline-flex items-center py-2 px-3 bg-blue-100 rounded-lg select-none cursor-pointer hover:bg-blue-300">
                    <Bookmark className="text-gray-500 group-hover:text-gray-800" />
                </div>
                <div> <MessageComponent /></div>
                <div>
                    <NotificationComponent />
                </div>
                <div className="inline-flex items-center gap-x-3 p-2 cursor-pointer rounded-lg">
                    {userState?.user?.avatar && userState?.user?.avatar !== "" ? <TippyHeadless
                        interactive
                        placement="bottom-start"
                        offset={[-10, 5]}
                        visible={visibleAvatarTooltip}
                        render={(attrs) => (
                            <div {...attrs}>
                                <div className="w-[320px] max-h-[calc(min((100vh-96px)-60px),734px)] min-h-[30px] py-2 rounded-md shadow-avatar-shadown bg-white">
                                    <MenuAvatarHeader hideMenuAvatar={handleCloseVisibleAvatarTooltip} onLogout={handleLogout} />
                                </div>
                            </div>
                        )}
                        onClickOutside={handleCloseVisibleAvatarTooltip}
                    >
                        <figure className="rounded-full overflow-hidden w-12 h-12"
                            onClick={handleToggleVisibleAvatarTooltip}
                        >
                            <img
                                src={userState?.user?.avatar}
                                width={100}
                                height={100}
                                alt="avatar"
                            /> : <Skeleton width={"100%"} height={"100%"} className="rounded-full" />
                        </figure>
                    </TippyHeadless> : <Skeleton variant="circular" width={48} height={48} />
                    }
                </div>
            </section>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={authState?.statusLogout === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </header>
    )
}
