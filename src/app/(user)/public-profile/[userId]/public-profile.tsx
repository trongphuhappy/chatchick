/* eslint-disable @next/next/no-img-element */
'use client'
import HeaderComponent from '@/components/Header/Header'
import TextViewMore from '@/components/TextViewMore/TextViewMore'
import { ErrorResponse, getProfileUserThunk, getStatusFriendThunk, putAcceptFriendThunk, postAddFriendThunk, putRejectFriendThunk, deleteUnfriendThunk, getNumbersOfFriendThunk, getNineImagesThunk, getNineFriendsThunk } from '@/stores/publicUserProfileSlice'
import { useAppDispatch, useAppSelector } from '@/stores/store'
import { Backdrop, CircularProgress } from '@mui/material'
import { GraduationCap, MessageCircleMore, UserCheck, UserPlus, UserX } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import TippyHeadless from "@tippyjs/react/headless";
import { useRouter } from 'next/navigation'
import { OpenMessage } from '@/stores/messageSlice'

interface PublicProfileComponentProps {
    userId: string
}

interface StatusFriendProps {
    id: string,
    userInitId: string,
    userReceiveId: string,
    isUserInit: boolean,
    status: number;
}

export default function PublicProfileComponent({ userId }: PublicProfileComponentProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const userState = useAppSelector(state => state.userSlice);
    const publicProfileState = useAppSelector(state => state.publicUserProfileSlice);

    const [statusFriend, setStatusFriend] = useState<StatusFriendProps | null>(null);

    const [openOptionFriended, setOpenFriended] = useState(false);
    const [listImages, setListImages] = useState<any>(null);
    const [listFriends, setListFriends] = useState<any>(null);

    const handleToggleOpenFriended = () => setOpenFriended(prev => !prev);

    const handleCloseFriended = () => setOpenFriended(false);

    const fetchUserProfile = async () => {
        try {
            await dispatch(getProfileUserThunk({
                userId: userId
            }));
        } catch (err) {
            return err;
        }
    }

    const fetchStatusFriendUserProfile = async () => {
        try {
            const res = await dispatch(getStatusFriendThunk({
                userId: userId
            })).unwrap();
            setStatusFriend(res?.data);
        } catch (err) {
            setStatusFriend(null);
            return err;
        }
    }

    const fetchNumbersOfFriendProfile = async () => {
        try {
            await dispatch(getNumbersOfFriendThunk({
                userId: userId
            }))
        } catch (err) {
            return err;
        }
    }

    const fetchNineImagesProfile = async () => {
        try {
            const res = await dispatch(getNineImagesThunk({
                userId: userId
            })).unwrap();
            setListImages(res?.data);
        } catch (err) {
            return err;
        }
    }

    const fetchNineFriendsProfile = async () => {
        try {
            const res = await dispatch(getNineFriendsThunk({
                userId: userId
            })).unwrap();
            setListFriends(res?.data);
        } catch (err) {
            return err;
        }
    }

    useEffect(() => {
        if (userState?.user?.id === userId) {
            return router.push("/profile");
        }

        fetchUserProfile();
        fetchNumbersOfFriendProfile();
        fetchStatusFriendUserProfile();
        fetchNineImagesProfile();
        fetchNineFriendsProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddFriend = async () => {
        try {
            await dispatch(postAddFriendThunk({
                userId: userId
            })).unwrap();
            fetchStatusFriendUserProfile();
        } catch (err) {
            const errors = err as ErrorResponse[];

            if (errors && errors[0]?.errorCode === "adfr03") {
                window.location.reload()
            }
            return err;
        }
    }

    useEffect(() => {
        if (publicProfileState.statusAcceptFriend !== "idle" && publicProfileState.statusAcceptFriend !== "loading") {
            fetchStatusFriendUserProfile();
            fetchNumbersOfFriendProfile();
        }
    }, [publicProfileState.statusAcceptFriend])

    useEffect(() => {
        if (publicProfileState.statusRejectFriend !== "idle" && publicProfileState.statusRejectFriend !== "loading") {
            fetchStatusFriendUserProfile();
            fetchNumbersOfFriendProfile();
        }
    }, [publicProfileState.statusRejectFriend])

    useEffect(() => {
        if (publicProfileState.statusDeleteFriend !== "idle" && publicProfileState.statusDeleteFriend !== "loading") {
            fetchStatusFriendUserProfile();
            fetchNumbersOfFriendProfile();
        }
    }, [publicProfileState.statusDeleteFriend])

    const handleAcceptFriend = async () => {
        try {
            await dispatch(putAcceptFriendThunk({
                userReceiveId: publicProfileState.data.userId
            })).unwrap();
        } catch (err) {
            const errors = err as ErrorResponse[];

            if (errors && errors[0]?.errorCode === "adfr03") {
                window.location.reload()
            }
            return err;
        }
    }

    const handleRejectFriend = async () => {
        try {
            await dispatch(putRejectFriendThunk({
                userReceiveId: publicProfileState.data.userId
            }));
        } catch (err) {
            const errors = err as ErrorResponse[];
            if (errors && errors[0]?.errorCode === "adfr04") {
            }
            return err;
        }
    }

    const handleUnfriend = async () => {
        handleCloseFriended();
        try {
            await dispatch(deleteUnfriendThunk({
                userReceiveId: publicProfileState.data.userId
            })).unwrap();
        } catch (err) {
            const errors = err as ErrorResponse[];
            if (errors && errors[0]?.errorCode === "adfr03") {
                window.location.reload()
            }
            return err;
        }
    }

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
            <h3 className="font-sans text-[12px] font-semibold">{data?.data?.fullName}</h3>
        </div>
        </Link>
    }
    const ListBoxFriends = () => {
        return listFriends?.map((item: any, index: number) => {
            return <BoxFriends data={item} key={index} />
        })
    }

    const handleOpenMessage = () => {
        return dispatch(OpenMessage({
            userId: publicProfileState?.data?.userId,
            avatar: publicProfileState?.data?.cropAvatar,
            fullName: publicProfileState?.data?.fullName,
        }));
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
                            <figure className="w-full h-[400px] overflow-hidden rounded-b-lg">
                                {!publicProfileState.data.cropCoverPhoto?.includes("null")
                                    ?
                                    <img
                                        src={publicProfileState.data.cropCoverPhoto}
                                        alt="Thumnail"
                                        className="w-full h-[400px] object-cover"
                                    />
                                    : <div className="w-full h-[400px] bg-gray-200">
                                    </div>
                                }
                            </figure>
                        </figure>
                        <div className="absolute bottom-[0px] transform w-full pl-[4%] pr-[2%] flex justify-between items-baseline z-30">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <figure className={`w-[190px] h-[190px] bg-white rounded-full flex items-center justify-center p-2 cursor-pointer hover:bg-[linear-gradient(to_top,_#d16ba5,_#c777b9,_#ba83ca,_#aa8fd8,_#9a9ae1,_#8aa7ec,_#79b3f4,_#69bff8,_#52cffe,_#41dfff,_#46eefa,_#5ffbf1)]`}>
                                        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '170px', height: '170px' }}
                                            className="flex items-center justify-between" >
                                            <img
                                                src={publicProfileState.data.cropAvatar}
                                                width={170}
                                                height={170}
                                                alt="avatar"
                                            />
                                        </div>
                                    </figure>
                                </div>

                                <div className="inline-block">
                                    <h2 className="text-2xl font-semibold font-poppins">{publicProfileState.data.fullName}</h2>
                                    <p className="mt-[3px] text-base text-gray-600">{publicProfileState.data.numbersOfFriend} friends</p>
                                </div>
                            </div>
                            <div className="-translate-y-4">
                                {statusFriend === null ? <button className="px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#d4d7da]" onClick={handleAddFriend}>
                                    <div className="flex items-center gap-x-3">
                                        {publicProfileState?.statusAddFriendStatus !== "idle" && publicProfileState?.statusAddFriendStatus === "loading" ?
                                            <CircularProgress
                                                size={24}
                                                sx={{ color: '#000' }} /> :
                                            <i>
                                                <UserPlus className="text-black w-6 h-6" />
                                            </i>}
                                        <span className="text-base font-medium">Add friend</span>
                                    </div>
                                </button> :
                                    <div>
                                        {statusFriend?.status === 0 &&
                                            <>
                                                {statusFriend?.isUserInit ? <button type="button" className="px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#d4d7da]" onClick={handleRejectFriend}>
                                                    <div className="flex items-center gap-x-3">
                                                        {
                                                            (publicProfileState.statusRejectFriend !== "idle" &&
                                                                publicProfileState.statusRejectFriend === "loading") ?
                                                                <CircularProgress
                                                                    size={24}
                                                                    sx={{ color: '#000' }} /> :
                                                                <i>
                                                                    <UserX className="text-black w-6 h-6" />
                                                                </i>
                                                        }
                                                        <span className="text-base font-medium">Cancel invitation</span>
                                                    </div>
                                                </button> :
                                                    <div className='flex items-center gap-x-3'>
                                                        <button className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700"
                                                            onClick={handleAcceptFriend}
                                                        >
                                                            <div className="flex items-center gap-x-3">
                                                                {
                                                                    (publicProfileState.statusAcceptFriend !== "idle" &&
                                                                        publicProfileState.statusAcceptFriend === "loading") ?
                                                                        <CircularProgress
                                                                            size={24}
                                                                            sx={{ color: '#fff' }} /> : <i>
                                                                            <UserPlus className="text-gray-200 w-6 h-6" />
                                                                        </i>
                                                                }

                                                                <span className="text-base text-gray-200 font-medium">Accept friend</span>
                                                            </div>
                                                        </button>
                                                        <button type='button' className="px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#d4d7da]" onClick={handleRejectFriend}>
                                                            <div className="flex items-center gap-x-3">
                                                                {
                                                                    (publicProfileState.statusAcceptFriend !== "idle" &&
                                                                        publicProfileState.statusRejectFriend === "loading") ?
                                                                        <CircularProgress
                                                                            size={24}
                                                                            sx={{ color: '#fff' }} /> : <i>
                                                                            <UserPlus className="text-gray-800 w-6 h-6" />
                                                                        </i>
                                                                }
                                                                <span className="text-base font-medium">Reject friend</span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                }
                                            </>
                                        }
                                        {statusFriend?.status === 1 &&
                                            <div className='flex items-center gap-x-3'>
                                                <TippyHeadless
                                                    interactive
                                                    placement="top-start"
                                                    offset={[-10, 5]}
                                                    visible={openOptionFriended}
                                                    render={(attrs) => (
                                                        <div {...attrs}>
                                                            <div className="w-[200px] max-h-[calc(min((100vh-96px)-60px),734px)] min-h-[30px] py-2 rounded-md shadow-md bg-white">
                                                                <div className='px-2 py-1'>
                                                                    <div className='px-2 py-2 rounded-md  cursor-pointer hover:bg-gray-200' onClick={handleUnfriend}>
                                                                        <div className='flex gap-x-2 '>
                                                                            <i>
                                                                                <UserX className="text-gray-800 w-6 h-6" />
                                                                            </i>
                                                                            <span className="text-base font-medium">Unfriend</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    onClickOutside={handleCloseFriended}
                                                >
                                                    <button type='button' className="px-3 py-2 bg-[#e2e5e9] rounded-xl hover:bg-[#d4d7da]"><div className="flex items-center gap-x-3" onClick={handleToggleOpenFriended}>
                                                        <i>
                                                            <UserCheck className="text-black w-6 h-6" />
                                                        </i>
                                                        <span className="text-base font-medium">Friend</span>
                                                    </div>
                                                    </button>
                                                </TippyHeadless>
                                                <button type="button" className="px-3 py-2 bg-blue-500 rounded-xl hover:bg-blue-600" onClick={handleOpenMessage}>
                                                    <div className="flex items-center gap-x-3">
                                                        <i>
                                                            <MessageCircleMore className="text-white w-5 h-5" />
                                                        </i>
                                                        <span className="text-base text-white font-medium">Message</span>
                                                    </div>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <main className="relative pt-5 px-3">
                    <div className="max-w-[1120px] mx-auto">
                        <div className='w-full flex flex-row items-start gap-x-5'>
                            <section className="sticky basis-1/3 top-[84px] z-20 w-[20%]">
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
                            <section className="flex-1 z-10 flex flex-col gap-y-8">
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
                                        <TextViewMore content={"What is this"} />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>}
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={publicProfileState?.status === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div >
    )
}
