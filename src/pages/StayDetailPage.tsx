import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RouteFallback } from '../components/layout/RouteFallback';
import { StayDetailTemplate } from '../components/stay-detail/StayDetailTemplate';
import { getStayPlaceDetailById } from '../data/stayPlaceDetails';
import type { StayPlaceDetail } from '../data/stayPlaceDetails';
import { getCityBySlug } from '../lib/city';
import { toDetailFavorite } from '../lib/favoritePolicy';
import { routes } from '../lib/routes';
import { saveRecentView } from '../services/recentViewsApi';
import { useAppSelector } from '../store/hooks';

export default function StayDetailPage() {
    const { city: citySlug, category, placeSlug } = useParams();
    const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));
    const city = getCityBySlug(citySlug);
    const [detail, setDetail] = useState<StayPlaceDetail | null>();

    useEffect(() => {
        let isActive = true;

        if (!citySlug || !category || !placeSlug) {
            setDetail(null);
            return;
        }

        setDetail(undefined);
        getStayPlaceDetailById(`${city.slug}/${category}/${placeSlug}`)
            .then((nextDetail) => {
                if (isActive) {
                    setDetail(nextDetail ?? null);
                }
            })
            .catch(() => {
                if (isActive) {
                    setDetail(null);
                }
            });

        return () => {
            isActive = false;
        };
    }, [category, city.slug, citySlug, placeSlug]);

    useEffect(() => {
        if (isAuthenticated && detail) {
            saveRecentView(toDetailFavorite('stay', detail)).catch((error) => {
                console.error('Failed to save recent view', error);
            });
        }
    }, [detail, isAuthenticated]);

    if (detail === undefined) {
        return <RouteFallback />;
    }

    if (detail === null) {
        return <Navigate to={routes.surveyResult(city.slug)} replace />;
    }

    return <StayDetailTemplate city={city.slug} detail={detail} />;
}
