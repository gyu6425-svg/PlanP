import { apiClient } from './apiClient';

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

export async function getFavorites() {
    const { data } = await apiClient.get<{ favorites: FavoriteItem[] }>('/favorites');
    return data.favorites;
}

export async function saveFavorite(input: FavoriteInput) {
    const { data } = await apiClient.post<{ favorite: FavoriteItem }>('/favorites', input);
    return data.favorite;
}

export async function deleteFavorite(itemType: FavoriteItemType, itemId: string) {
    await apiClient.delete(`/favorites/${encodeURIComponent(itemType)}/${encodeURIComponent(itemId)}`);
    return { itemType, itemId };
}
