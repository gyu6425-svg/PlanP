import { useEffect, useMemo, useState } from 'react';
import { getCityBySlug, supportedCities } from '../lib/city';
import {
    getAdminStats,
    type AdminStats,
    type AdminStatsFilters,
    type BookingItemType,
} from '../services/bookingClicksApi';
import { useAppSelector } from '../store/hooks';

const itemTypeLabels: Record<BookingItemType, string> = {
    transport: '이동수단',
    food: '맛집',
    tour: '관광',
    stay: '숙소',
};

const itemTypes: BookingItemType[] = ['transport', 'food', 'tour', 'stay'];

function getCityLabel(cityCode: string) {
    return getCityBySlug(cityCode).label;
}

function formatDate(value: string) {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('ko-KR', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(value));
}

export default function AdminPage() {
    const user = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [status, setStatus] = useState<'loading' | 'idle' | 'error'>('loading');
    const [filters, setFilters] = useState<Required<AdminStatsFilters>>({
        cityCode: '',
        itemType: '',
        range: 'all',
    });

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            return;
        }

        let isCurrent = true;

        async function loadStats() {
            setStatus('loading');

            try {
                const data = await getAdminStats(filters);

                if (isCurrent) {
                    setStats(data);
                    setStatus('idle');
                }
            } catch (error) {
                console.error('Failed to load admin stats', error);

                if (isCurrent) {
                    setStatus('error');
                }
            }
        }

        loadStats();

        return () => {
            isCurrent = false;
        };
    }, [filters, isAuthenticated, user?.role]);

    const cityBookingRows = useMemo(() => {
        if (!stats) {
            return [];
        }

        const cities = new Set<string>();
        stats.selectedCities.forEach((row) => cities.add(row.cityCode));
        stats.bookingClicksByCityAndType.forEach((row) => cities.add(row.cityCode));

        return [...cities]
            .map((cityCode) => {
                const counts = Object.fromEntries(itemTypes.map((type) => [type, 0])) as Record<
                    BookingItemType,
                    number
                >;

                stats.bookingClicksByCityAndType
                    .filter((row) => row.cityCode === cityCode)
                    .forEach((row) => {
                        counts[row.itemType] = row.count;
                    });

                return {
                    cityCode,
                    cityLabel: getCityLabel(cityCode),
                    counts,
                    total: itemTypes.reduce((sum, type) => sum + counts[type], 0),
                };
            })
            .sort((a, b) => b.total - a.total);
    }, [stats]);

    const topSelectedCity = stats?.selectedCities[0];

    return (
        <div className="min-h-svh bg-[#f5f5f5] px-[48px] pb-[100px] pt-[180px]">
            <main className="mx-auto max-w-[1520px]">
                <div className="flex items-end justify-between gap-[24px]">
                    <div>
                        <p className="text-[18px] font-[700] leading-none text-[#6b8a59]">
                            PlanP Admin
                        </p>
                        <h1 className="mt-[16px] text-[52px] font-[800] leading-none text-black">
                            예약 클릭 통계
                        </h1>
                    </div>
                    <div className="flex flex-wrap justify-end gap-[10px]">
                        <select
                            value={filters.cityCode}
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    cityCode: event.target.value,
                                }))
                            }
                            className="h-[48px] rounded-full border border-[#d8d8d8] bg-white px-[18px] text-[16px] font-[700] text-[#333333]"
                        >
                            <option value="">전체 도시</option>
                            {supportedCities.map((city) => (
                                <option key={city.slug} value={city.slug}>
                                    {city.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filters.itemType}
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    itemType: event.target.value as BookingItemType | '',
                                }))
                            }
                            className="h-[48px] rounded-full border border-[#d8d8d8] bg-white px-[18px] text-[16px] font-[700] text-[#333333]"
                        >
                            <option value="">전체 카테고리</option>
                            {itemTypes.map((type) => (
                                <option key={type} value={type}>
                                    {itemTypeLabels[type]}
                                </option>
                            ))}
                        </select>
                        <select
                            value={filters.range}
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    range: event.target.value as Required<AdminStatsFilters>['range'],
                                }))
                            }
                            className="h-[48px] rounded-full border border-[#d8d8d8] bg-white px-[18px] text-[16px] font-[700] text-[#333333]"
                        >
                            <option value="all">전체 기간</option>
                            <option value="7d">최근 7일</option>
                            <option value="30d">최근 30일</option>
                        </select>
                    </div>
                </div>

                {status === 'loading' ? (
                    <p className="mt-[80px] text-[22px] font-[700] text-[#6b8a59]">
                        통계를 불러오는 중입니다.
                    </p>
                ) : null}

                {status === 'error' ? (
                    <p className="mt-[80px] text-[22px] font-[700] text-red-600">
                        통계를 불러오지 못했습니다. 백엔드 서버와 관리자 권한을 확인해 주세요.
                    </p>
                ) : null}

                {stats && status === 'idle' ? (
                    <>
                        <section className="mt-[56px] grid grid-cols-[1fr_2fr] gap-[20px]">
                            <article className="rounded-[8px] border border-[#d8d8d8] bg-white p-[28px]">
                                <p className="text-[18px] font-[700] text-[#666666]">
                                    가장 많이 선택한 도시
                                </p>
                                <h2 className="mt-[24px] text-[44px] font-[800] text-black">
                                    {topSelectedCity
                                        ? getCityLabel(topSelectedCity.cityCode)
                                        : '데이터 없음'}
                                </h2>
                                <p className="mt-[12px] text-[18px] font-[600] text-[#6b8a59]">
                                    {topSelectedCity ? `${topSelectedCity.count}회 선택` : '-'}
                                </p>
                            </article>

                            <article className="rounded-[8px] border border-[#d8d8d8] bg-white p-[28px]">
                                <p className="text-[18px] font-[700] text-[#666666]">
                                    도시 선택 순위
                                </p>
                                <div className="mt-[22px] grid grid-cols-3 gap-[12px]">
                                    {stats.selectedCities.length > 0 ? (
                                        stats.selectedCities.slice(0, 6).map((row) => (
                                            <div
                                                key={row.cityCode}
                                                className="rounded-[8px] bg-[#f5f5f5] px-[18px] py-[16px]"
                                            >
                                                <p className="text-[22px] font-[800] text-black">
                                                    {getCityLabel(row.cityCode)}
                                                </p>
                                                <p className="mt-[8px] text-[15px] font-[600] text-[#777777]">
                                                    {row.count}회 · {formatDate(row.lastSelectedAt)}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-[18px] font-[600] text-[#777777]">
                                            조건에 맞는 설문 결과가 없습니다.
                                        </p>
                                    )}
                                </div>
                            </article>
                        </section>

                        <section className="mt-[24px] rounded-[8px] border border-[#d8d8d8] bg-white p-[28px]">
                            <h2 className="text-[28px] font-[800] leading-none text-black">
                                도시별 예약 클릭
                            </h2>
                            <div className="mt-[28px] overflow-hidden rounded-[8px] border border-[#e1e1e1]">
                                <div className="grid grid-cols-[1.2fr_repeat(5,1fr)] bg-[#f5f5f5] text-[16px] font-[800] text-[#555555]">
                                    <div className="px-[18px] py-[16px]">도시</div>
                                    {itemTypes.map((type) => (
                                        <div key={type} className="px-[18px] py-[16px]">
                                            {itemTypeLabels[type]}
                                        </div>
                                    ))}
                                    <div className="px-[18px] py-[16px]">전체</div>
                                </div>
                                {cityBookingRows.length > 0 ? (
                                    cityBookingRows.map((row) => (
                                        <div
                                            key={row.cityCode}
                                            className="grid grid-cols-[1.2fr_repeat(5,1fr)] border-t border-[#e1e1e1] text-[18px] font-[700] text-black"
                                        >
                                            <div className="px-[18px] py-[18px]">{row.cityLabel}</div>
                                            {itemTypes.map((type) => (
                                                <div key={type} className="px-[18px] py-[18px]">
                                                    {row.counts[type]}
                                                </div>
                                            ))}
                                            <div className="px-[18px] py-[18px] text-[#6b8a59]">
                                                {row.total}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="border-t border-[#e1e1e1] px-[18px] py-[24px] text-[18px] font-[600] text-[#777777]">
                                        조건에 맞는 예약 클릭 기록이 없습니다.
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="mt-[24px] rounded-[8px] border border-[#d8d8d8] bg-white p-[28px]">
                            <h2 className="text-[28px] font-[800] leading-none text-black">
                                많이 클릭한 예약 상품
                            </h2>
                            <div className="mt-[28px] grid grid-cols-3 gap-[16px]">
                                {stats.topBookingItems.length > 0 ? (
                                    stats.topBookingItems.map((item) => (
                                        <article
                                            key={`${item.cityCode}-${item.itemType}-${item.itemTitle}-${item.platform}`}
                                            className="rounded-[8px] bg-[#f5f5f5] p-[20px]"
                                        >
                                            <p className="text-[15px] font-[800] text-[#6b8a59]">
                                                {getCityLabel(item.cityCode)} ·{' '}
                                                {itemTypeLabels[item.itemType]} · {item.platform}
                                            </p>
                                            <h3 className="mt-[12px] min-h-[58px] text-[22px] font-[800] leading-[1.25] text-black">
                                                {item.itemTitle}
                                            </h3>
                                            <p className="mt-[16px] text-[16px] font-[700] text-[#777777]">
                                                {item.count}회 클릭 · {formatDate(item.lastClickedAt)}
                                            </p>
                                        </article>
                                    ))
                                ) : (
                                    <p className="text-[18px] font-[600] text-[#777777]">
                                        조건에 맞는 예약 상품 클릭 기록이 없습니다.
                                    </p>
                                )}
                            </div>
                        </section>
                    </>
                ) : null}
            </main>
        </div>
    );
}
