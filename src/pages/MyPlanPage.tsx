import { CalendarDays, MapPin } from 'lucide-react';
import { useAppSelector } from '../store/hooks';

export default function MyPlanPage() {
    const user = useAppSelector((state) => state.auth.user);
    const planner = useAppSelector((state) => state.planner);

    return (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="rounded-lg border border-stone-200 bg-white p-6">
                <p className="text-sm font-semibold text-emerald-800">JWT 보호 라우트</p>
                <h1 className="mt-2 text-3xl font-black">
                    {user?.name ?? '여행자'}님의 느슨한 여행 계획
                </h1>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-stone-50 p-4">
                        <MapPin className="text-emerald-700" size={22} aria-hidden="true" />
                        <p className="mt-3 text-sm text-stone-500">선호 지역</p>
                        <p className="text-xl font-black">{planner.selectedRegion}</p>
                    </div>
                    <div className="rounded-lg bg-stone-50 p-4">
                        <CalendarDays className="text-emerald-700" size={22} aria-hidden="true" />
                        <p className="mt-3 text-sm text-stone-500">일정 밀도</p>
                        <p className="text-xl font-black">{planner.pace}</p>
                    </div>
                    <div className="rounded-lg bg-stone-50 p-4">
                        <p className="text-sm text-stone-500">계획 회피 지수</p>
                        <p className="mt-2 text-4xl font-black">{planner.avoidPlanningLevel}/10</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
