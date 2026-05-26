import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    cityHeroImageBySlug,
    citySurveyTitleBySlug,
    fallbackCityHeroImage,
} from '../data/cityHeroImages';
import { stayCategoryOptions, stayPlaceCardsByCategory } from '../data/stayPlaces';
import { getCityBySlug } from '../lib/city';
import { routes } from '../lib/routes';

type SurveyStep = {
    eyebrow: string;
    options: string[];
    buttonLabel: string;
};

const airportOptionsByDestination: Record<string, string[]> = {
    도쿄: ['나리타', '하네다'],
    tokyo: ['나리타', '하네다'],
    오사카: ['간사이', '이타미', '고베'],
    osaka: ['간사이', '이타미', '고베'],
    후쿠오카: ['후쿠오카', '기타큐슈'],
    fukuoka: ['후쿠오카', '기타큐슈'],
    타이베이: ['타오위안', '쑹산'],
    taipei: ['타오위안', '쑹산'],
    방콕: ['수완나품', '돈므앙'],
    bangkok: ['수완나품', '돈므앙'],
    태국: ['수완나품', '돈므앙', '푸껫', '치앙마이'],
    베트남: ['노이바이', '떤선녓', '다낭', '깜라인'],
    하노이: ['노이바이'],
    호치민: ['떤선녓'],
    다낭: ['다낭'],
    싱가포르: ['창이', '셀레타'],
    홍콩: ['홍콩'],
    마카오: ['마카오'],
    상하이: ['푸둥', '훙차오'],
    베이징: ['서우두', '다싱'],
    서울: ['인천', '김포'],
    부산: ['김해'],
    제주: ['제주'],
    뉴욕: ['JFK', '뉴어크', '라과디아'],
    'new york': ['JFK', '뉴어크', '라과디아'],
    la: ['LAX', '버뱅크', '롱비치', '온타리오'],
    'los angeles': ['LAX', '버뱅크', '롱비치', '온타리오'],
    미국: ['JFK', 'LAX', '샌프란시스코', '시애틀', '시카고 오헤어'],
};

const commonTravelTypes = ['쇼핑', '관광', '맛집'];
const commonStays = ['료칸', '호스텔', '호텔', '캡슐', '민슈쿠'];

function getStayOptions(citySlug: string) {
    const cityStayOptions = stayCategoryOptions.filter((category) =>
        (stayPlaceCardsByCategory[category] ?? []).some((card) => card.city === citySlug)
    );

    return cityStayOptions.length > 0 ? cityStayOptions : commonStays;
}

function getAirportOptions(destination: string) {
    const normalizedDestination = destination.trim().toLowerCase();
    const matchedKey = Object.keys(airportOptionsByDestination).find((key) =>
        normalizedDestination.includes(key.toLowerCase())
    );

    if (matchedKey) {
        return airportOptionsByDestination[matchedKey];
    }

    return ['인천', '김포', '나리타', '하네다', '간사이', '수완나품', '창이'];
}

export default function SurveyPage() {
    const navigate = useNavigate();
    const { city: citySlug } = useParams();
    const city = getCityBySlug(citySlug);
    const destination = city.label;
    const heroImage = cityHeroImageBySlug[city.slug] ?? fallbackCityHeroImage;
    const surveyTitle = citySurveyTitleBySlug[city.slug] ?? `여행의 도시 ${destination}`;
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string[]>>({});

    const steps = useMemo<SurveyStep[]>(
        () => [
            {
                eyebrow: '도착하는 공항을 선택하세요',
                options: getAirportOptions(destination),
                buttonLabel: '다음',
            },
            {
                eyebrow: '하고 싶은 유형을 선택하세요',
                options: commonTravelTypes,
                buttonLabel: '다음',
            },
            {
                eyebrow: '선호하는 숙소',
                options: getStayOptions(city.slug),
                buttonLabel: '검색',
            },
        ],
        [city.slug, destination]
    );

    const currentStep = steps[stepIndex];
    const selectedOptions = answers[stepIndex] ?? [];

    const handleSelect = useCallback(
        (option: string) => {
            setAnswers((current) => ({
                ...current,
                [stepIndex]: current[stepIndex]?.includes(option)
                    ? current[stepIndex].filter((item) => item !== option)
                    : [...(current[stepIndex] ?? []), option],
            }));
        },
        [stepIndex]
    );

    const handleNext = useCallback(() => {
        if (selectedOptions.length === 0) {
            return;
        }

        if (stepIndex < steps.length - 1) {
            setStepIndex((current) => current + 1);
            return;
        }

        const travelTypes = answers[1] ?? [];
        const stays = answers[2] ?? [];
        const navItems = ['이동수단', ...travelTypes, ...(stays.length > 0 ? ['숙소'] : [])];
        const surveyAnswers = {
            city: city.slug,
            destination,
            airports: answers[0] ?? [],
            travelTypes,
            stays,
            navItems,
        };

        sessionStorage.setItem('planp.surveyAnswers', JSON.stringify(surveyAnswers));
        navigate(routes.surveyResult(city.slug));
    }, [answers, city.slug, destination, navigate, selectedOptions.length, stepIndex, steps.length]);

    const handlePrevious = useCallback(() => {
        setStepIndex((current) => Math.max(current - 1, 0));
    }, []);

    return (
        <div className="min-h-svh bg-[#f5f5f5]">
            <section className="relative h-[710px] overflow-hidden rounded-b-[100px] rounded-t-none">
                <img
                    src={heroImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />

                <div className="absolute left-1/2 top-[210px] z-10 flex w-[min(720px,calc(100vw-32px))] -translate-x-1/2 flex-col items-center sm:top-[253px]">
                    <h1 className="text-center text-[clamp(40px,9vw,72px)] font-[700] leading-[1.05] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
                        {surveyTitle}
                    </h1>
                    <p className="mt-[32px] text-center text-[clamp(22px,5vw,32px)] font-[700] leading-tight text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.35)] sm:mt-[48px]">
                        {currentStep.eyebrow}
                    </p>

                    <div className="mt-[26px] flex max-w-[440px] flex-wrap justify-center gap-x-[10px] gap-y-[14px]">
                        {currentStep.options.map((option) => {
                            const isSelected = selectedOptions.includes(option);

                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={[
                                        'survey-chip',
                                        isSelected ? 'survey-chip-selected' : '',
                                    ].join(' ')}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-[32px] flex gap-[12px]">
                        {stepIndex > 0 ? (
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="survey-previous-button"
                            >
                                이전
                            </button>
                        ) : null}
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={selectedOptions.length === 0}
                            className="survey-next-button disabled:cursor-not-allowed disabled:opacity-55"
                        >
                            {currentStep.buttonLabel}
                        </button>
                    </div>
                </div>
            </section>

            <section className="-mt-[60px] min-h-[220px] bg-[#f5f5f5]" />
        </div>
    );
}
