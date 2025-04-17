import { Dialog } from "@mui/material";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import styles from "@/components/PostStatus/PostStatus.module.css";

interface PostStatusProps {
    open?: boolean,
    onClose?: any | null,
}

export default function PostStatus({ open = false, onClose = null }: PostStatusProps) {

    const postStatusRef = useRef<HTMLDivElement>(null);

    const [isText, setIsText] = useState<boolean>(false);
    const [isLongText, setIsLongText] = useState<boolean>(false);

    const [openImage, setOpenImage] = useState<boolean>(false);

    const handleInput = () => {
        if (postStatusRef.current) {
            const textLength = postStatusRef.current.innerText.length;
            setIsText(textLength > 0);
            setIsLongText(textLength > 120);
        }
    };

    const handleClose = () => {
        setOpenImage(false);
        onClose();
    }

    const onFileChange = (files: any) => {
        console.log(files)
    }

    const handleOpenImage = () => {
        setOpenImage(true);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            onClose={onClose}
        >
            <div className="pb-5">
                <div className="relative py-4 border-b-2">
                    <h3 className="text-center text-xl font-semibold">Create post</h3>
                    <div className="absolute top-1/2 right-6 -translate-y-1/2 inline-block p-2 bg-slate-200 rounded-full hover:bg-slate-300 cursor-pointer group" onClick={handleClose}>
                        <X className="w-6 h-6 text-gray-500 group-hover:text-gray-700" />
                    </div>
                </div>
                <div className="pt-3">
                    <div className="flex flex-col gap-y-6">
                        <div className="px-4 flex flex-row items-start gap-x-3">
                            <figure style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}
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
                            <span className='text-base font-semibold cursor-pointer'>Nguyen</span>
                        </div>
                        <div className={`max-h-[300px] overflow-y-auto ${styles.box}`}>
                            <div
                                ref={postStatusRef}
                                contentEditable="true"
                                spellCheck="false"
                                className={`${!isText && "after:content-['What_are_you_thinking?'] after:text-gray-500"} min-h-[100px] cursor-text border-none outline-none font-normal px-4 ${isLongText ? 'text-base' : 'text-xl'}`}
                                onInput={handleInput}
                            >
                            </div>
                            {openImage && <div className="px-4">
                                <div className="mt-2 w-full py-2 px-3 border rounded-lg">
                                    <div className="w-full min-h-[300px] bg-gray-100 rounded-md">
                                        Post media
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="px-4 flex flex-col gap-y-3">
                            <div className="w-full py-2 px-5 border rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-bold">Add to your post</span>
                                    <div className={`w-[40px] h-[40px] p-1 hover:bg-[#d7d9dc] rounded-full cursor-pointer ${openImage && "bg-[#d7d9dc]"}`} onClick={handleOpenImage}>
                                        <Image src="/iconImage.png" alt="image/video" width={100} height={100} quality={100} />
                                    </div>
                                </div>
                            </div>
                            <button className="text-center w-full bg-[#e4e6eb] p-2 rounded-lg hover:bg-[#d9dae0]">
                                <span className="text-base font-semibold text-gray-400">Post</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog >
    )
}
