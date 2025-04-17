'use client'
import React from 'react'
import { activeAccount, Data, ErrorResponse } from "@/stores/activeAccountSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useEffect } from "react";
import { Backdrop, CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import ToastAlert from '@/components/ToastCustom/ToastAlert';

interface ActiveAccountProps {
    children: React.ReactNode
    activeAccountEmail?: string,
}

export default function ActiveAccountLogic({ children, activeAccountEmail }: ActiveAccountProps) {
    const dispatch = useAppDispatch();
    const activeAccountState = useAppSelector(state => state.activeAccountSlice)


    const fetchActiveAccount = async (data: Data) => {
        try {
            const res = await dispatch(activeAccount(data)).unwrap();
            return toast.custom(
                () => <ToastAlert type="success" title="Success" desc={res?.message} />,
                { duration: 99999 }
            );
        } catch (err) {
            const errors = err as ErrorResponse[];
            if (errors) {
                return toast.custom(
                    () => <ToastAlert type="error" title="Error" desc={errors[0]?.errorMessage || "Error"} />,
                    { duration: 99999 }
                );
            }
            return err;
        }
    }

    useEffect(() => {
        if (activeAccountEmail) {
            fetchActiveAccount({
                email: activeAccountEmail
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAccountEmail])
    return (
        <div>
            <main>
                {children}
            </main>
            <section>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={activeAccountState?.status === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </section>
        </div>
    )
}
