import {
    Children,
    cloneElement,
    createContext,
    isValidElement,
    type ReactElement,
    type ReactNode,
    type RefObject,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

type DropdownMenuContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: RefObject<HTMLButtonElement | null>;
};

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

export function DropdownMenu({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    const contextValue = useMemo(
        () => ({ open, setOpen, triggerRef }),
        [open],
    );

    return <DropdownMenuContext.Provider value={contextValue}>{children}</DropdownMenuContext.Provider>;
}

export function DropdownMenuTrigger({
    asChild,
    children,
    className,
}: {
    asChild?: boolean;
    children: ReactElement;
    className?: string;
}) {
    const context = useContext(DropdownMenuContext);

    if (!context) {
        throw new Error('DropdownMenuTrigger must be used within DropdownMenu');
    }

    const triggerProps = {
        ref: context.triggerRef,
        onClick: () => context.setOpen(!context.open),
        'aria-expanded': context.open,
        'aria-haspopup': 'menu' as const,
        className,
    };

    if (asChild) {
        const child = Children.only(children) as ReactElement<Record<string, unknown>>;
        return cloneElement(child, {
            ...triggerProps,
            className: cn((child.props as { className?: string }).className, className),
        });
    }

    return (
        <button type="button" {...triggerProps}>
            {children}
        </button>
    );
}

export function DropdownMenuContent({
    className,
    align = 'end',
    children,
}: {
    className?: string;
    align?: 'start' | 'end';
    children: ReactNode;
}) {
    const context = useContext(DropdownMenuContext);
    const contentRef = useRef<HTMLDivElement | null>(null);

    if (!context) {
        throw new Error('DropdownMenuContent must be used within DropdownMenu');
    }

    const [position, setPosition] = useState({ top: 0, left: 0, width: 240 });

    const updatePosition = useCallback(() => {
        const trigger = context.triggerRef.current;
        if (!trigger) {
            return;
        }

        const rect = trigger.getBoundingClientRect();
        const width = 240;
        const left =
            align === 'end'
                ? Math.max(16, Math.min(rect.right - width, window.innerWidth - width - 16))
                : Math.max(16, rect.left);

        setPosition({
            top: rect.bottom + 8,
            left,
            width,
        });
    }, [align, context.triggerRef]);

    useEffect(() => {
        if (!context.open) {
            return;
        }

        updatePosition();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                context.setOpen(false);
            }
        };

        const handlePointerDown = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                contentRef.current?.contains(target) ||
                context.triggerRef.current?.contains(target)
            ) {
                return;
            }

            context.setOpen(false);
        };

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handlePointerDown);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handlePointerDown);
        };
    }, [context, updatePosition]);

    if (!context.open) {
        return null;
    }

    return createPortal(
        <div
            ref={contentRef}
            role="menu"
            className={cn(
                'fixed z-[75] overflow-hidden rounded-[16px] border border-stone-200 bg-white p-[6px] shadow-xl',
                className,
            )}
            style={{
                top: position.top,
                left: position.left,
                width: position.width,
            }}
        >
            {children}
        </div>,
        document.body,
    );
}

export function DropdownMenuItem({
    className,
    onClick,
    asChild,
    children,
}: {
    className?: string;
    onClick?: () => void;
    asChild?: boolean;
    children: ReactNode;
}) {
    const context = useContext(DropdownMenuContext);

    if (!context) {
        throw new Error('DropdownMenuItem must be used within DropdownMenu');
    }

    const handleClick = () => {
        onClick?.();
        context.setOpen(false);
    };

    const itemClassName = cn(
        'flex w-full items-center rounded-[10px] px-[12px] py-[10px] text-left text-[14px] font-[600] text-[#333333] transition hover:bg-stone-100',
        className,
    );

    if (asChild && isValidElement(children)) {
        const child = children as ReactElement<Record<string, unknown>>;
        return cloneElement(child, {
            onClick: handleClick,
            className: cn((child.props as { className?: string }).className, itemClassName),
            role: 'menuitem',
        });
    }

    return (
        <button type="button" onClick={handleClick} className={itemClassName} role="menuitem">
            {children}
        </button>
    );
}

export function DropdownMenuSeparator() {
    return <div className="my-[6px] h-px bg-stone-200" />;
}

export function DropdownMenuLabel({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return <div className={cn('px-[12px] py-[8px] text-[12px] font-[700] uppercase text-stone-400', className)}>{children}</div>;
}
