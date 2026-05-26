import { LogOut, Route, UserRound } from 'lucide-react';
import { memo, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { Button } from '../ui/button';

const navItems = [
    { to: '/', label: '홈' },
    { to: '/explore', label: '코스 탐색' },
];

export const Header = memo(function Header() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const isHeroHeaderPage =
        location.pathname === '/' ||
        location.pathname === '/survey' ||
        location.pathname === '/survey/result' ||
        /^\/[^/]+\/survey(\/result)?$/.test(location.pathname) ||
        /^\/[^/]+\/food\//.test(location.pathname) ||
        /^\/[^/]+\/stay\//.test(location.pathname) ||
        /^\/[^/]+\/tour\//.test(location.pathname);
    const isAuthenticated = useAppSelector((state) => Boolean(state.auth.accessToken));

    const handleLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    if (isHeroHeaderPage) {
        return (
            <header className="absolute left-0 right-0 top-0 z-30 flex items-start justify-between px-[16px] pt-[25px]">
                <Link
                    to="/"
                    className="grid h-[97px] w-[158px] place-items-center bg-[#d9d9d9] text-[32px] font-semibold text-black"
                >
                    LOGO
                </Link>
                {isAuthenticated ? (
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="landing-auth-link grid h-[51px] w-[181px] place-items-center rounded-full bg-[#535250]"
                    >
                        로그아웃
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="landing-auth-link grid h-[51px] w-[181px] place-items-center rounded-full bg-[#535250]"
                    >
                        로그인/회원가입
                    </Link>
                )}
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-[#fbfbf7]/95 backdrop-blur">
            <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <Link to="/" className="flex items-center gap-2 font-black">
                    <span className="grid size-9 place-items-center rounded-md bg-emerald-700 text-white">
                        <Route size={20} aria-hidden="true" />
                    </span>
                    <span>Plan P</span>
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
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut size={16} aria-hidden="true" />
                            로그아웃
                        </Button>
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
