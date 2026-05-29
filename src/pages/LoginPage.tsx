import { useCallback, useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginThunk } from '../store/slices/authSlice';

const REMEMBERED_LOGIN_ID_KEY = 'planp.rememberedLoginId';

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
    const [loginId, setLoginId] = useState(() => localStorage.getItem(REMEMBERED_LOGIN_ID_KEY) ?? '');
    const [password, setPassword] = useState('');
    const [rememberId, setRememberId] = useState(() => Boolean(localStorage.getItem(REMEMBERED_LOGIN_ID_KEY)));

    const redirectTo = (location.state as LocationState | null)?.from?.pathname ?? '/';

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (rememberId) {
                localStorage.setItem(REMEMBERED_LOGIN_ID_KEY, loginId);
            } else {
                localStorage.removeItem(REMEMBERED_LOGIN_ID_KEY);
            }

            try {
                await dispatch(loginThunk({ loginId, password })).unwrap();
                navigate(redirectTo, { replace: true });
            } catch {
                // Error message is rendered from auth.error.
            }
        },
        [dispatch, loginId, navigate, password, redirectTo, rememberId]
    );

    if (auth.accessToken) {
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <section className="relative min-h-svh bg-[#f5f5f5]">
            <div className="mx-auto flex min-h-svh w-full max-w-[700px] flex-col items-center pt-[190px]">
                <h1 className="text-center text-[80px] font-semibold leading-none tracking-normal text-[#333333]">
                    PlanP 로그인
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-[49px] flex h-[405px] w-[700px] flex-col items-center rounded-[50px] bg-white pt-[70px]"
                >
                    <input
                        id="email"
                        className="h-[59px] w-[400px] rounded-[12px] border-[0.7px] border-[#999999] px-[15px] text-[20px] font-medium text-[#333333] outline-none placeholder:text-[#999999] focus:border-[#6B8A59]"
                        value={loginId}
                        onChange={(event) => setLoginId(event.target.value)}
                        placeholder="아이디"
                        type="text"
                        required
                    />

                    <input
                        id="password"
                        className="mt-[5px] h-[59px] w-[400px] rounded-[12px] border-[0.7px] border-[#999999] px-[15px] text-[20px] font-medium text-[#333333] outline-none placeholder:text-[#999999] focus:border-[#6B8A59]"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="비밀번호"
                        type="password"
                        required
                    />

                    <label className="mt-[10px] flex w-[400px] items-center gap-[5px] text-[14px] font-medium text-[#999999]">
                        <input
                            checked={rememberId}
                            onChange={(event) => setRememberId(event.target.checked)}
                            type="checkbox"
                            className="h-[17px] w-[17px] rounded-[4px] border-[0.7px] border-[#999999] accent-[#6B8A59]"
                        />
                        아이디 저장하기
                    </label>

                    {auth.error ? (
                        <p className="mt-[10px] w-[400px] rounded-[12px] bg-red-50 px-[14px] py-[8px] text-[14px] font-medium text-red-700">
                            {auth.error}
                        </p>
                    ) : null}

                    <div className="mt-[19px] flex w-[400px] gap-[17px] text-[20px] font-[500]">
                        <button
                            type="submit"
                            className="h-[59px] w-[190px] rounded-[12px] bg-[#6B8A59] text-[20px] font-medium text-white disabled:opacity-70"
                            disabled={auth.status === 'loading'}
                        >
                            {auth.status === 'loading' ? '로그인 중' : '로그인'}
                        </button>
                        <Link
                            to="/signup"
                            className="grid h-[59px] w-[193px] place-items-center rounded-[12px] bg-[#f2f2f2] text-[20px] font-medium text-[#999999]"
                        >
                            회원가입
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
