import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

type DialogContextValue = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

type DialogProps = DialogContextValue & {
    children: ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    const contextValue = useMemo(() => ({ open, onOpenChange }), [onOpenChange, open]);
    return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>;
}

export function DialogContent({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    const context = useContext(DialogContext);
    const panelRef = useRef<HTMLDivElement | null>(null);

    if (!context) {
        throw new Error('DialogContent must be used within Dialog');
    }

    useEffect(() => {
        if (!context.open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                context.onOpenChange(false);
            }
        };

        const handlePointerDown = (event: MouseEvent) => {
            if (!panelRef.current || panelRef.current.contains(event.target as Node)) {
                return;
            }

            context.onOpenChange(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handlePointerDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handlePointerDown);
        };
    }, [context]);

    if (!context.open) {
        return null;
    }

    return createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 px-[16px] py-[24px]">
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className={cn(
                    'w-full max-w-[480px] rounded-[20px] bg-white p-[24px] shadow-2xl',
                    className,
                )}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}

export function DialogHeader({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return <div className={cn('space-y-[6px]', className)}>{children}</div>;
}

export function DialogTitle({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return <h2 className={cn('text-[24px] font-[800] leading-tight text-[#333333]', className)}>{children}</h2>;
}

export function DialogDescription({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return <p className={cn('text-[15px] leading-[1.5] text-[#777777]', className)}>{children}</p>;
}

export function DialogFooter({
    className,
    children,
}: {
    className?: string;
    children: ReactNode;
}) {
    return <div className={cn('mt-[24px] flex items-center justify-end gap-[10px]', className)}>{children}</div>;
}

export function DialogClose({
    children,
    onClick,
    className,
    type = 'button',
}: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={cn(
                'inline-flex h-10 items-center justify-center rounded-md border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:bg-stone-100',
                className,
            )}
        >
            {children}
        </button>
    );
}
