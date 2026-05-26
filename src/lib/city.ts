export type CityInfo = {
    slug: string;
    label: string;
    aliases: string[];
};

export const supportedCities: CityInfo[] = [
    { slug: 'tokyo', label: '도쿄', aliases: ['도쿄', 'tokyo', '동경'] },
    { slug: 'taipei', label: '타이베이', aliases: ['타이베이', 'taipei'] },
    { slug: 'osaka', label: '오사카', aliases: ['오사카', 'osaka'] },
    { slug: 'fukuoka', label: '후쿠오카', aliases: ['후쿠오카', 'fukuoka'] },
    { slug: 'bangkok', label: '방콕', aliases: ['방콕', 'bangkok'] },
];

export const defaultCity = supportedCities[0];

export function getCityBySlug(slug: string | undefined) {
    if (!slug) {
        return defaultCity;
    }

    return supportedCities.find((city) => city.slug === slug.toLowerCase()) ?? defaultCity;
}

export function getCityFromKeyword(keyword: string) {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
        return defaultCity;
    }

    return (
        supportedCities.find((city) =>
            city.aliases.some((alias) => normalizedKeyword.includes(alias.toLowerCase()))
        ) ?? defaultCity
    );
}
