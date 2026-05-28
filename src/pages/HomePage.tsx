import { memo, useCallback, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCityFromKeyword } from '../lib/city';
import { routes } from '../lib/routes';

const chips = ['도쿄', '타이베이', '오사카', '후쿠오카'];

const rankingDestinations = [
    {
        rank: '1',
        title: '시원한 바다와 열대과일',
        image: '/images/landing/landing_danang.png',
        alt: '다낭 여행지',
    },
    {
        rank: '2',
        title: '실내투어와 미식여행',
        image: '/images/landing/landing_taipai.png',
        alt: '타이베이 여행지',
    },
    {
        rank: '3',
        title: '가성비와 신선한 먹거리',
        image: '/images/landing/landing_kamaqura.png',
        alt: '가마쿠라 여행지',
    },
];

const SearchIcon = memo(function SearchIcon() {
    return (
        <svg
            width="41"
            height="41"
            viewBox="0 0 41 41"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="18.2"
                cy="18.2"
                r="12.6"
                stroke="#111111"
                strokeWidth="4.2"
                strokeLinecap="round"
            />
            <path d="M28 28L36 36" stroke="#111111" strokeWidth="4.2" strokeLinecap="round" />
        </svg>
    );
});

export default function HomePage() {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const startSurvey = useCallback(
        (keyword: string) => {
            const trimmedKeyword = keyword.trim();

            if (!trimmedKeyword) {
                return;
            }

            const city = getCityFromKeyword(trimmedKeyword);

            sessionStorage.setItem('planp.searchKeyword', trimmedKeyword);
            sessionStorage.setItem('planp.city', city.slug);
            navigate(routes.survey(city.slug));
        },
        [navigate]
    );

    const handleSearch = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            startSurvey(searchKeyword);
        },
        [searchKeyword, startSurvey]
    );

    return (
        <div className="min-h-svh bg-[#f5f5f5]">
            <section className="relative h-[790px] overflow-hidden rounded-b-[100px] rounded-t-none">
                <img
                    src="/images/landing/landingPage_hero.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5" />

                <div className="absolute left-1/2 top-[248px] z-10 flex -translate-x-1/2 flex-col items-center">
                    <h1 className="whitespace-nowrap text-center text-[100px] font-bold leading-none text-white">
                        여행의 모든 계획, PlanP
                    </h1>

                    <form
                        className="mt-[72px] flex h-[100px] w-[1010px] items-center gap-[22px] rounded-[24px] bg-white/72 px-[42px] backdrop-blur-s"
                        onSubmit={handleSearch}
                    >
                        <button
                            type="submit"
                            aria-label="검색"
                            className="grid size-[41px] shrink-0 place-items-center rounded-full"
                        >
                            <SearchIcon />
                        </button>
                        <input
                            type="text"
                            aria-label="여행지 검색"
                            placeholder="가고싶은 여행지를 입력하세요"
                            value={searchKeyword}
                            onChange={(event) => setSearchKeyword(event.target.value)}
                            className="landing-search-input h-[32px] flex-1 bg-transparent outline-none"
                        />
                    </form>

                    <div className="mt-[22px] grid grid-cols-4 gap-[16px]">
                        {chips.map((chip) => (
                            <button
                                key={chip}
                                type="button"
                                onClick={() => startSurvey(chip)}
                                className="landing-chip h-[64px] w-[236px] rounded-full bg-white/82 p-[10px] shadow-sm backdrop-blur-sm transition hover:bg-white"
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#f5f5f5] pb-[130px] pt-[280px]">
                <div className="mx-auto grid w-[1520px] grid-cols-3 gap-[20px]">
                    {rankingDestinations.map((destination) => (
                        <article
                            key={destination.rank}
                            className="relative h-[838px] overflow-hidden rounded-t-[50px] bg-[#f5f5f5]"
                        >
                            <div
                                className="group absolute left-0 top-0 h-[698px] w-full overflow-hidden rounded-t-[50px]"
                                style={{
                                    clipPath:
                                        'path("M 0 0 H 493 V 0 V 468 C 493 560 418 610 286 644 C 185 670 98 681 62 681 C 22 681 0 655 0 612 Z")',
                                }}
                            >
                                <img
                                    src={destination.image}
                                    alt={destination.alt}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="absolute bottom-[44px] left-0 right-0 z-10 flex flex-col items-center">
                                <p className="self-end pr-[24px] text-[140px] font-bold leading-[0.72] text-black">
                                    {destination.rank}
                                </p>
                                <p className="mt-[20px] max-w-[455px] text-center text-[40px] font-bold leading-[1.16] text-black">
                                    {destination.title}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
