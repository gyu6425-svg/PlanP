const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

type StreetViewLocation =
    | string
    | {
          lat: number;
          lng: number;
      };

export function buildStreetViewImages(location: StreetViewLocation, fallbackImages: string[]) {
    const validFallbackImages = fallbackImages.filter(Boolean);

    if (!googleMapsApiKey) {
        return validFallbackImages;
    }

    const base = 'https://maps.googleapis.com/maps/api/streetview';
    const locationQuery =
        typeof location === 'string' ? encodeURIComponent(location) : `${location.lat},${location.lng}`;
    const common = `size=640x640&location=${locationQuery}&fov=80&pitch=0&source=outdoor&return_error_code=true&key=${googleMapsApiKey}`;

    return [`${base}?${common}&heading=0`, `${base}?${common}&heading=90`];
}
