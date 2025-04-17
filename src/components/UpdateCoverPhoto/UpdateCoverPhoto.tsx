/* eslint-disable @next/next/no-img-element */
'use client'
import CropImageCoverPhotoProfile from "@/components/CropImageCoverPhotoProfile/CropImageCoverPhotoProfile";
import ToastAlert from "@/components/ToastCustom/ToastAlert";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { ErrorResponse, updateCoverPhotoThunk } from "@/stores/userProfileSlice";
import { convertBase64ToFile } from "@/utils/Convert/ConvertBase64ToFile";
import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";


export default function UpdateCoverPhoto() {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.userSlice);
    const userProfileState = useAppSelector(state => state.userProfileSlice);
    const publicProfileState = useAppSelector(state => state.publicUserProfileSlice);

    const [coverPhotoSrc, setCoverPhotoSrc] = useState<any>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleUploadImage = (e: any) => {
        const newFile = e.target.files[0];
        const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

        // if (!allowedTypes.includes(newFile?.type)) {
        //   return Toast({
        //     err: 1,
        //     mess: "Please choose image have format JPG, JPEG, PNG",
        //   });
        // }

        const reader = new FileReader();
        reader.onload = () => {
            setCoverPhotoSrc(reader.result as string);
        }
        reader.readAsDataURL(newFile);
    };

    const handleCancelSaveCoverPhoto = () => {
        setCoverPhotoSrc(null);
    }

    const handleCloseUpdateCoverPhoto = () => {
        handleCancelSaveCoverPhoto();
    }

    const handleSubmit = async (base64UrlImage: any) => {
        const fullFileCoverPhoto = await convertBase64ToFile(coverPhotoSrc, `fullFile_coverphoto_${userState?.user?.id}.jpg`)

        const cropFileCoverPhoto = await convertBase64ToFile(base64UrlImage, `crop_coverphoto_${userState?.user?.id}.jpg`)

        try {
            await dispatch(updateCoverPhotoThunk({
                oldFileName: userState.user?.avatar ?? "",
                cropFileCoverPhoto: cropFileCoverPhoto,
                fullFileCoverPhoto: fullFileCoverPhoto,
            }));
            handleCloseUpdateCoverPhoto();
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            const errors = err as ErrorResponse[];
            errors.forEach(error => {
                toast.custom(
                    () => <ToastAlert type="error" title="Error" desc={error?.errorMessage} />,
                    { duration: 99999 }
                );
            });
        }
    }

    return (
        <div>
            <figure className="w-full h-[400px] overflow-hidden rounded-b-lg">
                {coverPhotoSrc === null ? <div>
                    {!publicProfileState.data.cropCoverPhoto?.includes("null") ? <img
                        src={publicProfileState.data.cropCoverPhoto || "/home.jpg"}
                        alt="Thumnail"
                        className="w-full h-[400px] object-cover"
                    /> : <div className="w-full h-[400px] bg-gray-200">
                    </div>}
                </div> :
                    <div>
                        {userProfileState.profilePrivate.statusUpdateCoverPhoto !== "loading" ? <CropImageCoverPhotoProfile image={coverPhotoSrc} onCancel={handleCancelSaveCoverPhoto} onSubmit={handleSubmit} /> :
                            <Skeleton variant="rounded" height={450} className="w-full h-[450px] object-cover" />
                        }
                    </div>}
                <div className="absolute bottom-[5%] right-[2%] z-40 hover group">
                    <input
                        className='absolute inset-0 w-full h-full opacity-0'
                        type="file"
                        ref={fileInputRef}
                        title=''
                        onChange={handleUploadImage}
                    />
                    {coverPhotoSrc === null && <button className="px-3 py-2 bg-white rounded-xl group-hover:bg-blue-500 shadow-header-shadown">
                        <div className="flex items-center gap-x-3">
                            <i>
                                <Camera className="text-black w-5 h-5 group-hover:text-gray-200" />
                            </i>
                            <span className="text-base font-medium group-hover:text-gray-200">Edit cover photo</span>
                        </div>
                    </button>}
                </div>
            </figure>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
                    open={userProfileState?.profilePrivate.statusUpdateCoverPhoto === "loading"}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        </div>
    )
}
