import { useEffect, useMemo, useState } from 'react';

export function useLoadableImages(images: string[], preloadLimit = images.length) {
    const initialImages = useMemo(
        () => (preloadLimit < images.length ? images.slice(0, preloadLimit) : images.slice(0, 1)),
        [images, preloadLimit]
    );
    const [loadableImages, setLoadableImages] = useState(initialImages);

    useEffect(() => {
        let isActive = true;
        const imagesToPreload = images.slice(0, preloadLimit);

        Promise.all(
            imagesToPreload.map(
                (src) =>
                    new Promise<string | null>((resolve) => {
                        const image = new Image();
                        image.onload = () => resolve(src);
                        image.onerror = () => resolve(null);
                        image.src = src;
                    })
            )
        ).then((results) => {
            if (!isActive) {
                return;
            }

            const loadedImages = results.filter((src): src is string => Boolean(src));
            const uncheckedImages =
                preloadLimit < images.length ? images.slice(preloadLimit) : [];
            const nextImages =
                loadedImages.length > 0 ? [...loadedImages, ...uncheckedImages] : initialImages;
            setLoadableImages(nextImages);
        });

        return () => {
            isActive = false;
        };
    }, [images, initialImages, preloadLimit]);

    return loadableImages;
}
