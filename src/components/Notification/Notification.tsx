'use client'
import NotificationFriendComponent from "@/components/Notification/NotificationFriendComponent";
import { ErrorResponse, putAcceptFriendThunk, putRejectFriendThunk } from "@/stores/publicUserProfileSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Notification({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    const notificationFriendState = useAppSelector(state => state.notificationSlice.initialNotificationFriend);
    const publicProfileState = useAppSelector(state => state.publicUserProfileSlice);

    const [openNotification, setOpenNotification] = useState(false);

    const handleCloseNotification = () => {
        setOpenNotification(false);
    }

    useEffect(() => {
        if (openNotification === false && notificationFriendState?.userId && notificationFriendState?.userId !== "") {
            setOpenNotification(true);
            const timer = setTimeout(() => {
                setOpenNotification(false);
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [notificationFriendState])

    const handleAcceptFriend = async () => {
        try {
            if (notificationFriendState?.userId) {
                await dispatch(putAcceptFriendThunk({
                    userReceiveId: notificationFriendState?.userId
                })).unwrap();
                handleCloseNotification();
            }
        } catch (err) {
            handleCloseNotification();
            const errors = err as ErrorResponse[];

            if (errors && errors[0]?.errorCode === "adfr03") {
                window.location.reload()
            }
            return err;
        }
    }

    const handleRejectFriend = async () => {
        try {
            if (notificationFriendState?.userId) {
                await dispatch(putRejectFriendThunk({
                    userReceiveId: publicProfileState.data.userId
                })).unwrap();
                handleCloseNotification();
            }
        } catch (err) {
            handleCloseNotification();
            const errors = err as ErrorResponse[];
            if (errors && errors[0]?.errorCode === "adfr03") {
                window.location.reload()
            }
            return err;
        }
    }

    return (
        <div>
            <div className="fixed bottom-5 left-5 z-50">
                {openNotification === true && <NotificationFriendComponent onClose={handleCloseNotification} onAcceptFriend={handleAcceptFriend} onRejectFriend={handleRejectFriend} />}
            </div>
            <main>
                {children}
            </main>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={publicProfileState?.statusAcceptFriend === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={publicProfileState?.statusRejectFriend === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={publicProfileState?.statusDeleteFriend === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    )
}
