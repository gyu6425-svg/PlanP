function PlaneIcon() {
    return (
        <svg
            width="132"
            height="132"
            viewBox="0 0 132 132"
            fill="none"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M114.5 18.5C118.2 22.2 117.2 29 112.6 31.6L79.3 50.7L96.5 99.9C97.3 102.2 96.6 104.8 94.8 106.5L88.7 112.6C86.3 115 82.2 114.2 80.9 111.1L61.4 65.3L43.9 82.8L46.8 101.6C47.1 103.5 46.5 105.4 45.1 106.8L39.5 112.4C37.4 114.5 33.8 113.9 32.7 111.1L23.9 90.1L2.9 81.3C0.1 80.2 -0.5 76.6 1.6 74.5L7.2 68.9C8.6 67.5 10.5 66.9 12.4 67.2L31.2 70.1L48.7 52.6L2.9 33.1C-0.2 31.8 -1 27.7 1.4 25.3L7.5 19.2C9.2 17.4 11.8 16.7 14.1 17.5L63.3 34.7L82.4 1.4C85 -3.2 91.8 -4.2 95.5 -0.5L114.5 18.5Z"
                transform="translate(7 9)"
                fill="#6B8A59"
            />
        </svg>
    );
}

export function ShoppingComingSoonSection() {
    return (
        <section className="mt-[120px] flex min-h-[560px] flex-col items-center justify-center text-center">
            <PlaneIcon />

            <h2 className="mt-[44px] text-[100px] leading-[1.08] tracking-normal text-black">
                <span className="font-[600] text-[#6B8A59]">서비스 준비 중</span>
                <span className="font-[400]">입니다.</span>
            </h2>

            <p className="mt-[40px] whitespace-pre-line text-[40px] font-[400] leading-[1.35] tracking-normal text-[#333333]">
                {
                    '쇼핑 페이지는 아직 준비 중에 있습니다.\n빠른 시일 내에 준비하겠습니다. 죄송합니다.'
                }
            </p>
        </section>
    );
}
