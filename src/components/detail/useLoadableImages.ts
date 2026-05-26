import { useEffect, useState } from 'react';

export function useLoadableImages(images: string[]) {
    const [loadableImages, setLoadableImages] = useState(images.slice(0, 1));

    useEffect(() => {
        let isActive = true;

        Promise.all(
            images.map(
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
            setLoadableImages(loadedImages.length > 0 ? loadedImages : images.slice(0, 1));
        });

        return () => {
            isActive = false;
        };
    }, [images]);

    return loadableImages;
}
