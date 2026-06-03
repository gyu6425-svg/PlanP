import {
    createContext,
    useContext,
    useMemo,
    useState,
    type HTMLAttributes,
    type ReactNode,
} from 'react';
import { cn } from '../../lib/utils';

type TabsContextValue = {
    value: string;
    setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tabs({
    defaultValue,
    value,
    onValueChange,
    className,
    children,
}: {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    children: ReactNode;
}) {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const currentValue = value ?? internalValue;

    const contextValue = useMemo<TabsContextValue>(
        () => ({
            value: currentValue,
            setValue: (nextValue: string) => {
                onValueChange?.(nextValue);
                if (value === undefined) {
                    setInternalValue(nextValue);
                }
            },
        }),
        [currentValue, onValueChange, value]
    );

    return (
        <TabsContext.Provider value={contextValue}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            role="tablist"
            className={cn(
                'inline-flex h-11 items-center justify-center rounded-md bg-stone-100 p-1 text-stone-500',
                className
            )}
            {...props}
        />
    );
}

export function TabsTrigger({
    value,
    className,
    ...props
}: HTMLAttributes<HTMLButtonElement> & { value: string }) {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error('TabsTrigger must be used within Tabs');
    }

    const isActive = context.value === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            data-state={isActive ? 'active' : 'inactive'}
            onClick={() => context.setValue(value)}
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                isActive ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900',
                className
            )}
            {...props}
        />
    );
}

export function TabsContent({
    value,
    className,
    ...props
}: HTMLAttributes<HTMLDivElement> & { value: string }) {
    const context = useContext(TabsContext);

    if (!context) {
        throw new Error('TabsContent must be used within Tabs');
    }

    if (context.value !== value) {
        return null;
    }

    return <div className={className} {...props} />;
}
