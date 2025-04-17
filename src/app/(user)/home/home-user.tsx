'use client'
import HeaderComponent from "@/components/Header/Header";
import styles from "@/app/(user)/home/home.module.css";
import Image from "next/image";
import TextViewMore from "@/components/TextViewMore/TextViewMore";
import HomeMessage from "@/components/HomeMessage/HomeMessage";
import HomeFollow from "@/components/HomeFollow/HomeFollow";
import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
import HomeUploadPost from "@/components/HomeUploadPost/HomeUploadPost";

let longText = `.`

export default function HomeUser() {
    return (
        <div>
            <header className='sticky top-0 w-full z-30'>
                <HeaderComponent />
            </header>
            <main className="relative pt-5 px-3 z-20">
                <div>
                    <div className='w-full flex flex-row items-start gap-x-5 justify-between'>
                        <section className="sticky basis-1/5 top-[84px] z-10 w-[20%]">
                            <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
                                <HomeFollow />
                            </div>
                            <div className="mt-[30px] w-full p-[15px] rounded-lg shadow-box-shadown break-words">
                                <HomeSidebar />
                            </div>
                        </section>
                        <section className="basis-2/4 z-10 flex flex-col gap-y-8">
                            <div className="w-full p-[15px] rounded-lg shadow-box-shadown break-words">
                                <HomeUploadPost />
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
                        <section className="basis-1/4 sticky top-[84px] z-10 right-0 pr-3">
                            <div className={`w-full p-[15px] rounded-lg shadow-box-shadown break-words !px-0 h-[calc(100vh-91px)] overflow-y-auto ${styles.message}`}>
                                <HomeMessage />
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
