import { Navigate, useParams } from 'react-router-dom';
import { FoodDetailTemplate } from '../components/food-detail/FoodDetailTemplate';
import { foodPlaceDetailsById } from '../data/foodPlaceDetails';
import { getCityBySlug } from '../lib/city';
import { routes } from '../lib/routes';

export default function FoodDetailPage() {
    const { city: citySlug, category, placeSlug } = useParams();
    const city = getCityBySlug(citySlug);
    const detail =
        citySlug && category && placeSlug
            ? foodPlaceDetailsById[`${city.slug}/${category}/${placeSlug}`]
            : undefined;

    if (!detail) {
        return <Navigate to={routes.surveyResult(city.slug)} replace />;
    }

    return <FoodDetailTemplate city={city.slug} detail={detail} />;
}
