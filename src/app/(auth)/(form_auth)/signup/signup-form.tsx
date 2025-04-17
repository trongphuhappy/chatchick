'use client'
import InputAuth from "@/components/Input/InputAuth";
import ToastAlert from "@/components/ToastCustom/ToastAlert";
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
import { ErrorResponse } from "@/stores/registerSlice";
import { registerUser } from "@/stores/registerSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Backdrop, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUpForm() {

    const dispatch = useAppDispatch();
    const registerState = useAppSelector(state => state.registerSlice);

    const [typePassword, setTypePassword] = useState<boolean>(false);
    const [typeConfirmPassword, setTypeConfirmPassword] = useState<boolean>(false);

    const { register, watch, handleSubmit, setError, formState: { errors },
        reset, } =
        useForm<RegisterBodyType>({
            resolver: zodResolver(RegisterBody),
            defaultValues: {
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
        });

    const watchPassword = watch("password");
    const watchConfirmPassword = watch("confirmPassword");

    const handleToggleTypePassword = () => {
        setTypePassword(prev => !prev);
    }

    const handleToggleTypeConfirmPassword = () => {
        setTypeConfirmPassword(prev => !prev);
    }

    const onSubmit = async (data: RegisterBodyType) => {
        try {
            const res = await dispatch(registerUser(data)).unwrap();
            reset();
            return toast.custom(
                () => <ToastAlert type="success" title="Success" desc={res?.message} />,
                { duration: 99999 }
            );
        } catch (err) {
            const errors = err as ErrorResponse[];
            errors.forEach(error => {
                if (error.errorCode === "em03") {
                    setError('email', { type: 'manual', message: error.errorMessage });
                }
                if (error.errorCode === "fn02") {
                    setError('fullName', { type: 'manual', message: error.errorMessage });
                }
            });
        }
    }

    return (
        <div>
            <div className="w-[70%] px-5 py-4 m-auto">
                <h2 className="text-[1.5rem] leading-8 font-medium">Sign up</h2>
                <span className="text-gray-500 inline-block mt-2">
                    Sign up to make friends, share beautiful moments and chat with people
                </span>
                <form className="pt-5 flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-y-2">
                        <InputAuth id="fullname" label="Full name" type="text"
                            formHook={register("fullName")} error={errors?.fullName?.message} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <InputAuth id="email" label="Email" type="text" formHook={register("email")} error={errors?.email?.message} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <InputAuth id="password" label="Password" type={typePassword ? "text" : "password"} onChangeTypePassword={handleToggleTypePassword} formHook={register("password")} watch={watchPassword} error={errors?.password?.message} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <InputAuth id="confirmpassword" label="Confirm password" type={typeConfirmPassword ? "text" : "password"} onChangeTypePassword={handleToggleTypeConfirmPassword} formHook={register("confirmPassword")} watch={watchConfirmPassword} error={errors?.confirmPassword?.message} />
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <button type="submit" className="block w-[100%] rounded-3xl py-3 bg-gray-700">
                            <span className="text-slate-200">Submit</span>
                        </button>
                        <p className="text-[1rem]">
                            Already have an account?{" "}
                            <Link href="/login">
                                <span className="font-bold cursor-pointer">
                                    Log in
                                </span>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                open={registerState?.status === "loading"}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}
