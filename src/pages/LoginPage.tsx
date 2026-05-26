import { useCallback, useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginThunk } from '../store/slices/authSlice';

type LocationState = {
    from?: {
        pathname?: string;
    };
};

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState('demo@planp.kr');
    const [password, setPassword] = useState('planp1234');

    const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/';

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await dispatch(loginThunk({ email, password })).unwrap();
            navigate(redirectTo, { replace: true });
        },
        [dispatch, email, navigate, password, redirectTo]
    );

    if (auth.accessToken) {
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <section className="mx-auto grid min-h-[calc(100svh-137px)] max-w-6xl place-items-center px-4 py-12 sm:px-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
            >
                <h1 className="text-2xl font-black">로그인</h1>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                    JWT 토큰 기반 세션 관리를 확인할 수 있는 데모 로그인입니다.
                </p>

                <label className="mt-6 block text-sm font-semibold" htmlFor="email">
                    이메일
                </label>
                <input
                    id="email"
                    className="mt-2 h-11 w-full rounded-md border border-stone-300 px-3 outline-none focus:border-emerald-700"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                />

                <label className="mt-4 block text-sm font-semibold" htmlFor="password">
                    비밀번호
                </label>
                <input
                    id="password"
                    className="mt-2 h-11 w-full rounded-md border border-stone-300 px-3 outline-none focus:border-emerald-700"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    required
                />

                {auth.error ? (
                    <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                        {auth.error}
                    </p>
                ) : null}

                <Button className="mt-6 w-full" disabled={auth.status === 'loading'}>
                    {auth.status === 'loading' ? '로그인 중' : '로그인'}
                </Button>
            </form>
        </section>
    );
}
