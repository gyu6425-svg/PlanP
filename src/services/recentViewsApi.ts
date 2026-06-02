import { apiClient } from './apiClient';
import type { FavoriteInput, FavoriteItem } from './favoritesApi';

export type RecentViewItem = FavoriteItem & {
    viewedAt: string;
};

export async function getRecentViews() {
    const { data } = await apiClient.get<{ recentViews: RecentViewItem[] }>('/recent-views');
    return data.recentViews;
}

export async function saveRecentView(input: FavoriteInput) {
    const { data } = await apiClient.post<{ recentView: RecentViewItem }>('/recent-views', input);
    return data.recentView;
}
