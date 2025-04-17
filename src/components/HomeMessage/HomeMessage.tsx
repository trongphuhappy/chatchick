import { Search, SquarePen } from "lucide-react";
import Image from "next/image";

export default function HomeMessage() {
    return (
        <div>
            <header className='flex items-center justify-between px-[15px]'><span className='text-base font-semibold'> Messenger</span>
                <span className='p-1 rounded-full hover:bg-slate-200 cursor-pointer'> <i className='text-gray-400'><SquarePen /></i></span>
            </header>
            <div className='mt-3 border-t-2 border-gray-400 py-3'>
                <div className='flex items-center justify-between px-[15px]'>
                    <span className='text-base text-gray-600'>Contact</span>
                    <span className='cursor-pointer p-1 rounded-full hover:bg-slate-200'>
                        <i className='text-gray-500'>
                            <Search className='w-[19px] h-[19px]' />
                        </i>
                    </span>
                </div>
                <div className='mt-3'>
                    <div className="px-[15px] py-[10px] flex items-center gap-x-3 hover:bg-blue-100 cursor-pointer">
                        <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '36px', height: '36px' }} className='cursor-pointer'>
                            <Image
                                src="/home.jpg"
                                objectFit="cover"
                                width={100}
                                height={100}
                                quality={100}
                                alt="avatar"
                            />
                        </figure>
                        <span className="text-[15px] font-semibold">Nguyen</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
