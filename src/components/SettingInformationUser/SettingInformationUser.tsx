
import UpdateBiographyPopup from "@/components/UpdateBiographyPopup/UpdateBiographyPopup";
import UpdateEmailPopup from "@/components/UpdateEmailPopup/UpdateEmailPopup";
import UpdateFullNamePopup from "@/components/UpdateFullNamePopup/UpdateFullNamePopup";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { getProfilePrivateThunk } from "@/stores/userProfileSlice";
import { Skeleton } from "@mui/material";
import { ChevronRight} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SettingInformationUser() {

    const dispatch = useAppDispatch();
    const profilePrivateState = useAppSelector(state => state.userProfileSlice.profilePrivate);

    const [emailPopup, setEmailPopup] = useState<boolean>(false);
    const [fullNamePopup, setFullNamePopup] = useState<boolean>(false);
    const [biographyPopup, setBiographyPopup] = useState<boolean>(false);


    const fetchUserData = async () => {
        await dispatch(getProfilePrivateThunk());
    }

    const handleOpenEmailPopup = () => {
        setEmailPopup(true);
    }

    const handleCloseEmailPopup = () => {
        setEmailPopup(false);
    }

    const handleOpenFullNamePopup = () => {
        setFullNamePopup(true);
    }

    const handleCloseFullNamePopup = () => {
        setFullNamePopup(false);
        fetchUserData();
    }

    const handleOpenBiographyPopup = () => {
        setBiographyPopup(true);
    }

    const handleCloseBiographyPopup = () => {
        setBiographyPopup(false);
        fetchUserData();
    }

    useEffect(() => {
        fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section>
            <header>
                <div className="mt-[56px] flex flex-col gap-y-4">
                    <h2 className="text-3xl font-bold font-sans text-[#1C2B33]">Personal information</h2>
                    <p className="text-base opacity-[0.9]">Manage your personal information.</p>
                </div>
            </header>
            <div className="mt-9 rounded-xl overflow-hidden bg-white">
                <ul>
                    <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 border-b-[1px] cursor-pointer hover:bg-zinc-100 select-none">
                        <div className="w-full flex flex-col gap-x-1" onClick={handleOpenEmailPopup}>
                            <h4 className="text-base font-semibold">Email</h4>
                            {
                                profilePrivateState?.data?.email !== "" ? <p className="text-base text-gray-600">{profilePrivateState?.data?.email}</p> : <Skeleton variant="rectangular" className="w-full text-base text-gray-600 rounded-lg" />
                            }
                        </div>
                        <div>
                            <button>
                                <i>
                                    <ChevronRight />
                                </i>
                            </button>
                        </div>
                    </li>
                    <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 border-b-[1px] cursor-pointer hover:bg-zinc-100 select-none">
                        <div className="w-full flex flex-col gap-x-1" onClick={handleOpenFullNamePopup}>
                            <h4 className="text-base font-semibold">Full Name</h4>
                            {
                                profilePrivateState?.data?.fullName !== "" ? <p className="text-base text-gray-600">{profilePrivateState?.data?.fullName}</p> : <Skeleton variant="rectangular" className="w-full text-base text-gray-600 rounded-lg" />
                            }
                        </div>
                        <div>
                            <button>
                                <i>
                                    <ChevronRight />
                                </i>
                            </button>
                        </div>
                    </li>
                    <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 border-b-[1px] cursor-pointer hover:bg-zinc-100 select-none">
                        <div className="w-full flex flex-col gap-x-1" onClick={handleOpenBiographyPopup}>
                            <h4 className="text-base font-semibold">Biography</h4>
                            {
                                profilePrivateState?.data?.biography !== null ? <p className="text-base text-gray-600">{profilePrivateState?.data?.biography}</p> : <Skeleton variant="rectangular" className="w-full text-base text-gray-600 rounded-lg" />
                            }

                        </div>
                        <div>
                            <button>
                                <i>
                                    <ChevronRight />
                                </i>
                            </button>
                        </div>
                    </li>
                    <li className="px-4 min-h-16 flex flex-row items-center justify-between border-b-slate-300 cursor-pointer hover:bg-zinc-100 select-none">
                        <div className="py-2 flex flex-col gap-y-2">
                            <h4 className="text-base font-semibold">Avatar</h4>
                            <div>
                                <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '48px', height: '48px' }}
                                >
                                    <Image
                                        src="/home.jpg"
                                        objectFit="cover"
                                        width={100}
                                        height={100}
                                        quality={100}
                                        alt="avatar"
                                    />
                                </figure>
                            </div>
                        </div>
                        <div>
                            <button>
                                <i>
                                    <ChevronRight />
                                </i>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
                {profilePrivateState.data?.email && profilePrivateState.data?.email !== "" && <UpdateEmailPopup open={emailPopup} onClose={handleCloseEmailPopup} />}

                {profilePrivateState.data?.fullName && profilePrivateState.data?.fullName !== "" && <UpdateFullNamePopup open={fullNamePopup} onClose={handleCloseFullNamePopup} />}

                {profilePrivateState.data?.fullName && profilePrivateState.data?.fullName?.length >= 0 && biographyPopup && <UpdateBiographyPopup open={biographyPopup} onClose={handleCloseBiographyPopup} />}
            </div>
        </section>
    )
}
