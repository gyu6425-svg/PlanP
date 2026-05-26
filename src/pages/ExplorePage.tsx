import 'react-virtualized/styles.css'

import { MapPin, SlidersHorizontal } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'
import {
  AutoSizer,
  InfiniteLoader,
  List,
  type IndexRange,
  type ListRowProps,
} from 'react-virtualized'
import { Button } from '../components/ui/button'
import {
  fetchPlanRecommendations,
  type PlanListItem,
} from '../services/plansApi'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setAvoidPlanningLevel,
  setPace,
  setSelectedRegion,
} from '../store/slices/plannerSlice'

const PAGE_SIZE = 40
const TOTAL_COUNT = 1000
const regions = ['서울', '부산', '제주', '강릉', '전주', '여수']
const paces = [
  { label: '느슨하게', value: 'loose' },
  { label: '균형 있게', value: 'balanced' },
  { label: '알차게', value: 'dense' },
] as const

const PlanRow = memo(function PlanRow({
  plan,
  style,
}: {
  plan?: PlanListItem
  style: ListRowProps['style']
}) {
  if (!plan) {
    return (
      <div style={style} className="px-2 py-2">
        <div className="h-full animate-pulse rounded-lg border border-stone-200 bg-white" />
      </div>
    )
  }

  return (
    <div style={style} className="px-2 py-2">
      <article className="flex h-full flex-col justify-between rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-black">{plan.title}</h2>
            <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">
              {plan.score}% 맞춤
            </span>
          </div>
          <p className="mt-2 flex items-center gap-1 text-sm text-stone-500">
            <MapPin size={15} aria-hidden="true" />
            {plan.region} · {plan.duration}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {plan.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-stone-200 px-2 py-1 text-xs font-semibold text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Button variant="secondary" size="sm" className="mt-4 sm:mt-0">
          담기
        </Button>
      </article>
    </div>
  )
})

export default function ExplorePage() {
  const dispatch = useAppDispatch()
  const planner = useAppSelector((state) => state.planner)
  const [plans, setPlans] = useState<Record<number, PlanListItem>>({})
  const [loadingPages, setLoadingPages] = useState<Set<number>>(() => new Set())

  const loadedCount = useMemo(() => Object.keys(plans).length, [plans])

  const loadMoreRows = useCallback(
    async ({ startIndex, stopIndex }: IndexRange) => {
      const startPage = Math.floor(startIndex / PAGE_SIZE)
      const endPage = Math.floor(stopIndex / PAGE_SIZE)
      const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
      ).filter((page) => {
        if (loadingPages.has(page)) {
          return false
        }

        const pageStart = page * PAGE_SIZE
        const pageEnd = Math.min(pageStart + PAGE_SIZE, TOTAL_COUNT)
        return Array.from(
          { length: pageEnd - pageStart },
          (_, index) => pageStart + index,
        ).some((rowIndex) => !plans[rowIndex])
      })

      if (pages.length === 0) {
        return
      }

      setLoadingPages((current) => {
        const next = new Set(current)
        pages.forEach((page) => next.add(page))
        return next
      })

      const results = await Promise.all(
        pages.map(async (page) => ({
          page,
          items: await fetchPlanRecommendations(page, PAGE_SIZE),
        })),
      )

      setPlans((current) => {
        const next = { ...current }
        results.forEach(({ items, page }) => {
          items.forEach((plan, offset) => {
            next[page * PAGE_SIZE + offset] = plan
          })
        })
        return next
      })

      setLoadingPages((current) => {
        const next = new Set(current)
        pages.forEach((page) => next.delete(page))
        return next
      })
    },
    [loadingPages, plans],
  )

  const isRowLoaded = useCallback(
    ({ index }: { index: number }) => Boolean(plans[index]),
    [plans],
  )

  const rowRenderer = useCallback(
    ({ index, key, style }: ListRowProps) => (
      <PlanRow key={key} plan={plans[index]} style={style} />
    ),
    [plans],
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
              <SlidersHorizontal size={16} aria-hidden="true" />
              Redux Toolkit 전역 필터
            </p>
            <h1 className="mt-1 text-2xl font-black">코스 탐색</h1>
          </div>
          <p className="text-sm text-stone-500">
            {loadedCount.toLocaleString()} / {TOTAL_COUNT.toLocaleString()}개 로드
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_220px]">
          <div>
            <p className="mb-2 text-sm font-semibold">지역</p>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={
                    planner.selectedRegion === region ? 'default' : 'secondary'
                  }
                  size="sm"
                  onClick={() => dispatch(setSelectedRegion(region))}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">일정 밀도</p>
            <div className="flex flex-wrap gap-2">
              {paces.map((pace) => (
                <Button
                  key={pace.value}
                  variant={planner.pace === pace.value ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => dispatch(setPace(pace.value))}
                >
                  {pace.label}
                </Button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm font-semibold">계획 회피 지수</span>
            <input
              className="mt-4 w-full accent-emerald-700"
              type="range"
              min="1"
              max="10"
              value={planner.avoidPlanningLevel}
              onChange={(event) =>
                dispatch(setAvoidPlanningLevel(Number(event.target.value)))
              }
            />
            <span className="text-sm text-stone-500">
              {planner.avoidPlanningLevel}/10
            </span>
          </label>
        </div>
      </div>

      <div className="h-[640px] rounded-lg border border-stone-200 bg-stone-50 p-2">
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={TOTAL_COUNT}
          threshold={8}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={registerChild}
                  height={height}
                  onRowsRendered={onRowsRendered}
                  overscanRowCount={6}
                  rowCount={TOTAL_COUNT}
                  rowHeight={132}
                  rowRenderer={rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    </section>
  )
}
