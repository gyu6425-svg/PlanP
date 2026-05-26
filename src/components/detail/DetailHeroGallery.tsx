import { Images } from 'lucide-react';
import { useLoadableImages } from './useLoadableImages';

export function DetailHeroGallery({
    title,
    images,
    onOpenGallery,
}: {
    title: string;
    images: string[];
    onOpenGallery: () => void;
}) {
    const loadableImages = useLoadableImages(images);
    const mainImage = loadableImages[0];
    const subImages = loadableImages.slice(1, 5);
    const hiddenImageCount = Math.max(loadableImages.length - 5, 0);

    return (
        <>
            <h1 className="text-[48px] font-[700] leading-none text-black">{title}</h1>

            <div className="mt-[42px] flex w-[1520px] gap-[8px]">
                <img
                    src={mainImage}
                    alt=""
                    className="h-[622px] w-[749px] rounded-l-[50px] object-cover"
                />

                <div className="grid grid-cols-[372px_372px] gap-[16px]">
                    {subImages.map((image, index) => {
                        const isTopRight = index === 1;
                        const isBottomRight = index === 3;
                        const isLastVisible = index === subImages.length - 1;

                        return (
                            <div
                                key={image}
                                className={[
                                    'relative h-[303px] w-[372px] overflow-hidden',
                                    isTopRight ? 'rounded-tr-[50px]' : '',
                                    isBottomRight ? 'rounded-br-[50px]' : '',
                                ].join(' ')}
                            >
                                <img src={image} alt="" className="h-full w-full object-cover" />
                                {isLastVisible && hiddenImageCount > 0 ? (
                                    <div className="absolute inset-0 bg-black/38">
                                        <span className="absolute inset-0 grid place-items-center text-[34px] font-[700] leading-none text-white">
                                            +{hiddenImageCount}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={onOpenGallery}
                                            className="absolute bottom-[24px] right-[22px] inline-flex h-[38px] items-center gap-[7px] rounded-full bg-white px-[18px] text-[14px] font-[500] text-[#555555]"
                                        >
                                            <Images size={16} aria-hidden="true" />
                                            전체 사진
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
