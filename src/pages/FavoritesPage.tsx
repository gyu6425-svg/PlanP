import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FavoriteListCard } from '../components/favorites/FavoriteListCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFavoritesThunk } from '../store/slices/favoritesSlice';

const navItems = ['이동수단', '맛집', '관광', '숙소'] as const;
const itemTypeByNav = {
    이동수단: 'transport',
    맛집: 'food',
    관광: 'tour',
    숙소: 'stay',
} as const;

export default function FavoritesPage() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));
    const favorites = useAppSelector((state) => state.favorites.items);
    const status = useAppSelector((state) => state.favorites.status);
    const [activeNav, setActiveNav] = useState<(typeof navItems)[number]>('이동수단');

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchFavoritesThunk());
        }
    }, [dispatch, isAuthenticated]);

    const visibleItems = useMemo(
        () => favorites.filter((item) => item.itemType === itemTypeByNav[activeNav]),
        [activeNav, favorites]
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: { pathname: '/favorites' } }} />;
    }

    return (
        <main className="min-h-svh bg-[#f5f5f5] pb-[120px]">
            <section className="mx-auto flex w-[min(1500px,calc(100vw-32px))] flex-col items-center pt-[190px]">
                <h1 className="text-center text-[80px] font-semibold leading-none tracking-normal text-[#333333]">
                    내가 담은 리스트
                </h1>

                <div className="mt-[40px] min-h-[1127px] w-[1500px] max-w-full rounded-[50px] bg-white px-[54px] py-[46px]">
                    <div>
                        <nav className="flex items-center gap-[91px]">
                            {navItems.map((item) => {
                                const isActive = activeNav === item;

                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => setActiveNav(item)}
                                        className={[
                                            'favorite-nav-item',
                                            isActive ? 'favorite-nav-item-active' : '',
                                        ].join(' ')}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {status === 'loading' ? (
                        <p className="mt-[80px] text-[22px] font-medium text-[#777777]">
                            저장한 리스트를 불러오는 중입니다.
                        </p>
                    ) : null}

                    {status !== 'loading' && visibleItems.length === 0 ? (
                        <p className="mt-[80px] text-[22px] font-medium text-[#777777]">
                            아직 담은 항목이 없습니다.
                        </p>
                    ) : null}

                    <div
                        className="mt-[80px] grid grid-cols-[493px] justify-center gap-[20px] min-[1100px]:grid-cols-[repeat(2,493px)]"
                    >
                        {visibleItems.map((item) => (
                            <FavoriteListCard key={`${item.itemType}-${item.itemId}`} item={item} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
