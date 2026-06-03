type StatCardProps = {
    eyebrow: string;
    title: string;
    meta: string;
    className?: string;
    variant?: 'compact' | 'favorites';
};

export function StatCard({ eyebrow, title, meta, className, variant = 'compact' }: StatCardProps) {
    return (
        <article
            className={[
                variant === 'favorites'
                    ? 'flex h-[330px] flex-col rounded-[50px] bg-[#f5f5f5] px-[32px] py-[28px]'
                    : 'rounded-[8px] bg-[#f5f5f5] p-[20px]',
                className ?? '',
            ].join(' ')}
        >
            <p
                className={
                    variant === 'favorites'
                        ? 'text-[15px] font-[800] text-[#6b8a59]'
                        : 'text-[15px] font-[800] text-[#6b8a59]'
                }
            >
                {eyebrow}
            </p>
            <h3
                className={[
                    variant === 'favorites'
                        ? 'mt-[12px] min-h-[72px] text-[30px] font-bold leading-[1.2] text-black'
                        : 'mt-[12px] min-h-[58px] text-[22px] font-[800] leading-[1.25] text-black',
                ].join(' ')}
            >
                {title}
            </h3>
            <p
                className={[
                    variant === 'favorites'
                        ? 'mt-auto flex items-center gap-[14px] text-[14px] font-[400] leading-none text-[#6B8A59]'
                        : 'mt-[16px] text-[16px] font-[700] text-[#777777]',
                ].join(' ')}
            >
                {meta}
            </p>
        </article>
    );
}
