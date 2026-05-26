import { ExternalLink, Heart, MapPin } from 'lucide-react';

export type DetailInfoData = {
    address: string;
    website: string;
    reservationLabel: string;
    reservationValue: string;
    reservationNotes: string[];
    access: string;
    description: string;
    hours: {
        day: string;
        value: string;
        isToday?: boolean;
    }[];
};

export function DetailInfoPanel({
    detail,
    saveTitle = '음식점 저장하기',
    accessLabel = '좌석',
}: {
    detail: DetailInfoData;
    saveTitle?: string;
    accessLabel?: string;
}) {
    const todayLabel = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(new Date());

    return (
        <div className="mt-[30px] grid min-h-[548px] grid-cols-1 overflow-hidden rounded-[35px] border border-[#cfcfcf] bg-[#f5f5f5] lg:grid-cols-[minmax(0,1fr)_393px]">
            <section className="min-w-0 px-[32px] py-[34px]">
                <h2 className="text-[32px] font-[700] leading-none text-black">정보</h2>

                <div className="mt-[38px] flex min-w-0 items-center gap-[10px] text-[20px] font-[400] text-[#777777] underline underline-offset-2">
                    <MapPin className="shrink-0" size={22} strokeWidth={1.5} aria-hidden="true" />
                    <span className="min-w-0 break-words">{detail.address}</span>
                </div>

                <a
                    href={detail.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-[16px] flex min-w-0 items-center gap-[10px] text-[20px] font-[400] text-[#777777] underline underline-offset-2"
                >
                    <ExternalLink className="shrink-0" size={22} strokeWidth={1.5} aria-hidden="true" />
                    <span className="min-w-0 break-all">{detail.website}</span>
                </a>

                <p className="mt-[18px] text-[20px] font-[700] leading-none text-[#7b965e]">
                    {detail.reservationLabel}
                    <span className="ml-[18px] underline underline-offset-2">
                        {detail.reservationValue}
                    </span>
                </p>

                <div className="mt-[18px] space-y-[4px] text-[16px] font-[400] leading-[1.45] text-[#888888]">
                    {detail.reservationNotes.map((note) => (
                        <p key={note}>{note}</p>
                    ))}
                </div>

                <p className="mt-[22px] text-[16px] font-[400] leading-none text-[#666666]">
                    {accessLabel} : {detail.access}
                </p>

                <h2 className="mt-[58px] text-[32px] font-[700] leading-none text-black">소개</h2>
                <p className="mt-[34px] max-w-[760px] text-[22px] font-[400] leading-[1.45] text-[#333333]">
                    {detail.description}
                </p>
            </section>

            <aside className="min-w-0 border-t border-[#cfcfcf] lg:border-l lg:border-t-0">
                <section className="px-[32px] pb-[34px] pt-[34px]">
                    <h2 className="text-[32px] font-[700] leading-none text-black">
                        {saveTitle}
                    </h2>
                    <button
                        type="button"
                        className="mt-[42px] inline-flex h-[64px] w-[335px] items-center justify-center gap-[8px] rounded-full border border-[#6b8a59] bg-white text-[16px] font-[500] text-[#6b8a59]"
                    >
                        <Heart size={20} strokeWidth={1.8} aria-hidden="true" />
                        저장
                    </button>
                </section>

                <section className="border-t border-[#cfcfcf] px-[32px] pb-[34px] pt-[34px]">
                    <h2 className="text-[32px] font-[700] leading-none text-black">영업 시간</h2>
                    <div className="mt-[40px] space-y-[20px]">
                        {detail.hours.map((hour) => (
                            <div
                                key={hour.day}
                                className={[
                                    'grid grid-cols-[78px_minmax(0,1fr)] text-[16px] font-[400] leading-none',
                                    isCurrentHourRow(hour, todayLabel)
                                        ? 'text-[#6b8a59]'
                                        : 'text-black',
                                ].join(' ')}
                            >
                                <span>{hour.day}</span>
                                <span className="min-w-0 break-words">{hour.value}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </aside>
        </div>
    );
}

function isCurrentHourRow(hour: DetailInfoData['hours'][number], todayLabel: string) {
    const weekdayLabels = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

    if (weekdayLabels.includes(hour.day)) {
        return hour.day === todayLabel;
    }

    return Boolean(hour.isToday);
}
