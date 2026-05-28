import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { EmptyResultSection } from '../components/survey-result/EmptyResultSection';
import { FoodResultSection } from '../components/survey-result/FoodResultSection';
import { StayResultSection } from '../components/survey-result/StayResultSection';
import { SurveyResultHeader } from '../components/survey-result/SurveyResultHeader';
import { TourResultSection } from '../components/survey-result/TourResultSection';
import { TransportResultSection } from '../components/survey-result/TransportResultSection';
import {
    fallbackSurveyAnswers,
    sectionTitleByNav,
    type SurveyAnswers,
} from '../data/surveyResultData';
import { getCityBySlug } from '../lib/city';
import { routes } from '../lib/routes';

function readSurveyAnswers(): SurveyAnswers {
    const rawAnswers = sessionStorage.getItem('planp.surveyAnswers');

    if (!rawAnswers) {
        return fallbackSurveyAnswers;
    }

    try {
        return {
            ...fallbackSurveyAnswers,
            ...JSON.parse(rawAnswers),
        };
    } catch {
        return fallbackSurveyAnswers;
    }
}

export default function SurveyResultPage() {
    const navigate = useNavigate();
    const { city: citySlug } = useParams();
    const [searchParams] = useSearchParams();
    const city = getCityBySlug(citySlug);
    const answers = useMemo(() => readSurveyAnswers(), []);
    const navItems = answers.navItems.length > 0 ? answers.navItems : ['이동수단'];
    const sectionParam = searchParams.get('section');
    const initialNav = sectionParam && navItems.includes(sectionParam) ? sectionParam : navItems[0];
    const [activeNav, setActiveNav] = useState(initialNav);
    const activeTitle = sectionTitleByNav[activeNav] ?? `${activeNav} 추천`;

    if (citySlug && city.slug !== citySlug.toLowerCase()) {
        return <Navigate to={routes.surveyResult(city.slug)} replace />;
    }

    return (
        <div className="min-h-svh bg-[#f5f5f5]">
            <section className="mx-auto w-[min(1520px,calc(100vw-32px))] pb-[120px] pt-[202px]">
                <SurveyResultHeader
                    navItems={navItems}
                    activeNav={activeNav}
                    onChangeNav={setActiveNav}
                    onRetry={() => navigate('/')}
                />

                <h1 className="mt-[40px] text-[48px] font-[700] leading-none text-black">
                    {activeTitle}
                </h1>

                {activeNav === '이동수단' ? (
                    <TransportResultSection airports={answers.airports} city={city.slug} />
                ) : null}
                {activeNav === '맛집' ? <FoodResultSection city={city.slug} /> : null}
                {activeNav === '관광' ? <TourResultSection city={city.slug} /> : null}
                {activeNav === '숙소' ? (
                    <StayResultSection selectedStays={answers.stays} city={city.slug} />
                ) : null}
                {activeNav !== '이동수단' &&
                activeNav !== '맛집' &&
                activeNav !== '관광' &&
                activeNav !== '숙소' ? (
                        <EmptyResultSection />
                    ) : null}
            </section>
        </div>
    );
}
