import { apiClient, tokenStorage } from './apiClient';
import { getUserFromJwt } from './jwt';

const shouldUseMockFavorites = !import.meta.env.VITE_API_BASE_URL;
const MOCK_FAVORITES_KEY = 'planp.mockFavorites';

export type FavoriteItemType = 'transport' | 'food' | 'tour' | 'stay';

export type FavoriteItem = {
    id: string;
    itemId: string;
    itemType: FavoriteItemType;
    categoryLabel: string;
    title: string;
    subtitle: string;
    price: string;
    policy: string;
    image: string;
    brand: string;
    href: string;
    createdAt: string;
    payload?: unknown;
};

export type FavoriteInput = Omit<FavoriteItem, 'id' | 'createdAt'>;

function getMockUserId() {
    const token = tokenStorage.get();
    return token ? (getUserFromJwt(token)?.id ?? 'guest') : 'guest';
}

function getMockFavoritesByUser() {
    try {
        const rawFavorites = localStorage.getItem(MOCK_FAVORITES_KEY);
        return rawFavorites
            ? (JSON.parse(rawFavorites) as Record<string, FavoriteItem[]>)
            : {};
    } catch {
        return {};
    }
}

function setMockFavoritesByUser(favoritesByUser: Record<string, FavoriteItem[]>) {
    localStorage.setItem(MOCK_FAVORITES_KEY, JSON.stringify(favoritesByUser));
}

export async function getFavorites() {
    if (shouldUseMockFavorites) {
        const favoritesByUser = getMockFavoritesByUser();
        return favoritesByUser[getMockUserId()] ?? [];
    }

    const { data } = await apiClient.get<{ favorites: FavoriteItem[] }>('/favorites');
    return data.favorites;
}

export async function saveFavorite(input: FavoriteInput) {
    if (shouldUseMockFavorites) {
        const userId = getMockUserId();
        const favoritesByUser = getMockFavoritesByUser();
        const favorite: FavoriteItem = {
            ...input,
            id: `${input.itemType}-${input.itemId}`,
            createdAt: new Date().toISOString(),
        };

        favoritesByUser[userId] = [
            favorite,
            ...(favoritesByUser[userId] ?? []).filter(
                (item) => item.itemType !== input.itemType || item.itemId !== input.itemId
            ),
        ];
        setMockFavoritesByUser(favoritesByUser);

        return favorite;
    }

    const { data } = await apiClient.post<{ favorite: FavoriteItem }>('/favorites', input);
    return data.favorite;
}

export async function deleteFavorite(itemType: FavoriteItemType, itemId: string) {
    if (shouldUseMockFavorites) {
        const userId = getMockUserId();
        const favoritesByUser = getMockFavoritesByUser();

        favoritesByUser[userId] = (favoritesByUser[userId] ?? []).filter(
            (item) => item.itemType !== itemType || item.itemId !== itemId
        );
        setMockFavoritesByUser(favoritesByUser);

        return { itemType, itemId };
    }

    await apiClient.delete(`/favorites/${encodeURIComponent(itemType)}/${encodeURIComponent(itemId)}`);
    return { itemType, itemId };
}
