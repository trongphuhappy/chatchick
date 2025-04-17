import Image from 'next/image'
import React from 'react'

interface HomeUploadPostProps {
    onClickPopup?: any | null;
}

export default function HomeUploadPost({ onClickPopup = null }: HomeUploadPostProps) {

    const handleClickPopup = () => {
        onClickPopup();
    }

    return (
        <div>
            <div className='flex flex-row gap-x-2'>
                <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}>
                    <Image
                        src="/home.jpg"
                        objectFit="cover"
                        width={100}
                        height={100}
                        quality={100}
                        alt="avatar"
                    />
                </figure>
                <div className='w-full h-[40px] bg-[#f0f2f5] flex-1 rounded-2xl inline-flex items-center px-[15px] select-none cursor-pointer group hover:bg-[#d7d9dc]' onClick={handleClickPopup}>
                    <span className='text-base text-gray-500 group-hover:text-gray-800'> What are you thinking?</span>
                </div>
            </div>
            <div className='mt-4 py-2 border-t-2 border-t-gray-300'>
                <div className='inline-flex items-center gap-x-2 select-none cursor-pointer p-1 rounded-lg hover:bg-[#d7d9dc] group'>
                    <Image src="/iconImage.png" alt="image/video" width={50} height={50} quality={100} />
                    <span className='text-base text-gray-500 group-hover:text-gray-700'>Image/Video</span>
                </div>
            </div>
        </div>
    )
}
