import { X } from 'lucide-react';
import { useLoadableImages } from './useLoadableImages';

export function DetailGalleryModal({
    images,
    onClose,
}: {
    images: string[];
    onClose: () => void;
}) {
    const loadableImages = useLoadableImages(images);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-[40px] py-[40px]">
            <div className="max-h-full w-[1180px] overflow-y-auto rounded-[32px] bg-white p-[32px]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[28px] font-[700] leading-none text-black">전체 사진</h2>
                    <button
                        type="button"
                        aria-label="전체 사진 닫기"
                        onClick={onClose}
                        className="grid size-[44px] place-items-center rounded-full bg-[#f2f2f2] text-black"
                    >
                        <X size={24} aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-[28px] grid grid-cols-3 gap-[14px]">
                    {loadableImages.map((image, index) => (
                        <img
                            key={`${image}-${index}`}
                            src={image}
                            alt=""
                            className="h-[250px] w-full rounded-[18px] object-cover"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
