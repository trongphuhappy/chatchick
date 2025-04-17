import InputEditUser from '@/components/Input/InputEditUser';
import ToastAlert from '@/components/ToastCustom/ToastAlert';
import { FullNameBody, FullNameBodyType } from '@/schemaValidations/edit-user.schema';
import { useAppDispatch, useAppSelector } from '@/stores/store';
import { UpdateFullNameThunk } from '@/stores/userProfileSlice';
import { ErrorResponse, resetUserState } from '@/stores/userSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, CircularProgress, Dialog } from '@mui/material'
import { X } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UpdateFullNamePopupProps {
    open: boolean,
    onClose: any,
}

export default function UpdateFullNamePopup({ open, onClose }: UpdateFullNamePopupProps) {
    const dispatch = useAppDispatch();
    const profilePrivateState = useAppSelector(state => state.userProfileSlice.profilePrivate);

    const { register, watch, handleSubmit, setError, formState: { errors },
        reset, } =
        useForm<FullNameBodyType>({
            resolver: zodResolver(FullNameBody),
            defaultValues: {
                fullName: profilePrivateState.data?.fullName,
            }
        });

    const watchFullName = watch("fullName");

    const handleSubmitForm = async (data: FullNameBodyType) => {
        try {
            const res = await dispatch(UpdateFullNameThunk(data)).unwrap();
            onClose();
            toast.custom(
                () => <ToastAlert type="success" title="Success" desc={res?.message} />,
                { duration: 3000 }
            );

        } catch (err) {
            const errors = err as ErrorResponse[];
            if (errors[0]?.errorCode === "ufn02") {
                setError('fullName', { type: 'manual', message: errors[0]?.errorMessage });
            }
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className="p-5 font-sans">
                <div className="flex justify-end">
                    <button
                        className="w-10 h-10 rounded-full text-2xl opacity-70 hover:bg-black/10 flex justify-center items-center"
                        onClick={onClose}
                    >
                        <i>
                            <X />
                        </i>
                    </button>
                </div>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <div>
                        <h2 className="text-2xl font-bold">Update full name</h2>
                        <p className="mt-2 text-base opacity-90">
                            Your name will be displayed on your profile, in comments and
                            posts.
                        </p>
                    </div>
                    <div className="pt-2">
                        <InputEditUser id="fullname" label="Full name" type="text" formHook={register("fullName")} error={errors?.fullName?.message} />
                    </div>
                    <button
                        type={watchFullName === profilePrivateState?.data?.fullName ? "button" : "submit"}
                        className={`mt-5 w-full py-3 text-white text-base font-semibold rounded-full ${watchFullName === profilePrivateState?.data?.fullName ? 'opacity-80 cursor-not-allowed bg-teal-300 bg-gradient-to-r from-cyan-400 to-teal-500' : 'bg-teal-500 bg-gradient-to-r from-cyan-600 to-teal-700'} ${watchFullName !== "" && "hover:opacity-90"}`}
                    >
                        Save
                    </button>
                </form>
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                    open={profilePrivateState?.statusUpdateFullName === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </Dialog>
    )
}
