/* eslint-disable @next/next/no-img-element */
'use client'
import HeaderComponent from "@/components/Header/Header";
import { GraduationCap, Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import HomeUploadPost from "@/components/HomeUploadPost/HomeUploadPost";
import TextViewMore from "@/components/TextViewMore/TextViewMore";
import Link from "next/link";
import PostStatus from "@/components/PostStatus/PostStatus";
import AvatarProfile from "@/components/AvatarProfile/AvatarProfile";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import UpdateCoverPhoto from "@/components/UpdateCoverPhoto/UpdateCoverPhoto";
import { getNineFriendsThunk, getNineImagesThunk, getNumbersOfFriendThunk, getProfileUserThunk } from "@/stores/publicUserProfileSlice";
import { Backdrop, CircularProgress } from "@mui/material";


let longText = `.`

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function ProfileComponent() {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.userSlice);
    const publicProfileState = useAppSelector(state => state.publicUserProfileSlice);

    const [postStatus, setPostStatus] = useState(false);
    const [listImages, setListImages] = useState<any>(null);
    const [listFriends, setListFriends] = useState<any>(null);

    const handleOpenPostStatus = () => {
        setPostStatus(true);
    }

    const handleClosePostStatus = () => {
        setPostStatus(false);
    }

    const fetchUserProfile = () => {
        try {
            dispatch(getProfileUserThunk({
                userId: userState.user?.id ?? ""
            }));
        } catch (err) {
            return err;
        }
    }

    const fetchNumbersOfFriendProfile = () => {
        try {
            dispatch(getNumbersOfFriendThunk({
                userId: userState.user?.id ?? ""
            }))
        } catch (err) {
            return err;
        }
    }

    const fetchNineImagesProfile = async () => {
        try {
            const res = await dispatch(getNineImagesThunk({
                userId: userState.user?.id ?? ""
            })).unwrap();
            setListImages(res?.data);
        } catch (err) {
            return err;
        }
    }

    const fetchNineFriendsProfile = async () => {
        try {
            const res = await dispatch(getNineFriendsThunk({
                userId: userState.user?.id ?? ""
            })).unwrap();
            setListFriends(res?.data);
        } catch (err) {
            return err;
        }
    }

    useEffect(() => {
        fetchUserProfile();
        fetchNumbersOfFriendProfile();
        fetchNineImagesProfile();
        fetchNineFriendsProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const BoxImages = (data: any) => {
        return <div className="h-[128px] flex items-center justify-center border border-gray-100 shadow-lg">
            <img src={data?.data} alt="Image" className="w-full h-full object-cover" />
        </div>
    }

    const ListBoxImages = () => {
        return listImages?.map((item: any, index: number) => {
            return <BoxImages data={item} key={index} />
        })
    }

    const BoxFriends = (data: any) => {
        return <Link href={`/public-profile/${data?.data?.userId}`}> <div className="flex flex-col items-start gap-y-2 w-full">
            <div className="w-full h-[120px] flex items-center justify-center">
                <img src={data?.data?.cropAvatar} alt="Image" className="w-[123px] h-full object-cover rounded-lg" />
            </div>
            <h3 className="font-sans text-[12px] font-semibold hover:underline">{data?.data?.fullName}</h3>
        </div>
        </Link>
    }

    const ListBoxFriends = () => {
        return listFriends?.map((item: any, index: number) => {
            return <BoxFriends data={item} key={index} />
        })
    }

    return (
        <div>
            <header className={`sticky top-0 w-full z-50`}>
                <HeaderComponent />
            </header>
            {publicProfileState.status !== 'loading' && publicProfileState.data !== null && <div>
                <section className="bg-profile-hero h-[580px] shadow-profile-hero pb-5 z-10 overflow-hidden">
                    <div className="relative max-w-[1120px] h-[540px] mx-auto">
                        <figure className="absolute w-full">
                            <UpdateCoverPhoto />
                        </figure>
                        <div className="absolute bottom-[0] transform w-full pl-[4%] pr-[2%] flex justify-between items-baseline z-30">
                            <div className="flex gap-4 items-center">
                                <AvatarProfile />

                                <div className="inline-block">
                                    <h2 className="text-2xl font-semibold font-poppins">{publicProfileState.data.fullName}</h2>
                                    <p className="mt-[3px] text-base text-gray-600">{publicProfileState.data.numbersOfFriend} friends</p>
                                </div>
                            </div>
                            <div className="-translate-y-4">
                                <button className="px-3 py-2 bg-blue-500 rounded-xl hover:bg-blue-600">
                                    <div className="flex items-center gap-x-3">
                                        <i>
                                            <Pencil className="text-white w-5 h-5" />
                                        </i>
                                        <span className="text-base text-white font-medium">Edit profile</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <main className="relative pt-5 px-3">
                    <div className="max-w-[1120px] mx-auto">
                        <div className='w-full flex flex-row items-start gap-x-5'>
                            <section className="pb-3 sticky basis-1/3 top-[84px] z-20 w-[20%]">
                                <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
                                    <h3 className="text-[17px] font-semibold">Introduction</h3>
                                    <div className="py-3">
                                        <button className="text-center w-full bg-[#e4e6eb] p-2 rounded-lg hover:bg-[#d9dae0]">
                                            <span className="text-base font-semibold">Add biography</span>
                                        </button>
                                        <div className="flex flex-col gap-y-3 py-3 ">
                                            <div className="flex items-center flex-row gap-x-3">
                                                <i><GraduationCap className="w-8 h-8" /></i>
                                                <span className="text-base font-normal">Learn at Nguyen</span>
                                            </div>
                                            <div className="flex items-center flex-row gap-x-3">
                                                <i><GraduationCap className="w-8 h-8" /></i>
                                                <span className="text-base font-normal">Learn at Nguyen</span>
                                            </div>
                                        </div>
                                        <button className="text-center w-full bg-[#e4e6eb] p-2 rounded-lg hover:bg-[#d9dae0]">
                                            <span className="text-base font-semibold">Edit detail</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words mt-[30px]">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[17px] font-semibold">Images</h3>
                                        <Link href="#!">
                                            <div className="px-2 py-2 hover:bg-slate-200 rounded-lg">
                                                <span className="text-base text-[#0064d1] font-light">View more</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="py-3 grid grid-cols-3 grid-rows-3 gap-x-1 gap-y-1">
                                        {ListBoxImages()}
                                    </div>
                                </div>
                                <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words mt-[30px]">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[17px] font-semibold">Friends</h3>
                                        <Link href="#!">
                                            <div className="px-2 py-2 hover:bg-slate-200 rounded-lg">
                                                <span className="text-base text-[#0064d1] font-light">View more</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="py-3 grid grid-cols-3 grid-rows-3 gap-x-2 gap-y-3">
                                        {ListBoxFriends()}
                                    </div>
                                </div>
                            </section>
                            <section className="pb-3 flex-1 z-10 flex flex-col gap-y-8">
                                <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
                                    <HomeUploadPost onClickPopup={handleOpenPostStatus} />
                                </div>
                                <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
                                    <div className='flex flex-row items-start gap-x-3'>
                                        <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }} className='cursor-pointer'>
                                            <Image
                                                src="/home.jpg"
                                                objectFit="cover"
                                                width={100}
                                                height={100}
                                                quality={100}
                                                alt="avatar"
                                            />
                                        </figure>
                                        <span className='text-base font-semibold cursor-pointer'>Nguyen</span>
                                    </div>
                                    <div className='py-4'>
                                        <TextViewMore content={longText} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <div>
                    <PostStatus open={postStatus} onClose={handleClosePostStatus} />
                </div>
            </div>}
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={publicProfileState?.status === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    )
}
