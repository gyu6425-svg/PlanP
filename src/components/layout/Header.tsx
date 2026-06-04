import { LogOut, UserRound } from 'lucide-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { routes } from '../../lib/routes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearFavorites, fetchFavoritesThunk } from '../../store/slices/favoritesSlice';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { logout } from '../../store/slices/authSlice';
import { useToast } from '../ui/toast';

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

function FavoritesBasketLink({ count, animated }: { count: number; animated: boolean }) {
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

function UserMenu() {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const user = useAppSelector((state) => state.auth.user);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        dispatch(clearFavorites());
        setLogoutDialogOpen(false);
        toast({
            title: '로그아웃 완료',
            description: '보관함과 최근 본 항목은 다시 로그인하면 이어서 볼 수 있습니다.',
        });
    }, [dispatch, toast]);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="border-stone-200 bg-white px-[12px] text-stone-800 shadow-sm hover:bg-stone-100"
                    >
                        <UserRound size={16} aria-hidden="true" />
                        <span className="hidden sm:inline">
                            {user?.name ? `${user.name} 님` : '내 메뉴'}
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[240px]">
                    <DropdownMenuItem asChild>
                        <Link to={routes.favorites()}>보관함</Link>
                    </DropdownMenuItem>
                    {user?.role === 'admin' ? (
                        <DropdownMenuItem asChild>
                            <Link to="/admin">관리자</Link>
                        </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem onClick={() => setLogoutDialogOpen(true)}>
                        로그아웃
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>로그아웃할까요?</DialogTitle>
                        <DialogDescription>
                            현재 계정에서 로그아웃하고 보관함 연동을 종료합니다.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose onClick={() => setLogoutDialogOpen(false)}>취소</DialogClose>
                        <Button onClick={handleLogout}>
                            <LogOut size={16} aria-hidden="true" />
                            로그아웃
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
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
    const favoritesHasFetched = useAppSelector((state) => state.favorites.hasFetched);
    const previousFavoriteCount = useRef(favoriteCount);
    const [isFavoriteBadgeBouncing, setIsFavoriteBadgeBouncing] = useState(false);

    useEffect(() => {
        if (isAuthenticated && favoritesStatus === 'idle' && !favoritesHasFetched) {
            dispatch(fetchFavoritesThunk());
        }
    }, [dispatch, favoritesHasFetched, favoritesStatus, isAuthenticated]);

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

    if (isHeroHeaderPage) {
        return (
            <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-[16px] pt-[25px]">
                <Link
                    to="/"
                    className="grid h-[51px] w-[84px] place-items-center"
                    aria-label="PlanP 홈"
                >
                    <img
                        src={logoSrc}
                        alt="PlanP"
                        decoding="async"
                        className="h-[120px] w-[84px] object-contain"
                    />
                </Link>
                {isAuthenticated ? (
                    <div className="flex items-center gap-[22px]">
                        <FavoritesBasketLink
                            count={favoriteCount}
                            animated={isFavoriteBadgeBouncing}
                        />
                        <UserMenu />
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
                            decoding="async"
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
                            <UserMenu />
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
