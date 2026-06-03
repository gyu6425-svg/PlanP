import { useEffect, useMemo, useState } from 'react';

export function SmartImage({
    sources,
    alt = '',
    className,
    loading = 'lazy',
    decoding = 'async',
    fetchPriority,
}: {
    sources: string[];
    alt?: string;
    className?: string;
    loading?: 'eager' | 'lazy';
    decoding?: 'async' | 'auto' | 'sync';
    fetchPriority?: 'high' | 'low' | 'auto';
}) {
    const sourcesKey = sources.filter(Boolean).join('\u0000');
    const normalizedSources = useMemo(
        () => Array.from(new Set(sources.filter(Boolean))),
        [sourcesKey]
    );
    const [sourceIndex, setSourceIndex] = useState(0);

    useEffect(() => {
        setSourceIndex(0);
    }, [normalizedSources]);

    if (normalizedSources.length === 0) {
        return null;
    }

    const currentSource = normalizedSources[Math.min(sourceIndex, normalizedSources.length - 1)];

    return (
        <img
            src={currentSource}
            alt={alt}
            loading={loading}
            decoding={decoding}
            fetchPriority={fetchPriority}
            onError={() => {
                setSourceIndex((current) => Math.min(current + 1, normalizedSources.length - 1));
            }}
            className={className}
        />
    );
}
