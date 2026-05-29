import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export type ResultImageCardData = {
    id: string;
    city?: string;
    slug?: string;
    category: string;
    area: string;
    name: string;
    price: string;
    rating: string;
    image: string;
    href?: string;
};

function StarIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path
                d="M7.5 1.2L9.36 5.05L13.6 5.63L10.52 8.58L11.28 12.8L7.5 10.78L3.72 12.8L4.48 8.58L1.4 5.63L5.64 5.05L7.5 1.2Z"
                fill="#ffffff"
            />
        </svg>
    );
}

export const ResultImageCard = memo(function ResultImageCard({
    card,
    liked = false,
    onToggleLike,
}: {
    card: ResultImageCardData;
    liked?: boolean;
    onToggleLike?: (card: ResultImageCardData) => void;
}) {
    const cardContent = (
        <article className="result-image-card relative shrink-0 overflow-hidden rounded-[50px] transition-transform duration-150 ease-out hover:scale-[1.03]">
            {card.href ? (
                <Link to={card.href} className="absolute inset-0 z-0" aria-label={`${card.name} 상세 보기`}>
                    <img src={card.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/40" />
                </Link>
            ) : (
                <>
                    <img src={card.image} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/40" />
                </>
            )}

            <p className="card-image-text-shadow pointer-events-none absolute left-[32px] top-[42px] max-w-[165px] truncate text-[28px] font-[700] leading-none text-white">
                {card.area}
            </p>
            <p className="card-image-text-shadow pointer-events-none absolute right-[32px] top-[42px] max-w-[205px] truncate text-right text-[28px] font-[700] leading-none text-white">
                {card.price}
            </p>
            <h2 className="card-image-text-shadow pointer-events-none absolute bottom-[47px] left-[38px] max-w-[330px] text-[36px] font-[700] leading-[1.1] text-white">
                {card.name}
            </h2>
            <span className="card-image-text-shadow pointer-events-none absolute bottom-[50px] right-[38px] inline-flex items-center gap-[5px] text-[18px] font-[500] text-white">
                <StarIcon />
                {card.rating}
            </span>
            {onToggleLike ? (
                <button
                    type="button"
                    aria-label="보관하기"
                    onClick={() => onToggleLike(card)}
                    className="absolute right-[24px] top-[94px] z-10 grid size-[44px] place-items-center"
                >
                    <Heart
                        size={32}
                        fill={liked ? '#6B8A59' : 'rgba(0,0,0,0.12)'}
                        stroke="#ffffff"
                        strokeWidth={2.2}
                        aria-hidden="true"
                    />
                </button>
            ) : null}
        </article>
    );

    return cardContent;
});
