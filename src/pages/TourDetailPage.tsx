import { Navigate, useParams } from 'react-router-dom';
import { TourDetailTemplate } from '../components/tour-detail/TourDetailTemplate';
import { tourPlaceDetailsById } from '../data/tourPlaceDetails';
import { getCityBySlug } from '../lib/city';
import { routes } from '../lib/routes';

export default function TourDetailPage() {
    const { city: citySlug, category, placeSlug } = useParams();
    const city = getCityBySlug(citySlug);
    const detail =
        citySlug && category && placeSlug
            ? tourPlaceDetailsById[`${city.slug}/${category}/${placeSlug}`]
            : undefined;

    if (!detail) {
        return <Navigate to={routes.surveyResult(city.slug)} replace />;
    }

    return <TourDetailTemplate city={city.slug} detail={detail} />;
}
