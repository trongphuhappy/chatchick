/* eslint-disable @next/next/no-img-element */

interface Photo {
  url: string;
}

interface PhotoGridProps {
  photos: Photo[];
}


export default function PhotoGridStatus({ photos }: PhotoGridProps) {
  const maxDisplay = 4;
  const displayPhotos = photos.slice(0, maxDisplay);
  const remainingPhotos = photos.length - maxDisplay;

  return (
    <div className="grid grid-cols-2 gap-2">
      {displayPhotos.map((photo, index) => (
        <div key={index} className="relative">
          <img
            src={photo.url}
            alt={`photo-${index}`}
            className="object-cover w-full h-48"
          />
          {index === maxDisplay - 1 && remainingPhotos > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-2xl">
              +{remainingPhotos}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
