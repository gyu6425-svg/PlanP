import { LogOut, UserRound } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { routes } from '../../lib/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { clearFavorites, fetchFavoritesThunk } from '../../store/slices/favoritesSlice';
import { Button } from '../ui/button';

const navItems = [
    { to: '/', label: '홈' },
    { to: '/explore', label: '코스 탐색' },
];

function BasketIcon() {
    return (
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden="true">
            <path
                d="M15.92 18.2V14.91C15.92 10.96 19.1 7.76 23.03 7.76C26.96 7.76 30.14 10.96 30.14 14.91V18.2"
                stroke="#555555"
                strokeWidth="3.2"
                strokeLinecap="round"
            />
            <path
                d="M10.08 18.18C9.91 16.55 11.19 15.13 12.83 15.13H33.17C34.81 15.13 36.09 16.55 35.92 18.18L33.9 37.25C33.75 38.66 32.56 39.73 31.14 39.73H14.86C13.44 39.73 12.25 38.66 12.1 37.25L10.08 18.18Z"
                stroke="#555555"
                strokeWidth="3.2"
                strokeLinejoin="round"
            />
            <path
                d="M17.26 20.93V21.1M28.74 20.93V21.1"
                stroke="#555555"
                strokeWidth="3.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function FavoritesBasketLink({
    count,
    animated,
}: {
    count: number;
    animated: boolean;
}) {
    return (
        <Link
            to={routes.favorites()}
            aria-label={`보관함으로 이동, 담은 항목 ${count}개`}
            className="relative grid size-[46px] place-items-center"
        >
            <BasketIcon />
            {count > 0 ? (
                <span
                    className={[
                        'absolute right-[-2px] top-[4px] grid size-[24px] place-items-center rounded-full bg-[#6B8A59] text-[13px] font-[700] leading-none text-[#FFFFFF]',
                        animated ? 'favorite-badge-bounce' : '',
                    ].join(' ')}
                >
                    {count > 99 ? '99+' : count}
                </span>
            ) : null}
        </Link>
    );
}

export const Header = memo(function Header() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const isHeroHeaderPage =
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/favorites' ||
        location.pathname === '/survey' ||
        location.pathname === '/survey/result' ||
        /^\/[^/]+\/survey(\/result)?$/.test(location.pathname) ||
        /^\/[^/]+\/food\//.test(location.pathname) ||
        /^\/[^/]+\/stay\//.test(location.pathname) ||
        /^\/[^/]+\/tour\//.test(location.pathname);
    const usesGreenLogo =
        location.pathname === '/login' ||
        location.pathname === '/signup' ||
        location.pathname === '/favorites' ||
        location.pathname === '/survey/result' ||
        /^\/[^/]+\/survey\/result$/.test(location.pathname) ||
        /^\/[^/]+\/food\//.test(location.pathname) ||
        /^\/[^/]+\/stay\//.test(location.pathname) ||
        /^\/[^/]+\/tour\//.test(location.pathname);
    const isAuthEntryPage = location.pathname === '/login' || location.pathname === '/signup';
    const logoSrc = usesGreenLogo ? '/images/logo_green.png' : '/images/logo_white.png';
    const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));
    const favoriteCount = useAppSelector((state) => state.favorites.items.length);
    const favoritesStatus = useAppSelector((state) => state.favorites.status);
    const previousFavoriteCount = useRef(favoriteCount);
    const [isFavoriteBadgeBouncing, setIsFavoriteBadgeBouncing] = useState(false);

    useEffect(() => {
        if (isAuthenticated && favoritesStatus === 'idle' && favoriteCount === 0) {
            dispatch(fetchFavoritesThunk());
        }
    }, [dispatch, favoriteCount, favoritesStatus, isAuthenticated]);

    useEffect(() => {
        if (favoriteCount > previousFavoriteCount.current) {
            setIsFavoriteBadgeBouncing(false);
            window.setTimeout(() => setIsFavoriteBadgeBouncing(true), 0);
        }

        previousFavoriteCount.current = favoriteCount;
    }, [favoriteCount]);

    useEffect(() => {
        if (!isFavoriteBadgeBouncing) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setIsFavoriteBadgeBouncing(false);
        }, 520);

        return () => window.clearTimeout(timeoutId);
    }, [isFavoriteBadgeBouncing]);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        dispatch(clearFavorites());
    }, [dispatch]);

    if (isHeroHeaderPage) {
        return (
            <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-[16px] pt-[25px]">
                <Link
                    to="/"
                    className="grid h-[51px] w-[84px] place-items-center"
                    aria-label="PlanP 홈"
                >
                    <img src={logoSrc} alt="PlanP" className="h-[120px] w-[84px] object-contain" />
                </Link>
                {isAuthenticated ? (
                    <div className="flex items-center gap-[22px]">
                        <FavoritesBasketLink
                            count={favoriteCount}
                            animated={isFavoriteBadgeBouncing}
                        />
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="landing-auth-link grid h-[51px] w-[181px] place-items-center rounded-full bg-[#535250]"
                        >
                            로그아웃
                        </button>
                    </div>
                ) : (
                    <Link
                        to={isAuthEntryPage ? '/' : '/login'}
                        className="landing-auth-link grid h-[51px] w-[181px] place-items-center rounded-full bg-[#535250]"
                    >
                        {isAuthEntryPage ? '여행 떠나기' : '로그인/회원가입'}
                    </Link>
                )}
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#fbfbf7]/95 backdrop-blur">
            <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <Link to="/" className="flex items-center gap-2 font-black">
                    <span className="grid h-[12px] w-[84px] place-items-center">
                        <img
                            src={logoSrc}
                            alt="PlanP"
                            className="h-[12px] w-[84px] object-contain"
                        />
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 rounded-md border border-stone-200 bg-white p-1 sm:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                [
                                    'rounded px-3 py-2 text-sm font-semibold transition',
                                    isActive
                                        ? 'bg-emerald-50 text-emerald-800'
                                        : 'text-stone-600 hover:bg-stone-100',
                                ].join(' ')
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <>
                            <FavoritesBasketLink
                                count={favoriteCount}
                                animated={isFavoriteBadgeBouncing}
                            />
                            <Button variant="ghost" size="sm" onClick={handleLogout}>
                                <LogOut size={16} aria-hidden="true" />
                                로그아웃
                            </Button>
                        </>
                    ) : (
                        <Button asChild size="sm">
                            <Link to="/login">
                                <UserRound size={16} aria-hidden="true" />
                                로그인
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
});
