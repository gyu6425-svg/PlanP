import { useNavigate } from 'react-router-dom';
import { routes } from '../../lib/routes';

export function DetailBackButton({
    city,
    section,
}: {
    city: string;
    section: '맛집' | '숙소' | '관광';
}) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(`${routes.surveyResult(city)}?section=${encodeURIComponent(section)}`)}
            aria-label="뒤로가기"
            className="absolute left-[118px] top-[154px] grid size-[58px] place-items-center text-black transition hover:-translate-x-1"
        >
            <svg
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    d="M35.5 14L20.5 29L35.5 44"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
}
