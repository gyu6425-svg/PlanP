import { memo } from 'react';
import { Link } from 'react-router-dom';

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

export const ResultImageCard = memo(function ResultImageCard({ card }: { card: ResultImageCardData }) {
    const cardContent = (
        <article className="result-image-card relative shrink-0 overflow-hidden rounded-[50px] transition-transform duration-150 ease-out hover:scale-[1.03]">
            <img src={card.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/40" />

            <p className="card-image-text-shadow absolute left-[32px] top-[42px] max-w-[165px] truncate text-[28px] font-[700] leading-none text-white">
                {card.area}
            </p>
            <p className="card-image-text-shadow absolute right-[32px] top-[42px] max-w-[205px] truncate text-right text-[28px] font-[700] leading-none text-white">
                {card.price}
            </p>
            <h2 className="card-image-text-shadow absolute bottom-[47px] left-[38px] max-w-[330px] text-[36px] font-[700] leading-[1.1] text-white">
                {card.name}
            </h2>
            <span className="card-image-text-shadow absolute bottom-[50px] right-[38px] inline-flex items-center gap-[5px] text-[18px] font-[500] text-white">
                <StarIcon />
                {card.rating}
            </span>
        </article>
    );

    if (card.href) {
        return (
            <Link to={card.href} className="block shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#6B8A59] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f5f5f5]">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
});
