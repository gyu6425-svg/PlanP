const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

export function buildStreetViewImages(location: string, fallbackImages: string[]) {
    const validFallbackImages = fallbackImages.filter(Boolean);

    if (!googleMapsApiKey) {
        return validFallbackImages;
    }

    const base = 'https://maps.googleapis.com/maps/api/streetview';
    const common = `size=640x640&location=${encodeURIComponent(location)}&fov=80&pitch=0&source=outdoor&return_error_code=true&key=${googleMapsApiKey}`;

    return [`${base}?${common}&heading=0`, `${base}?${common}&heading=90`];
}

