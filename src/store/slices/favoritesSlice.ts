import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    deleteFavorite,
    getFavorites,
    saveFavorite,
    type FavoriteInput,
    type FavoriteItem,
    type FavoriteItemType,
} from '../../services/favoritesApi';

type FavoritesState = {
    items: FavoriteItem[];
    status: 'idle' | 'loading' | 'error';
    error: string | null;
    hasFetched: boolean;
};

const initialState: FavoritesState = {
    items: [],
    status: 'idle',
    error: null,
    hasFetched: false,
};

export const fetchFavoritesThunk = createAsyncThunk('favorites/fetch', getFavorites);
export const saveFavoriteThunk = createAsyncThunk('favorites/save', saveFavorite);
export const deleteFavoriteThunk = createAsyncThunk(
    'favorites/delete',
    async ({ itemType, itemId }: { itemType: FavoriteItemType; itemId: string }) =>
        deleteFavorite(itemType, itemId)
);

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        clearFavorites(state) {
            state.items = [];
            state.status = 'idle';
            state.error = null;
            state.hasFetched = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritesThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload;
                state.hasFetched = true;
            })
            .addCase(fetchFavoritesThunk.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message ?? '저장 목록을 불러오지 못했습니다.';
                state.hasFetched = true;
            })
            .addCase(saveFavoriteThunk.fulfilled, (state, action) => {
                const favorite = action.payload;
                state.items = [
                    favorite,
                    ...state.items.filter(
                        (item) =>
                            item.itemType !== favorite.itemType || item.itemId !== favorite.itemId
                    ),
                ];
            })
            .addCase(deleteFavoriteThunk.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) =>
                        item.itemType !== action.payload.itemType ||
                        item.itemId !== action.payload.itemId
                );
            });
    },
});

export function isFavorite(items: FavoriteItem[], input: Pick<FavoriteInput, 'itemType' | 'itemId'>) {
    return items.some((item) => item.itemType === input.itemType && item.itemId === input.itemId);
}

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
