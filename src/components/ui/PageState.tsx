import { AlertCircle, LoaderCircle, SearchX } from 'lucide-react';

type PageStateProps = {
    variant: 'loading' | 'error' | 'empty';
    title: string;
    description?: string;
    className?: string;
};

const variantStyles = {
    loading: {
        icon: LoaderCircle,
        iconClassName: 'animate-spin text-[#6b8a59]',
    },
    error: {
        icon: AlertCircle,
        iconClassName: 'text-red-600',
    },
    empty: {
        icon: SearchX,
        iconClassName: 'text-[#777777]',
    },
} as const;

export function PageState({ variant, title, description, className }: PageStateProps) {
    const Icon = variantStyles[variant].icon;

    return (
        <div
            className={[
                'grid place-items-center rounded-[8px] border border-dashed border-[#d9d9d9] bg-white px-[24px] py-[48px] text-center',
                className ?? '',
            ].join(' ')}
        >
            <div className="flex max-w-[560px] flex-col items-center">
                <Icon className={['size-[34px]', variantStyles[variant].iconClassName].join(' ')} aria-hidden="true" />
                <p className="mt-[16px] text-[22px] font-[800] leading-none text-black">{title}</p>
                {description ? (
                    <p className="mt-[10px] text-[16px] font-[500] leading-[1.5] text-[#666666]">
                        {description}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
