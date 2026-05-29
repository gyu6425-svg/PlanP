import { useCallback, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signupThunk } from '../store/slices/authSlice';

export default function SignupPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.auth);
    const [form, setForm] = useState({
        id: '',
        password: '',
        passwordConfirm: '',
        name: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        email: '',
    });
    const [formError, setFormError] = useState<string | null>(null);

    const updateField = useCallback((field: keyof typeof form, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setFormError(null);

            if (form.password !== form.passwordConfirm) {
                setFormError('비밀번호가 일치하지 않습니다.');
                return;
            }

            if (!/^\d{4}$/.test(form.birthYear) || !/^\d{1,2}$/.test(form.birthMonth) || !/^\d{1,2}$/.test(form.birthDay)) {
                setFormError('생년월일을 숫자로 입력해 주세요.');
                return;
            }

            try {
                await dispatch(
                    signupThunk({
                        loginId: form.id,
                        password: form.password,
                        name: form.name,
                        birthYear: form.birthYear,
                        birthMonth: form.birthMonth,
                        birthDay: form.birthDay,
                        email: form.email || undefined,
                    })
                ).unwrap();

                navigate('/login');
            } catch {
                // Error message is rendered from auth.error.
            }
        },
        [dispatch, form, navigate]
    );

    const inputClass =
        'h-[59px] rounded-[12px] border-[0.7px] border-[#999999] px-[15px] text-[20px] font-medium text-[#333333] outline-none placeholder:text-[#999999] focus:border-[#6B8A59]';
    const labelClass = 'mb-[8px] block text-[20px] font-medium leading-none text-[#555555]';

    return (
        <section className="relative min-h-svh bg-[#f5f5f5]">
            <div className="mx-auto flex min-h-svh w-full max-w-[700px] flex-col items-center pt-[190px]">
                <h1 className="text-center text-[80px] font-semibold leading-none tracking-normal text-[#333333]">
                    PlanP 로그인
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="mt-[49px] flex h-[881px] w-[700px] flex-col items-center rounded-[50px] bg-white pt-[84px]"
                >
                    <div className="w-[400px]">
                        <label className={labelClass} htmlFor="signup-id">
                            아이디
                        </label>
                        <input
                            id="signup-id"
                            className={`${inputClass} w-[400px]`}
                            value={form.id}
                            onChange={(event) => updateField('id', event.target.value)}
                            type="text"
                            required
                        />
                    </div>

                    <div className="mt-[25px] w-[400px]">
                        <label className={labelClass} htmlFor="signup-password">
                            비밀번호
                        </label>
                        <input
                            id="signup-password"
                            className={`${inputClass} w-[400px]`}
                            value={form.password}
                            onChange={(event) => updateField('password', event.target.value)}
                            type="password"
                            required
                        />
                    </div>

                    <div className="mt-[25px] w-[400px]">
                        <label className={labelClass} htmlFor="signup-password-confirm">
                            비밀번호 재확인
                        </label>
                        <input
                            id="signup-password-confirm"
                            className={`${inputClass} w-[400px]`}
                            value={form.passwordConfirm}
                            onChange={(event) => updateField('passwordConfirm', event.target.value)}
                            type="password"
                            required
                        />
                    </div>

                    <div className="mt-[25px] w-[400px]">
                        <label className={labelClass} htmlFor="signup-name">
                            이름
                        </label>
                        <input
                            id="signup-name"
                            className={`${inputClass} w-[400px]`}
                            value={form.name}
                            onChange={(event) => updateField('name', event.target.value)}
                            type="text"
                            required
                        />
                    </div>

                    <div className="mt-[25px] w-[400px]">
                        <label className={labelClass}>생년월일</label>
                        <div className="flex gap-[11px]">
                            <input
                                aria-label="년"
                                className={`${inputClass} w-[126px]`}
                                value={form.birthYear}
                                onChange={(event) => updateField('birthYear', event.target.value)}
                                placeholder="년(4자)"
                                inputMode="numeric"
                                maxLength={4}
                                required
                            />
                            <input
                                aria-label="월"
                                className={`${inputClass} w-[126px]`}
                                value={form.birthMonth}
                                onChange={(event) => updateField('birthMonth', event.target.value)}
                                placeholder="월"
                                inputMode="numeric"
                                maxLength={2}
                                required
                            />
                            <input
                                aria-label="일"
                                className={`${inputClass} w-[126px]`}
                                value={form.birthDay}
                                onChange={(event) => updateField('birthDay', event.target.value)}
                                placeholder="일"
                                inputMode="numeric"
                                maxLength={2}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-[25px] w-[400px]">
                        <label className={labelClass} htmlFor="signup-email">
                            이메일(선택)
                        </label>
                        <input
                            id="signup-email"
                            className={`${inputClass} w-[400px]`}
                            value={form.email}
                            onChange={(event) => updateField('email', event.target.value)}
                            type="email"
                        />
                    </div>

                    {formError || auth.error ? (
                        <p className="mt-[14px] w-[400px] rounded-[12px] bg-red-50 px-[14px] py-[8px] text-[14px] font-medium text-red-700">
                            {formError ?? auth.error}
                        </p>
                    ) : null}

                    <div className="font-[500] text-[20px] text-[#555555]">
                        <button
                            type="submit"
                            className="mt-[25px] h-[59px] w-[400px] rounded-[12px] bg-[#f2f2f2] disabled:opacity-70"
                            disabled={auth.status === 'loading'}
                        >
                            {auth.status === 'loading' ? '가입 중' : '회원가입'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
