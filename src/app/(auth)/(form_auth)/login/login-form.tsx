'use client'
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ErrorResponse, loginUser } from "@/stores/authSlice";
import { toast } from "sonner";
import Image from "next/image";
import { Backdrop, CircularProgress } from "@mui/material";
import InputAuth from "@/components/Input/InputAuth";
import ToastAlert from "@/components/ToastCustom/ToastAlert";

export default function LoginForm() {

    const router = useRouter();

    const dispatch = useAppDispatch();
    const authState = useAppSelector(state => state.authSlice);

    const [typePassword, setTypePassword] = useState<boolean>(false);

    const { register, watch, handleSubmit, setError, formState: { errors },
        reset, } =
        useForm<LoginBodyType>({
            resolver: zodResolver(LoginBody),
            defaultValues: {
                email: "",
                password: "",
            },
        });

    const watchPassword = watch("password");

    const handleToggleTypePassword = () => {
        setTypePassword(prev => !prev);
    };

    const handleNavigateSignup = () => {
        router.push("/signup")
    }

    const onSubmit = async (data: LoginBodyType) => {
        try {
            const res = await dispatch(loginUser(data)).unwrap();
            router.push("/home");
            reset();
        } catch (err) {
            const errors = err as ErrorResponse[];

            if (errors && errors[0]?.errorCode === "lg01") {
                return toast.custom(
                    () => <ToastAlert type="error" title="Error" desc={errors[0]?.errorMessage} />,
                    { duration: 99999 }
                );
            }

            errors?.forEach(error => {
                if (error.errorCode === "us01") {
                    setError('email', { type: 'manual', message: error.errorMessage });
                }
                if (error.errorCode === "psd03") {
                    setError('password', { type: 'manual', message: error.errorMessage });
                }
            });
        }
    }

    return (
        <div>
            <div className="w-[70%] px-5 py-4 m-auto">
                <h2 className="text-[1.5rem] leading-8 font-medium">Log in</h2>
                <span className="text-gray-500 inline-block mt-2">
                    Log in to make friends, share beautiful moments and chat with people
                </span>
                <form className="pt-5 flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-y-2">
                        <InputAuth id="email" label="Email" type="text" formHook={register("email")} error={errors?.email?.message} />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <InputAuth id="password" label="Password" type={typePassword ? "text" : "password"} onChangeTypePassword={handleToggleTypePassword} formHook={register("password")} watch={watchPassword} error={errors?.password?.message} />
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <button type="submit" className="block w-[100%] rounded-3xl py-3 bg-gray-700">
                            <span className="text-slate-200">Submit</span>
                        </button>
                        <div className="flex items-center justify-between gap-3">
                            <div className="w-[50%] h-1 bg-slate-500 rounded-full"></div>
                            <span className="text-gray-400">OR</span>
                            <div className="w-[50%] h-1 bg-slate-500 rounded-full"></div>
                        </div>
                        <div className="relative w-full border-2 py-3 border-gray-300 border-solid rounded-full cursor-pointer hover:bg-slate-300 select-none">
                            <Image src="/google-icon.png" alt="Google" width={40} height={40} className="absolute top-[50%] left-[27%] -translate-y-[50%]" />
                            <h3 className="w-full text-[15px] text-center font-normal">Log in with Google</h3>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[1rem]">
                                First time using ChatChick?{" "}
                                <span className="font-bold cursor-pointer" onClick={handleNavigateSignup}>
                                    Sign up
                                </span>
                            </p>
                            <p className="text-[1rem]">
                                <span className="font-bold cursor-pointer">
                                    Forgot password?
                                </span>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                open={authState?.status === "loading"}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}