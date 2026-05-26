export function SurveyResultHeader({
    navItems,
    activeNav,
    onChangeNav,
    onRetry,
}: {
    navItems: string[];
    activeNav: string;
    onChangeNav: (item: string) => void;
    onRetry: () => void;
}) {
    return (
        <>
            <div className="flex items-start justify-between">
                <div>
                    <nav className="flex items-center gap-[91px]">
                        {navItems.map((item) => {
                            const isActive = activeNav === item;

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => onChangeNav(item)}
                                    className={[
                                        'result-nav-item',
                                        isActive ? 'result-nav-item-active' : '',
                                    ].join(' ')}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                <button
                    type="button"
                    onClick={onRetry}
                    className="h-[61px] w-[146px] rounded-[50px] bg-[#6B8A59] text-[20px] font-[700] text-white"
                >
                    다시 검색
                </button>
            </div>

            <div className="mt-[10px] h-px w-[1520px] bg-[#777777]/50" />
        </>
    );
}
