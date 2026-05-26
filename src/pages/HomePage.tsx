import { memo, useCallback, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCityFromKeyword } from '../lib/city';
import { routes } from '../lib/routes';

const chips = ['도쿄', '타이베이', '오사카', '후쿠오카'];

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

            <section className="-mt-[82px] min-h-[680px] bg-[#f5f5f5] pb-[96px] pt-[164px]">
                <div className="mx-auto grid w-[1520px] grid-cols-3 gap-[24px] px-[64px]">
                    {[
                        [
                            '즉흥 여행 탐색',
                            '정해진 일정 없이도 바로 고를 수 있는 여행지를 보여줍니다.',
                        ],
                        ['느슨한 계획 생성', '꼭 필요한 이동과 예약만 먼저 정리합니다.'],
                        ['대용량 추천 리스트', '많은 후보를 빠르게 스크롤하며 비교합니다.'],
                    ].map(([title, description]) => (
                        <article key={title} className="rounded-[24px] bg-white p-[32px]">
                            <h2 className="text-[28px] font-bold text-[#222222]">{title}</h2>
                            <p className="mt-[14px] text-[18px] font-medium leading-[1.6] text-[#555555]">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}
