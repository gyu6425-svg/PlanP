export type FoodPlaceCardData = {
    id: string;
    category: string;
    area: string;
    name: string;
    price: string;
    rating: string;
    image: string;
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

export function FoodPlaceCard({ card }: { card: FoodPlaceCardData }) {
    return (
        <article className="food-place-card relative shrink-0 overflow-hidden rounded-[50px]">
            <img src={card.image} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/40" />

            <p className="card-image-text-shadow absolute left-[38px] top-[47px] text-[36px] font-[700] leading-none text-white">
                {card.area}
            </p>
            <p className="card-image-text-shadow absolute right-[38px] top-[47px] text-[36px] font-[700] leading-none text-white">
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
}
