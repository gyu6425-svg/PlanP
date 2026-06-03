import { useEffect, useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { PageState } from '../components/ui/PageState';
import { Select } from '../components/ui/select';
import { StatCard } from '../components/ui/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
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

    const summary = useMemo(() => {
        if (!stats) {
            return null;
        }

        const totalSelectedCities = stats.selectedCities.reduce((sum, row) => sum + row.count, 0);
        const totalBookingClicks = stats.bookingClicksByCityAndType.reduce(
            (sum, row) => sum + row.count,
            0
        );

        return {
            totalSelectedCities,
            totalBookingClicks,
        };
    }, [stats]);

    const topSelectedCity = stats?.selectedCities[0];

    function exportCsv() {
        if (!stats) {
            return;
        }

        const header = ['cityCode', 'cityLabel', 'itemType', 'itemLabel', 'count', 'lastClickedAt'];
        const rows = cityBookingRows.flatMap((row) =>
            itemTypes.map((type) => [
                row.cityCode,
                row.cityLabel,
                type,
                itemTypeLabels[type],
                String(row.counts[type]),
                stats.bookingClicksByCityAndType.find(
                    (entry) => entry.cityCode === row.cityCode && entry.itemType === type
                )?.lastClickedAt ?? '',
            ])
        );

        const csv = [header, ...rows]
            .map((cells) =>
                cells
                    .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
                    .join(',')
            )
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `planp-admin-stats-${new Date().toISOString().slice(0, 10)}.csv`;
        anchor.click();
        URL.revokeObjectURL(url);
    }

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
                        <Select
                            value={filters.cityCode}
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    cityCode: event.target.value,
                                }))
                            }
                            className="h-[48px] rounded-full px-[18px] text-[16px] font-[700] text-[#333333]"
                        >
                            <option value="">전체 도시</option>
                            {supportedCities.map((city) => (
                                <option key={city.slug} value={city.slug}>
                                    {city.label}
                                </option>
                            ))}
                        </Select>
                        <Select
                            value={filters.itemType}
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    itemType: event.target.value as BookingItemType | '',
                                }))
                            }
                            className="h-[48px] rounded-full px-[18px] text-[16px] font-[700] text-[#333333]"
                        >
                            <option value="">전체 카테고리</option>
                            {itemTypes.map((type) => (
                                <option key={type} value={type}>
                                    {itemTypeLabels[type]}
                                </option>
                            ))}
                        </Select>
                        <Select
                            value={filters.range}
                            onChange={(event) =>
                                setFilters((current) => ({
                                    ...current,
                                    range: event.target.value as Required<AdminStatsFilters>['range'],
                                }))
                            }
                            className="h-[48px] rounded-full px-[18px] text-[16px] font-[700] text-[#333333]"
                        >
                            <option value="all">전체 기간</option>
                            <option value="7d">최근 7일</option>
                            <option value="30d">최근 30일</option>
                        </Select>
                        <button
                            type="button"
                            onClick={exportCsv}
                            disabled={!stats}
                            className="inline-flex h-[48px] items-center gap-[10px] rounded-full border border-[#6b8a59] bg-[#6b8a59] px-[18px] text-[16px] font-[800] text-white disabled:cursor-not-allowed disabled:bg-[#a9b99b]"
                        >
                            <Download className="size-[18px]" strokeWidth={2.2} aria-hidden="true" />
                            CSV 다운로드
                        </button>
                    </div>
                </div>

                {status === 'loading' ? (
                    <PageState
                        variant="loading"
                        title="통계를 불러오는 중입니다."
                        description="예약 클릭과 설문 집계 데이터를 가져오고 있습니다."
                        className="mt-[80px]"
                    />
                ) : null}

                {status === 'error' ? (
                    <PageState
                        variant="error"
                        title="통계를 불러오지 못했습니다."
                        description="백엔드 서버 상태와 관리자 권한, 필터 조건을 확인해 주세요."
                        className="mt-[80px]"
                    />
                ) : null}

                {stats && status === 'idle' ? (
                    <>
                        <section className="mt-[28px] grid grid-cols-3 gap-[20px]">
                            <article className="rounded-[8px] border border-[#d8d8d8] bg-white p-[24px]">
                                <p className="text-[18px] font-[700] text-[#666666]">
                                    총 도시 선택 수
                                </p>
                                <p className="mt-[18px] text-[40px] font-[800] text-black">
                                    {summary?.totalSelectedCities ?? 0}
                                </p>
                                <Badge className="mt-[12px]">도시 선택</Badge>
                            </article>
                            <article className="rounded-[8px] border border-[#d8d8d8] bg-white p-[24px]">
                                <p className="text-[18px] font-[700] text-[#666666]">
                                    총 예약 클릭 수
                                </p>
                                <p className="mt-[18px] text-[40px] font-[800] text-black">
                                    {summary?.totalBookingClicks ?? 0}
                                </p>
                                <Badge className="mt-[12px]">예약 클릭</Badge>
                            </article>
                            <article className="rounded-[8px] border border-[#d8d8d8] bg-white p-[24px]">
                                <p className="text-[18px] font-[700] text-[#666666]">
                                    현재 필터
                                </p>
                                <p className="mt-[18px] text-[22px] font-[800] text-black">
                                    {filters.cityCode ? getCityLabel(filters.cityCode) : '전체 도시'}
                                </p>
                                <p className="mt-[8px] text-[16px] font-[600] text-[#777777]">
                                    {filters.itemType ? itemTypeLabels[filters.itemType] : '전체 카테고리'} ·{' '}
                                    {filters.range === '7d'
                                        ? '최근 7일'
                                        : filters.range === '30d'
                                          ? '최근 30일'
                                          : '전체 기간'}
                                </p>
                            </article>
                        </section>

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
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-[#f5f5f5] hover:bg-[#f5f5f5]">
                                            <TableHead className="px-[18px] py-[16px]">도시</TableHead>
                                            {itemTypes.map((type) => (
                                                <TableHead key={type} className="px-[18px] py-[16px]">
                                                    {itemTypeLabels[type]}
                                                </TableHead>
                                            ))}
                                            <TableHead className="px-[18px] py-[16px]">전체</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cityBookingRows.length > 0 ? (
                                            cityBookingRows.map((row) => (
                                                <TableRow key={row.cityCode}>
                                                    <TableCell className="px-[18px] py-[18px]">
                                                        {row.cityLabel}
                                                    </TableCell>
                                                    {itemTypes.map((type) => (
                                                        <TableCell key={type} className="px-[18px] py-[18px]">
                                                            {row.counts[type]}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell className="px-[18px] py-[18px] text-[#6b8a59]">
                                                        {row.total}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="px-[18px] py-[24px]">
                                                    <PageState
                                                        variant="empty"
                                                        title="조건에 맞는 예약 클릭 기록이 없습니다."
                                                        description="도시, 카테고리, 기간 필터를 바꿔 다시 확인해 보세요."
                                                        className="border-0 bg-transparent px-0 py-0"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        <section className="mt-[24px] rounded-[8px] border border-[#d8d8d8] bg-white p-[28px]">
                            <h2 className="text-[28px] font-[800] leading-none text-black">
                                많이 클릭한 예약 상품
                            </h2>
                            <div className="mt-[28px] grid grid-cols-3 gap-[16px]">
                                {stats.topBookingItems.length > 0 ? (
                                    stats.topBookingItems.map((item) => (
                                        <StatCard
                                            key={`${item.cityCode}-${item.itemType}-${item.itemTitle}-${item.platform}`}
                                            eyebrow={`${getCityLabel(item.cityCode)} · ${itemTypeLabels[item.itemType]} · ${item.platform}`}
                                            title={item.itemTitle}
                                            meta={`${item.count}회 클릭 · ${formatDate(item.lastClickedAt)}`}
                                        />
                                    ))
                                ) : (
                                    <p className="text-[18px] font-[600] text-[#777777]">
                                        조건에 맞는 예약 상품 클릭 기록이 없습니다.
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="mt-[24px] rounded-[8px] border border-[#d8d8d8] bg-white p-[28px]">
                            <h2 className="text-[28px] font-[800] leading-none text-black">
                                예약 클릭 상위 항목
                            </h2>
                            <div className="mt-[28px] overflow-hidden rounded-[8px] border border-[#e1e1e1]">
                                <div className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr] bg-[#f5f5f5] text-[16px] font-[800] text-[#555555]">
                                    <div className="px-[18px] py-[16px]">도시</div>
                                    <div className="px-[18px] py-[16px]">카테고리</div>
                                    <div className="px-[18px] py-[16px]">항목</div>
                                    <div className="px-[18px] py-[16px]">플랫폼</div>
                                    <div className="px-[18px] py-[16px]">횟수</div>
                                    <div className="px-[18px] py-[16px]">최근 클릭</div>
                                </div>
                                {stats.topBookingItems.length > 0 ? (
                                    stats.topBookingItems.map((row) => (
                                        <div
                                            key={`${row.cityCode}-${row.itemType}-${row.itemTitle}-${row.platform}`}
                                            className="grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr] border-t border-[#e1e1e1] text-[18px] font-[700] text-black"
                                        >
                                            <div className="px-[18px] py-[18px]">{getCityLabel(row.cityCode)}</div>
                                            <div className="px-[18px] py-[18px]">
                                                {itemTypeLabels[row.itemType]}
                                            </div>
                                            <div className="px-[18px] py-[18px] truncate">
                                                {row.itemTitle}
                                            </div>
                                            <div className="px-[18px] py-[18px] truncate">
                                                {row.platform}
                                            </div>
                                            <div className="px-[18px] py-[18px]">{row.count}</div>
                                            <div className="px-[18px] py-[18px] text-[#666666]">
                                                {formatDate(row.lastClickedAt)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <PageState
                                        variant="empty"
                                        title="조건에 맞는 예약 클릭 데이터가 없습니다."
                                        description="도시, 카테고리, 기간 필터를 바꿔 다시 확인해 보세요."
                                        className="mt-[20px]"
                                    />
                                )}
                            </div>
                        </section>
                    </>
                ) : null}
            </main>
        </div>
    );
}
