import { Navigate, useParams } from 'react-router-dom';
import { StayDetailTemplate } from '../components/stay-detail/StayDetailTemplate';
import { stayPlaceDetailsById } from '../data/stayPlaceDetails';
import { getCityBySlug } from '../lib/city';
import { routes } from '../lib/routes';

export default function StayDetailPage() {
    const { city: citySlug, category, placeSlug } = useParams();
    const city = getCityBySlug(citySlug);
    const detail =
        citySlug && category && placeSlug
            ? stayPlaceDetailsById[`${city.slug}/${category}/${placeSlug}`]
            : undefined;

    if (!detail) {
        return <Navigate to={routes.surveyResult(city.slug)} replace />;
    }

    return <StayDetailTemplate city={city.slug} detail={detail} />;
}
