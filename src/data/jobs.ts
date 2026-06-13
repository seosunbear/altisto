export interface Job {
  title: string
  team: string
  type: string
  location: string
}

/** 채용 공고 데이터 — 모집 시 아래 배열에 추가하세요. */
export const jobs: Job[] = []

const unique = (values: string[]) => Array.from(new Set(values))

/** 필터 옵션은 데이터에서 자동 도출 (하드코딩 X) */
export const teamOptions = ['전체', ...unique(jobs.map((j) => j.team))]
export const typeOptions = ['전체', ...unique(jobs.map((j) => j.type))]
