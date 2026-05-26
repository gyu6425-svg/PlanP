import {
    memo,
    useEffect,
    useRef,
    useState,
    type MouseEvent,
    type ReactNode,
} from 'react';

function chunkItems<T>(items: T[], size: number) {
    const chunks: T[][] = [];

    for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
    }

    return chunks;
}

export function CardSlider<T>({
    items,
    renderItem,
    itemsPerRow = 6,
    className = '',
}: {
    items: T[];
    renderItem: (item: T) => ReactNode;
    itemsPerRow?: number;
    className?: string;
}) {
    return (
        <div className={['flex flex-col gap-[28px]', className].join(' ')}>
            {chunkItems(items, itemsPerRow).map((rowItems, rowIndex) => (
                <CardSliderRow key={rowIndex}>
                    {rowItems.map(renderItem)}
                </CardSliderRow>
            ))}
        </div>
    );
}

const CardSliderRow = memo(function CardSliderRow({ children }: { children: ReactNode }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const dragStartX = useRef(0);
    const scrollStartX = useRef(0);

    const updateScrollState = () => {
        const row = rowRef.current;

        if (!row) {
            return;
        }

        const maxScrollLeft = row.scrollWidth - row.clientWidth;

        setCanScrollLeft(row.scrollLeft > 0);
        setCanScrollRight(row.scrollLeft < maxScrollLeft - 1);
    };

    useEffect(() => {
        updateScrollState();
    }, [children]);

    const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        const row = rowRef.current;

        if (!row) {
            return;
        }

        updateScrollState();
        setIsDragging(true);
        dragStartX.current = event.pageX;
        scrollStartX.current = row.scrollLeft;
    };

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const row = rowRef.current;

        if (!isDragging || !row) {
            return;
        }

        event.preventDefault();
        row.scrollLeft = scrollStartX.current - (event.pageX - dragStartX.current);
        updateScrollState();
    };

    const stopDragging = () => {
        setIsDragging(false);
    };

    const handleScroll = () => {
        updateScrollState();
    };

    const scrollByCard = (direction: 'left' | 'right') => {
        const row = rowRef.current;

        if (!row) {
            return;
        }

        row.scrollBy({
            left: direction === 'left' ? -513 : 513,
            behavior: 'smooth',
        });

        window.setTimeout(updateScrollState, 220);
    };

    return (
        <div className="relative">
            <button
                type="button"
                aria-label="이전 카드 보기"
                disabled={!canScrollLeft}
                onClick={() => scrollByCard('left')}
                className="card-slider-arrow left-[18px]"
            >
                <ArrowIcon direction="left" disabled={!canScrollLeft} />
            </button>

            <div
                ref={rowRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDragging}
                onMouseLeave={stopDragging}
                onScroll={handleScroll}
                className={[
                    'card-slider-row flex w-full flex-nowrap gap-[20px] overflow-x-auto overflow-y-hidden py-[12px]',
                    isDragging ? 'cursor-grabbing select-none' : 'cursor-grab',
                ].join(' ')}
            >
                {children}
            </div>

            <button
                type="button"
                aria-label="다음 카드 보기"
                disabled={!canScrollRight}
                onClick={() => scrollByCard('right')}
                className="card-slider-arrow right-[18px]"
            >
                <ArrowIcon direction="right" disabled={!canScrollRight} />
            </button>
        </div>
    );
});

function ArrowIcon({
    direction,
    disabled,
}: {
    direction: 'left' | 'right';
    disabled: boolean;
}) {
    return (
        <svg
            width="34"
            height="58"
            viewBox="0 0 34 58"
            fill="none"
            aria-hidden="true"
            className={direction === 'left' ? 'rotate-180' : ''}
        >
            <path
                d="M4 4L29 29L4 54"
                stroke={disabled ? 'rgba(0,0,0,0.24)' : '#000000'}
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
