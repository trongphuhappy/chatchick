/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from '@/stores/store'
import { Skeleton } from '@mui/material';

export default function HomeFollow() {

    const userState = useAppSelector(state => state.userSlice);

    return (
        <div className='rounded-lg bg-gray-100 p-[15px] flex flex-col gap-y-5'>
            <div className='flex gap-x-3'>
                {
                    userState?.user?.avatar && userState?.user?.avatar !== "" ?
                        <figure className="rounded-full overflow-hidden w-12 h-12"
                        >
                            <img
                                src={userState?.user?.avatar}
                                width={100}
                                height={100}
                                alt="avatar"
                            />
                        </figure>
                        : <Skeleton width={"100%"} height={"100%"} className="rounded-full" />
                }
                <span className='flex-1 font-semibold'>{userState?.user?.fullName}</span>
            </div>
            <div className='flex justify-between'>
                <div className='flex flex-col items-center'>
                    <span className='text-[18px] font-bold'>2.3K</span>
                    <span className='text-[14px] text-gray-500 font-bold'>Follower</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-[18px] font-bold'>235</span>
                    <span className='text-[14px] text-gray-500 font-bold'>Following</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-[18px] font-bold'>80</span>
                    <span className='text-[14px] text-gray-500 font-bold'>Post</span>
                </div>
            </div>
        </div>
    )
}
