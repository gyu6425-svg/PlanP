import { X } from 'lucide-react';
import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

type ToastVariant = 'default' | 'destructive';

type ToastInput = {
    title: string;
    description?: string;
    variant?: ToastVariant;
};

type ToastItem = ToastInput & {
    id: number;
};

type ToastContextValue = {
    toast: (input: ToastInput) => void;
    dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(1);

    const dismiss = useCallback((id: number) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const toast = useCallback(
        (input: ToastInput) => {
            const id = nextId.current++;
            setToasts((current) => [
                ...current,
                {
                    id,
                    title: input.title,
                    description: input.description,
                    variant: input.variant ?? 'default',
                },
            ]);
            window.setTimeout(() => dismiss(id), 3200);
        },
        [dismiss]
    );

    useEffect(() => {
        return () => {
            setToasts([]);
        };
    }, []);

    const contextValue = useMemo<ToastContextValue>(() => ({ toast, dismiss }), [dismiss, toast]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            {createPortal(
                <div className="pointer-events-none fixed right-[16px] top-[16px] z-[80] flex w-[360px] max-w-[calc(100vw-32px)] flex-col gap-[12px]">
                    {toasts.map((item) => (
                        <article
                            key={item.id}
                            className={cn(
                                'pointer-events-auto rounded-[16px] border bg-white px-[16px] py-[14px] shadow-lg',
                                item.variant === 'destructive'
                                    ? 'border-red-200'
                                    : 'border-stone-200'
                            )}
                        >
                            <div className="flex items-start justify-between gap-[12px]">
                                <div>
                                    <p
                                        className={cn(
                                            'text-[15px] font-[800] leading-none',
                                            item.variant === 'destructive'
                                                ? 'text-red-700'
                                                : 'text-[#333333]'
                                        )}
                                    >
                                        {item.title}
                                    </p>
                                    {item.description ? (
                                        <p className="mt-[6px] text-[14px] leading-[1.45] text-[#777777]">
                                            {item.description}
                                        </p>
                                    ) : null}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => dismiss(item.id)}
                                    className="rounded-full p-[4px] text-[#999999] transition hover:bg-stone-100 hover:text-stone-700"
                                    aria-label="알림 닫기"
                                >
                                    <X size={16} aria-hidden="true" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }

    return context;
}
