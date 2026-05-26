import { tokenStorage } from './apiClient'

export type PlanListItem = {
  id: string
  title: string
  region: string
  duration: string
  tags: string[]
  score: number
}

const REGIONS = ['서울', '부산', '제주', '강릉', '전주', '여수']
const TAGS = ['즉흥 가능', '동선 짧음', '맛집 중심', '비 예보 대응', '혼자 가능', '예약 적음']

export async function fetchPlanRecommendations(
  page: number,
  pageSize: number,
): Promise<PlanListItem[]> {
  if (import.meta.env.VITE_USE_REAL_API === 'true') {
    const response = await fetch(`/api/plans?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${tokenStorage.get() ?? ''}`,
      },
    })

    if (!response.ok) {
      throw new Error('추천 코스를 불러오지 못했습니다.')
    }

    return response.json() as Promise<PlanListItem[]>
  }

  await new Promise((resolve) => setTimeout(resolve, 250))

  return Array.from({ length: pageSize }, (_, index) => {
    const number = page * pageSize + index + 1
    const region = REGIONS[number % REGIONS.length]

    return {
      id: `plan-${number}`,
      title: `${region} ${number}번 P형 맞춤 코스`,
      region,
      duration: number % 3 === 0 ? '당일치기' : '1박 2일',
      tags: [TAGS[number % TAGS.length], TAGS[(number + 2) % TAGS.length]],
      score: 72 + (number % 24),
    }
  })
}
