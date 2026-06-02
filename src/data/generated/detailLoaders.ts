import type { FoodPlaceDetail } from '../foodPlaceDetails';
import type { StayPlaceDetail } from '../stayPlaceDetails';
import type { TourPlaceDetail } from '../tourPlaceDetails';

const foodDetailModules = import.meta.glob<{
    generatedFoodPlaceDetailsById: Record<string, FoodPlaceDetail>;
}>('./details/*/foodPlaceDetails.ts');

const tourDetailModules = import.meta.glob<{
    generatedTourPlaceDetailsById: Record<string, TourPlaceDetail>;
}>('./details/*/tourPlaceDetails.ts');

const stayDetailModules = import.meta.glob<{
    generatedStayPlaceDetailsById: Record<string, StayPlaceDetail>;
}>('./details/*/stayPlaceDetails.ts');

export async function loadGeneratedFoodPlaceDetails(city: string) {
    const loader = foodDetailModules[`./details/${city}/foodPlaceDetails.ts`];
    const module = loader ? await loader() : undefined;
    return module?.generatedFoodPlaceDetailsById ?? {};
}

export async function loadGeneratedTourPlaceDetails(city: string) {
    const loader = tourDetailModules[`./details/${city}/tourPlaceDetails.ts`];
    const module = loader ? await loader() : undefined;
    return module?.generatedTourPlaceDetailsById ?? {};
}

export async function loadGeneratedStayPlaceDetails(city: string) {
    const loader = stayDetailModules[`./details/${city}/stayPlaceDetails.ts`];
    const module = loader ? await loader() : undefined;
    return module?.generatedStayPlaceDetailsById ?? {};
}
