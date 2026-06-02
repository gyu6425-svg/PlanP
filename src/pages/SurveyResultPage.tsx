import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { EmptyResultSection } from '../components/survey-result/EmptyResultSection';
import { FoodResultSection } from '../components/survey-result/FoodResultSection';
import { ShoppingComingSoonSection } from '../components/survey-result/ShoppingComingSoonSection';
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
import { getSurveyResult } from '../services/surveyResultsApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFavoritesThunk } from '../store/slices/favoritesSlice';

function readSurveyAnswers(expectedCity: string): SurveyAnswers | null {
    const rawAnswers = sessionStorage.getItem('planp.surveyAnswers');

    if (!rawAnswers) {
        return null;
    }

    try {
        const parsedAnswers = {
            ...fallbackSurveyAnswers,
            ...JSON.parse(rawAnswers),
        };

        return parsedAnswers.city === expectedCity ? parsedAnswers : null;
    } catch {
        return null;
    }
}

export default function SurveyResultPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { city: citySlug } = useParams();
    const [searchParams] = useSearchParams();
    const city = getCityBySlug(citySlug);
    const sectionParam = searchParams.get('section');
    const [answers, setAnswers] = useState<SurveyAnswers | null>(() =>
        readSurveyAnswers(city.slug)
    );
    const [activeNav, setActiveNav] = useState<string | null>(null);
    const [isRestoring, setIsRestoring] = useState(false);
    const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));
    const navItems = answers?.navItems.length ? answers.navItems : ['이동수단'];
    const resolvedActiveNav =
        activeNav && navItems.includes(activeNav)
            ? activeNav
            : sectionParam && navItems.includes(sectionParam)
              ? sectionParam
              : navItems[0];
    const activeTitle = sectionTitleByNav[resolvedActiveNav] ?? `${resolvedActiveNav} 추천`;

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchFavoritesThunk());
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (answers) {
            setIsRestoring(false);
            return;
        }

        if (!isAuthenticated) {
            navigate(routes.survey(city.slug), { replace: true });
            return;
        }

        let isCurrent = true;

        async function restoreSurveyAnswers() {
            setIsRestoring(true);

            try {
                const savedSurveyResult = await getSurveyResult(city.slug);

                if (!isCurrent) {
                    return;
                }

                if (savedSurveyResult) {
                    sessionStorage.setItem(
                        'planp.surveyAnswers',
                        JSON.stringify(savedSurveyResult.answers)
                    );
                    setAnswers({
                        ...fallbackSurveyAnswers,
                        ...savedSurveyResult.answers,
                    });
                    return;
                }

                navigate(routes.survey(city.slug), { replace: true });
            } catch (error) {
                console.error('Failed to restore survey result', error);

                if (isCurrent) {
                    navigate(routes.survey(city.slug), { replace: true });
                }
            } finally {
                if (isCurrent) {
                    setIsRestoring(false);
                }
            }
        }

        restoreSurveyAnswers();

        return () => {
            isCurrent = false;
        };
    }, [answers, city.slug, isAuthenticated, navigate]);

    if (citySlug && city.slug !== citySlug.toLowerCase()) {
        return <Navigate to={routes.surveyResult(city.slug)} replace />;
    }

    if (isRestoring || !answers) {
        return (
            <div className="grid min-h-svh place-items-center bg-[#f5f5f5]">
                <p className="text-[20px] font-[700] text-[#6b8a59]">
                    저장된 결과를 불러오는 중입니다.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-svh bg-[#f5f5f5]">
            <section className="mx-auto w-[min(1520px,calc(100vw-32px))] pb-[120px] pt-[202px]">
                <SurveyResultHeader
                    navItems={navItems}
                    activeNav={resolvedActiveNav}
                    onChangeNav={setActiveNav}
                    onRetry={() => navigate('/')}
                />

                <h1 className="mt-[40px] text-[48px] font-[700] leading-none text-black">
                    {activeTitle}
                </h1>

                {resolvedActiveNav === '이동수단' ? (
                    <TransportResultSection airports={answers.airports} city={city.slug} />
                ) : null}
                {resolvedActiveNav === '맛집' ? <FoodResultSection city={city.slug} /> : null}
                {resolvedActiveNav === '관광' ? <TourResultSection city={city.slug} /> : null}
                {resolvedActiveNav === '숙소' ? (
                    <StayResultSection selectedStays={answers.stays} city={city.slug} />
                ) : null}
                {resolvedActiveNav === '쇼핑' ? <ShoppingComingSoonSection /> : null}
                {resolvedActiveNav !== '이동수단' &&
                resolvedActiveNav !== '맛집' &&
                resolvedActiveNav !== '관광' &&
                resolvedActiveNav !== '숙소' &&
                resolvedActiveNav !== '쇼핑' ? (
                    <EmptyResultSection />
                ) : null}
            </section>
        </div>
    );
}
