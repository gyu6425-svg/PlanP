export const routes = {
    home: () => '/',
    survey: (city: string) => `/${city}/survey`,
    surveyResult: (city: string) => `/${city}/survey/result`,
    foodDetail: (city: string, category: string, slug: string) =>
        `/${city}/food/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`,
    stayDetail: (city: string, category: string, slug: string) =>
        `/${city}/stay/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`,
    tourDetail: (city: string, category: string, slug: string) =>
        `/${city}/tour/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`,
};
