'use client'
import { useCallback, useState } from "react";
import Cropper from 'react-easy-crop';
import styles from "@/components/CropImageAvatarProfile/CropImageAvatarProfile.module.css";
import classNames from "classnames/bind";
import { getCroppedImg } from "@/utils/CropImage/CropImage";

const cx = classNames.bind(styles);

interface CropImageAvatarProfileProps {
  image?: string | null;
  onSubmit?: (image: string) => void;
}

export default function CropImageAvatarProfile({
  image,
  onSubmit
}: CropImageAvatarProfileProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropChange = (newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleSubmit = async () => {
    if (croppedAreaPixels && image && onSubmit) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      onSubmit(croppedImage);
    }
  };

  return (
    <div>
      {image && (
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </div>
      )}

      <div className={cx("controls")}>
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => onZoomChange(parseFloat(e.target.value))}
          className={cx("zoom-range")}
        />
      </div>

      <button
        type="button"
        className={`mt-5 w-full py-3 text-white text-base font-semibold rounded-full bg-teal-500 bg-gradient-to-r from-cyan-600 to-teal-700 hover:opacity-90`}
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
}
