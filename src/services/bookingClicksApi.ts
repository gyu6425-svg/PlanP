import { apiClient } from './apiClient';

export type BookingItemType = 'transport' | 'food' | 'tour' | 'stay';

export type BookingClickRequest = {
    cityCode: string;
    itemType: BookingItemType;
    itemId?: string;
    itemTitle: string;
    platform: string;
    href: string;
    sectionLabel?: string;
};

export type AdminStats = {
    selectedCities: {
        cityCode: string;
        count: number;
        lastSelectedAt: string;
    }[];
    bookingClicksByCityAndType: {
        cityCode: string;
        itemType: BookingItemType;
        count: number;
        lastClickedAt: string;
    }[];
    topBookingItems: {
        cityCode: string;
        itemType: BookingItemType;
        itemTitle: string;
        platform: string;
        count: number;
        lastClickedAt: string;
    }[];
};

export type AdminStatsFilters = {
    cityCode?: string;
    itemType?: BookingItemType | '';
    range?: 'all' | '7d' | '30d';
};

export async function recordBookingClick(request: BookingClickRequest) {
    const { data } = await apiClient.post('/booking-clicks', {
        ...request,
        cityCode: request.cityCode.trim().toLowerCase(),
    });

    return data;
}

export async function getAdminStats(filters: AdminStatsFilters = {}) {
    const searchParams = new URLSearchParams();

    if (filters.cityCode) {
        searchParams.set('cityCode', filters.cityCode);
    }

    if (filters.itemType) {
        searchParams.set('itemType', filters.itemType);
    }

    if (filters.range && filters.range !== 'all') {
        searchParams.set('range', filters.range);
    }

    const query = searchParams.toString();
    const { data } = await apiClient.get<AdminStats>(`/admin/stats${query ? `?${query}` : ''}`);
    return data;
}
