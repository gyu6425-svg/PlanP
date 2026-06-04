import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FavoriteListCard } from '../components/favorites/FavoriteListCard';
import { PageState } from '../components/ui/PageState';
import { StatCard } from '../components/ui/stat-card';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getRecentViews, type RecentViewItem } from '../services/recentViewsApi';
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
    const [recentViewsNav, setRecentViewsNav] = useState<(typeof navItems)[number]>('이동수단');
    const [recentViews, setRecentViews] = useState<RecentViewItem[]>([]);
    const [recentViewsStatus, setRecentViewsStatus] = useState<'loading' | 'idle' | 'error'>(
        'loading'
    );

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchFavoritesThunk());
            setRecentViewsStatus('loading');
            getRecentViews()
                .then((items) => {
                    setRecentViews(items);
                    setRecentViewsStatus('idle');
                })
                .catch((error) => {
                    console.error('Failed to load recent views', error);
                    setRecentViewsStatus('error');
                });
        }
    }, [dispatch, isAuthenticated]);

    const visibleItems = useMemo(
        () => favorites.filter((item) => item.itemType === itemTypeByNav[activeNav]),
        [activeNav, favorites]
    );

    const visibleRecentViews = useMemo(
        () => recentViews.filter((item) => item.itemType === itemTypeByNav[recentViewsNav]),
        [recentViews, recentViewsNav]
    );

    const handleRecentViewsNavChange = useCallback(
        (value: string) => setRecentViewsNav(value as (typeof navItems)[number]),
        []
    );

    const handleActiveNavChange = useCallback(
        (value: string) => setActiveNav(value as (typeof navItems)[number]),
        []
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: { pathname: '/favorites' } }} />;
    }

    return (
        <main className="min-h-svh bg-[#f5f5f5] pb-[120px]">
            <section className="mx-auto flex w-[min(1500px,calc(100vw-32px))] flex-col items-center pt-[190px]">
                <h1 className="text-center text-[80px] font-semibold leading-none tracking-normal text-[#333333]">
                    보관
                </h1>

                <div className="mt-[40px] w-[1500px] max-w-full rounded-[50px] bg-white px-[54px] py-[46px] font-[600]">
                    <div className="flex items-end justify-between">
                        <h2 className="text-[34px] font-[700] leading-none text-[#333333]">
                            최근 본 항목
                        </h2>
                        <p className="text-[16px] font-[500] text-[#777777]">
                            상세 페이지에 들어간 장소가 자동으로 기록됩니다.
                        </p>
                    </div>

                    <Tabs
                        value={recentViewsNav}
                        onValueChange={handleRecentViewsNavChange}
                    >
                        <TabsList className="mt-[28px] h-auto rounded-full bg-[#f3f3f3] p-[6px]">
                            {navItems.map((item) => (
                                <TabsTrigger
                                    key={item}
                                    value={item}
                                    className="rounded-full px-[28px] py-[14px] text-[18px] font-[700] data-[state=active]:text-[#6B8A59]"
                                >
                                    {item}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <div className="mt-[36px]">
                        {recentViewsStatus === 'loading' ? (
                            <PageState
                                variant="loading"
                                title="최근 본 항목을 불러오는 중입니다."
                                description="상세 페이지 방문 기록을 확인하고 있습니다."
                            />
                        ) : recentViewsStatus === 'error' ? (
                            <PageState
                                variant="error"
                                title="최근 본 항목을 불러오지 못했습니다."
                                description="서버 연결 또는 로그인 상태를 확인해 주세요."
                            />
                        ) : visibleRecentViews.length === 0 ? (
                            <PageState
                                variant="empty"
                                title="아직 최근 본 항목이 없습니다."
                                description="상세 페이지에 들어간 장소가 자동으로 기록됩니다."
                            />
                        ) : (
                            <div className="grid grid-cols-3 gap-[16px] min-[1200px]:grid-cols-3">
                                {visibleRecentViews.slice(0, 6).map((item) => (
                                    <StatCard
                                        key={`recent-${item.itemType}-${item.itemId}`}
                                        eyebrow={item.brand || item.categoryLabel}
                                        title={item.title}
                                        meta={
                                            item.subtitle ||
                                            new Date(item.viewedAt).toLocaleDateString('ko-KR')
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-[40px] w-[1500px] max-w-full rounded-[50px] bg-white px-[54px] py-[46px] font-[600]">
                    <div className="flex items-end justify-between">
                        <h2 className="text-[34px] font-[700] leading-none text-[#333333]">
                            내가 담은 항목
                        </h2>
                        <p className="text-[16px] font-[500] text-[#777777]">
                            관심 있는 항목을 저장해 다시 확인할 수 있습니다.
                        </p>
                    </div>

                    <Tabs
                        value={activeNav}
                        onValueChange={handleActiveNavChange}
                    >
                        <TabsList className="mt-[28px] h-auto rounded-full bg-[#f3f3f3] p-[6px]">
                            {navItems.map((item) => (
                                <TabsTrigger
                                    key={item}
                                    value={item}
                                    className="rounded-full px-[28px] py-[14px] text-[18px] font-[700] data-[state=active]:text-[#6B8A59]"
                                >
                                    {item}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    {status === 'loading' ? (
                        <PageState
                            variant="loading"
                            title="저장한 리스트를 불러오는 중입니다."
                            description="서버에서 저장된 항목을 가져오고 있습니다."
                            className="mt-[80px]"
                        />
                    ) : null}

                    {status !== 'loading' && visibleItems.length === 0 ? (
                        <PageState
                            variant="empty"
                            title="아직 담은 항목이 없습니다."
                            description="관심 있는 이동수단, 맛집, 관광, 숙소를 저장하면 여기에서 확인할 수 있습니다."
                            className="mt-[80px]"
                        />
                    ) : null}

                    <div className="mt-[80px] grid grid-cols-[493px] justify-center gap-[20px] min-[1100px]:grid-cols-[repeat(2,493px)]">
                        {visibleItems.map((item) => (
                            <FavoriteListCard key={`${item.itemType}-${item.itemId}`} item={item} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
