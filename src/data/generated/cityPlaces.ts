import type { ResultImageCardData } from '../../components/cards/ResultImageCard';

type CardsByCategory = Record<string, ResultImageCardData[]>;

export const generatedFoodCategoryOptions = [
    "타이 대표음식",
    "스트리트 푸드 & 야시장",
    "로컬 디저트/카페",
    "씨푸드/레스토랑",
    "루프탑 바",
    "돈코츠라멘",
    "멘타이코(명란)",
    "야타이(포장마차)",
    "스시/회",
    "이자카야(현지 술집)",
    "카페/디저트",
    "타코야키",
    "오코노미야키",
    "라멘",
    "스시",
    "쿠시카츠",
    "시장·길거리 간식",
    "야시장 간식",
    "소롱포·딤섬",
    "국수·면요리",
    "루로우판·대만 덮밥",
    "버블티·디저트"
];

export const generatedTourCategoryOptions = [
    "사원 & 역사",
    "SNS명소",
    "시장 & 야시장",
    "근교 당일치기",
    "역사/사찰",
    "SNS 명소/풍경",
    "근교/소도시(당일치기)",
    "박물관/문화시설",
    "역사",
    "소도시",
    "자연·공원",
    "도심 전망·스카이라인",
    "역사·사찰·박물관",
    "근교 자연·온천",
    "창조문화·예술·시장"
];

export const generatedStayCategoryOptions = [
    "럭셔리 호텔",
    "비즈니스/중급 호텔",
    "호스텔",
    "서비스드 아파트",
    "호텔",
    "료칸/전통숙소",
    "캡슐",
    "료칸",
    "부티크 / 디자인 호텔",
    "호스텔 / 게스트하우스",
    "온천리조트·전통형 숙소 (근교)"
];

export const generatedFoodPlaceCardsByCategory: CardsByCategory = {
    "타이 대표음식": [
        {
            "id": "bangkok-category-1-thip-samai",
            "city": "bangkok",
            "slug": "thip-samai",
            "category": "타이 대표음식",
            "area": "왕궁 근처(랏타나코신)",
            "name": "Thip Samai (팁사마이, 팟타이)",
            "price": "฿100~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGub5qRW4ND_6hI4vpwkQ2emsUA1nYFy2XatNq3NTjEMe_-mot039FWbvDu-WsfTnHeF6Bmvl98plUNV733b7TyrJTZ5BVwLVQ=s4800-w1200"
        },
        {
            "id": "bangkok-category-1-som-tam-nua",
            "city": "bangkok",
            "slug": "som-tam-nua",
            "category": "타이 대표음식",
            "area": "시암",
            "name": "Som Tam Nua (솜탐 누아)",
            "price": "฿60~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNp9oqrWkouFf2T05RfG7P9tCi0eF_pUzzqaAj2273eFr-E82tV3Ak9HNpg-qTw4BGzfTSPaYtw3FZ2pkDltUQpg6kgDTa9tniLOdKKdV-Kq4pKLnTpxapbgj8hoVNlhiE4dK7Y5YfJ0BZUGg=s4800-w1200"
        },
        {
            "id": "bangkok-category-1-cabbages-condoms",
            "city": "bangkok",
            "slug": "cabbages-condoms",
            "category": "타이 대표음식",
            "area": "수쿰윗",
            "name": "Cabbages & Condoms (캐비지스 앤 콘돔스)",
            "price": "฿200~800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqErtKlsZ9W5gz0B1d_BwkZ-KItQQKhbjge5aji0ljnfKWtTNziVcHtyHJZvc7-sGSUmLsA8MTMbSWoKqGr46RfAmzc_vO3dIms=s4800-w1200"
        }
    ],
    "스트리트 푸드 & 야시장": [
        {
            "id": "bangkok-and-t-and-k-seafood-yaowarat",
            "city": "bangkok",
            "slug": "t-and-k-seafood-yaowarat",
            "category": "스트리트 푸드 & 야시장",
            "area": "차이나타운(야오와랏)",
            "name": "T & K 씨푸드 (야오와랏)",
            "price": "฿150~600",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGYVl88DFk58_iwFiWIETmSHBDXrQV46Bcp8yDd5ySeOyBKRLTDAemqxyZrGaF9nV0dcJ4Z_KwmK_K1uDOlMK7jmZ-gxf-ABiw=s4800-w1200"
        },
        {
            "id": "bangkok-and-ratchada-train-night-market",
            "city": "bangkok",
            "slug": "ratchada-train-night-market",
            "category": "스트리트 푸드 & 야시장",
            "area": "라차다",
            "name": "랏차다 트레인 나이트 마켓(야시장)",
            "price": "฿50~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEHtBdj4fO-Xx7il32EIvR_N0OzK9a_7pxn0-7uOOrqte53s_NqoEam9P6zbMSJdt6QAlZOg_gqtVxHrmBL9HoyGIQAQ0OIcoY=s4800-w960"
        },
        {
            "id": "bangkok-and-khao-san-road-street-food",
            "city": "bangkok",
            "slug": "khao-san-road-street-food",
            "category": "스트리트 푸드 & 야시장",
            "area": "카오산 로드",
            "name": "카오산 로드 길거리 음식",
            "price": "฿50~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPHPDavsSUty0hq83gaRDpUKwniCFI8H82ByiNipQremOeGb6EoiDz9zqqHhskEx5y_7G3w0YRsP8kRB5O0VtGtu6hIc5SxyxCvcXbLRDL4IfWW2mfL4kzRlTX8ebbNcskVp5G5emcklaNT=s4800-w1200"
        }
    ],
    "로컬 디저트/카페": [
        {
            "id": "bangkok-category-3-after-you-dessert-cafe",
            "city": "bangkok",
            "slug": "after-you-dessert-cafe",
            "category": "로컬 디저트/카페",
            "area": "시암",
            "name": "After You Dessert Café (애프터유)",
            "price": "฿80~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOb-bOtCpVChp2zO922w4KIV7UozChBdDEvUegrnRGdWjwtzkH0EXOHQyMWVYo4FLSM0VlerEitQd1IL-ZisaBZrHvsfV5z8haYs2C5yaBQvh-V_PzNFb5ePYG85KYtqRCy3z-t7YK60DSKmA=s4800-w1200"
        },
        {
            "id": "bangkok-category-3-mango-tango",
            "city": "bangkok",
            "slug": "mango-tango",
            "category": "로컬 디저트/카페",
            "area": "시암",
            "name": "Mango Tango (망고탱고)",
            "price": "฿100~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEr2cjsyBcOeClUbd0u4sIojUz2nsW4Ah6jPDCr4YGLUd7M0A1lnBkzjEoFXHHDbXY1QinnppuenBaCIml_wjm8Vfmi3SW5gy8=s4800-w1200"
        },
        {
            "id": "bangkok-category-3-mont-nom-sod",
            "city": "bangkok",
            "slug": "mont-nom-sod",
            "category": "로컬 디저트/카페",
            "area": "시암",
            "name": "Mont Nom Sod (몬 놈 솟)",
            "price": "฿30~120",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP0qMgMg9ba7nsQhcP8cPaAaDeoS_pid7CFQ_QF4DGKvBIB6HBe6luKrLF6PVvxMjtTs92phRXhqDXlZNkqWltjfzcCWv8_nQbYjel7A_JS9AGR6nQbgJYJcoMkiqwT3601DUOwbgefl9DCCM8lXiRqZA=s4800-w1200"
        }
    ],
    "씨푸드/레스토랑": [
        {
            "id": "bangkok-category-4-somboon-seafood",
            "city": "bangkok",
            "slug": "somboon-seafood",
            "category": "씨푸드/레스토랑",
            "area": "실롬",
            "name": "Somboon Seafood (솜분 시푸드)",
            "price": "฿300~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNiuDjd6TK8-iLCTzWa8ZQySN8EntHC2YjyMq_lvIfUaQOzyVbCIu2msQ2_dPBIt0MPlqOl1cNcHQCKePUDGVBcHmY0TxP_wCiRZzGRE2iRQkeiPdsqUCj5QUVMBZJE0ABaqkz_tIUW4TS7hiB4pavKFQ=s4800-w1200"
        },
        {
            "id": "bangkok-category-4-laem-charoen-seafood",
            "city": "bangkok",
            "slug": "laem-charoen-seafood",
            "category": "씨푸드/레스토랑",
            "area": "시암/수쿰윗",
            "name": "Laem Charoen Seafood (램차런)",
            "price": "฿300~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMzg5Eywx76AJimYLi4DRyBALVzMNum85V6lu__k1SjNrPy6fl8ZiRnU0vBehaH9XGka7VzTSKaWOH8HXdC6kVPIa6VyYop7A4qGhJUJWPvijHqOoH0hkMnJ8YVIY9qojtIyH_3t0eX1-1fIA=s4800-w1200"
        },
        {
            "id": "bangkok-category-4-sorn",
            "city": "bangkok",
            "slug": "sorn",
            "category": "씨푸드/레스토랑",
            "area": "수쿰윗(고급)",
            "name": "Sorn (손, 고급 태국요리)",
            "price": "฿3,000~8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZM64f2enTgPolFti-p22wbPlQxJLRqip90SzRVK3qgQsbTxXYvGBGJi3PZyMYCFvHVqYLbIQ8SslMkmnjU-FFnM6tDTGaTpj3IgECYlXyQM7OHEc2E8rB17yYaihK74wFPPHZnDtJ2XAJsdDBED_SSpHA=s4800-w1200"
        }
    ],
    "루프탑 바": [
        {
            "id": "bangkok-category-5-sky-bar-lebua",
            "city": "bangkok",
            "slug": "sky-bar-lebua",
            "category": "루프탑 바",
            "area": "실롬(차오프라야 리버사이드 인근)",
            "name": "Sky Bar (Lebua at State Tower)",
            "price": "฿500~2,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqG7m9yYOv2rNuUDUyEa_5w0hDJafDgHmfs5_6KjaH3u322Iek34O3uLuG9Q6PNieVc-ukkXdLYglSVxQVWkC2q6cPqKibrp5XU=s4800-w1200"
        },
        {
            "id": "bangkok-category-5-vertigo-moon-bar",
            "city": "bangkok",
            "slug": "vertigo-moon-bar",
            "category": "루프탑 바",
            "area": "사톤",
            "name": "Vertigo & Moon Bar (Banyan Tree)",
            "price": "฿700~2,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP3Vva_mYz1NW8AFCMYFPjZ0hydRFKcLqRPRpMyAI9bX2PJMDUNOKemqdXBNwU_q6wdMceKJrauEGbgQw9vTRNL691vqNdLM-KhQ6gbhN730_oLzMPKBu1fpWg2wFbuPXA9uhkGl72aGa6qJLM=s4800-w1200"
        },
        {
            "id": "bangkok-category-5-octave-rooftop-bar",
            "city": "bangkok",
            "slug": "octave-rooftop-bar",
            "category": "루프탑 바",
            "area": "수쿰윗",
            "name": "Octave Rooftop Bar (Marriott Sukhumvit)",
            "price": "฿500~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGWZXFfLLl39F-GSP5t9Y5NV5kEcAlg0qZ7b7dvEAat191O3Di-jw8FIWSyxquH3hNtxp1UQd-3aHXQ-cc6SDt8-3Hc-zojfBA=s4800-w1200"
        }
    ],
    "돈코츠라멘": [
        {
            "id": "fukuoka-category-1-ichiran-hakata",
            "city": "fukuoka",
            "slug": "ichiran-hakata",
            "category": "돈코츠라멘",
            "area": "하카타",
            "name": "이치란 라멘 하카타본점",
            "price": "¥900~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHgy9EvsLqKUQt-8sNyT7Q0IaRJWab_bfsNCvhJJiNqRwPni_fjIutHy40PdxspRsvnYfbT89NkNvririZQr8jp7pa85zaE5_M=s4800-w960"
        },
        {
            "id": "fukuoka-category-1-ippudo-hakata",
            "city": "fukuoka",
            "slug": "ippudo-hakata",
            "category": "돈코츠라멘",
            "area": "하카타",
            "name": "잇푸도 라멘 하카타점",
            "price": "¥800~1,400",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFI1wUfPISLywp_DvCsaLiQ-3Wc-AVqeERidxDoyjJHye_46sQiuuYi4x43lD_mNgisxDbYiuCXT-r968oXpGYCI5al87zjc1M=s4800-w760"
        },
        {
            "id": "fukuoka-category-1-shinshin-hakata",
            "city": "fukuoka",
            "slug": "shinshin-hakata",
            "category": "돈코츠라멘",
            "area": "하카타",
            "name": "신신 라멘(하카타)",
            "price": "¥700~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPvh2wHCOf3M0fLN5g-xUbsrdGre-fgpmjkgOTE-dvA8o670jIUYnk15eQhjA4Bkz2wdPT7FvQOsXenidIf0OBDhXGcoyIli-nWqb9azVRKbzWEkTjWnLlmeca4DflSouovXVLnuvpl1xchSbZU7_bPhA=s4800-w1200"
        }
    ],
    "멘타이코(명란)": [
        {
            "id": "fukuoka-category-2-fukuya-mentaiko",
            "city": "fukuoka",
            "slug": "fukuya-mentaiko",
            "category": "멘타이코(명란)",
            "area": "하카타(기타 상점가)",
            "name": "후쿠야(명란 전문점)",
            "price": "¥500~2,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZM61sTtRT5s5Rkjxm5H_2K0T-Z-m1FtAEGuOiJkXuBph4DYRLa6kNmz9EmykcdBcUprpIi0nBgwMjVB5ih8zLzkWryNiknse8y5fv68BsKzMGrQMJPQ9mq6qOlFKfZeus3c3JFM1tZsYKF3HQ=s4800-w1200"
        },
        {
            "id": "fukuoka-category-2-kanefuku-mentaiko",
            "city": "fukuoka",
            "slug": "kanefuku-mentaiko",
            "category": "멘타이코(명란)",
            "area": "하카타/텐진",
            "name": "카네후쿠(명란 브랜드)",
            "price": "¥600~2,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEZvfHOJHbCFuEqA_py6wIweh0hWrJQu-rC-dT3Uc2XJJPvnNirLas600ynhWRchucxtsR4hFvxfIUN6uiiYq_H4i1Kp8wsESY=s4800-w1200"
        },
        {
            "id": "fukuoka-category-2-marukyo-mentaiko",
            "city": "fukuoka",
            "slug": "marukyo-mentaiko",
            "category": "멘타이코(명란)",
            "area": "야시장/시장가",
            "name": "마루쿄 명란(지역 판매점)",
            "price": "¥500~1,800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOd20YgRBr0uAANWtSplGQ2S9u7qPo860Q2azBjuefFYndEONxe2xSFavQDDi1cMMAUYGlsiLrjMkvin4BDaFldGLdpxJ6LPBkuKZa-r2lJ-22MQeacsYxn1EO-EmLn2zPi0XiiuB8f7qdEew=s4800-w1200"
        }
    ],
    "야타이(포장마차)": [
        {
            "id": "fukuoka-category-3-nakasu-yatai",
            "city": "fukuoka",
            "slug": "nakasu-yatai",
            "category": "야타이(포장마차)",
            "area": "나카스",
            "name": "나카스 야타이 거리(포장마차 존)",
            "price": "¥500~2,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMGaR7-Ir4R0eTIMHMwmL6Z30cu48ugrhzixh0df9onVp6uG0CJgCTS9WUOzSSwmVVvcYeQmvcNZ-xYfZLcWttBBZNGQKekRo5zGiSLXBJyTRz37krVvS6iRwdORPjEnKMtHbTTkHX36TTIdQcDXTI7tw=s4800-w1200"
        },
        {
            "id": "fukuoka-category-3-tenjin-yatai",
            "city": "fukuoka",
            "slug": "tenjin-yatai",
            "category": "야타이(포장마차)",
            "area": "텐진",
            "name": "텐진 야타이 구역",
            "price": "¥500~1,800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOYnOxp5bnPdsIgNMzRPziyf4hd6miRGzrgCLXDx_Xb-YSGwvD47cSLEMToMIF99G7YnjroNOFs59NK40pO3Bq37rb_ea2jV7RSIoOsE1IqnDxdltmfaJ2P3x5oVPHef_Mtl09K-5Aev__R=s4800-w1200"
        },
        {
            "id": "fukuoka-category-3-nagahama-yatai",
            "city": "fukuoka",
            "slug": "nagahama-yatai",
            "category": "야타이(포장마차)",
            "area": "나가하마",
            "name": "나가하마 야타이·라멘 구역",
            "price": "¥500~1,500",
            "rating": "-",
            "image": "/images/food/fukuoka/category-3/nagahama-yatai/nagahama-yatai.png"
        }
    ],
    "스시/회": [
        {
            "id": "fukuoka-category-4-sushiro-tenjin",
            "city": "fukuoka",
            "slug": "sushiro-tenjin",
            "category": "스시/회",
            "area": "텐진",
            "name": "스시로 텐진점(회전초밥 체인)",
            "price": "¥100~400/접시",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOzGRem_FQzR12Avh-pLiuaMhUv4AsfGR9dOTn8FoVIj1Sdjawv84G8O4WZ0e865GQL4_Y9KMogKSe9OKmgiHm_NJwXjBm-1VxXMqxpzvEw4QkO3jFfyBfl_PXCCKiFGxDxIQQKRioFqTIiaChtbqCt=s4800-w550"
        },
        {
            "id": "fukuoka-category-4-sushi-zanmai-hakata",
            "city": "fukuoka",
            "slug": "sushi-zanmai-hakata",
            "category": "스시/회",
            "area": "하카타",
            "name": "스시잔마이 하카타점",
            "price": "¥800~3,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEEZg0XDvcY_f-pvHxq3Ibz1ZABDWDRiMFnb6zPexVxzvVi0uApRmsuqi366vq_rHGWPw8P-kQtR79DDn6p5TlhkkfwyAc5RpQ=s4800-w1200"
        },
        {
            "id": "fukuoka-category-4-yanagibashi-sushi",
            "city": "fukuoka",
            "slug": "yanagibashi-sushi",
            "category": "스시/회",
            "area": "야나기바시(어시장)",
            "name": "야나기바시 시장 내 스시/회 전문점",
            "price": "¥1,000~4,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOd20YgRBr0uAANWtSplGQ2S9u7qPo860Q2azBjuefFYndEONxe2xSFavQDDi1cMMAUYGlsiLrjMkvin4BDaFldGLdpxJ6LPBkuKZa-r2lJ-22MQeacsYxn1EO-EmLn2zPi0XiiuB8f7qdEew=s4800-w1200"
        }
    ],
    "이자카야(현지 술집)": [
        {
            "id": "fukuoka-category-5-hakata-daruma-izakaya",
            "city": "fukuoka",
            "slug": "hakata-daruma-izakaya",
            "category": "이자카야(현지 술집)",
            "area": "나카스/하카타",
            "name": "하카타 다루마(이자카야/라멘 브랜드)",
            "price": "¥700~3,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNsS9Oq27EW9_dlcE3_xWjHcpzM2B7jDBvt6V-IY46B5yNQ40_8Vb-ylmy4ke_cZIe-f3GSMIgYYZ9z4dOppleQYFudGwcm6noi1dRKqu_wp56B76pyAtopu0161-2r3Hq9JLhL-4Oiy2X7dBs8WkjSgA=s4800-w1200"
        },
        {
            "id": "fukuoka-category-5-yamanaka-izakaya",
            "city": "fukuoka",
            "slug": "yamanaka-izakaya",
            "category": "이자카야(현지 술집)",
            "area": "텐진",
            "name": "야마나카 이자카야(지역 추천점)",
            "price": "¥1,000~4,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFD3eHbPDgbCqPdUQDcTlgyMABNa_Qce5jViB9tEoiOuZk_hz45fOkjsThOGBJe3gnpHtA9b5tTveF4gXd-2GmQdZ0aVoQiHR8=s4800-w460"
        },
        {
            "id": "fukuoka-category-5-mentaiko-bar",
            "city": "fukuoka",
            "slug": "mentaiko-bar",
            "category": "이자카야(현지 술집)",
            "area": "하카타",
            "name": "명란 메뉴 전문 이자카야(지역 특화 바)",
            "price": "¥800~3,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOguSKn-JVSh-0fVn31bBCoxaMvZOV75_RkOtg8J5Ow5e4dTaOslPtgpuxsLGi9UC73YFvw-aFS7WMFrppMHw6iR7VITk-0EU68kVkDrrNrV2h82LwYUc1OHq8btQLgol2N2iKDeXLh5Kuoocaw3dAkwg=s4800-w1200"
        }
    ],
    "카페/디저트": [
        {
            "id": "fukuoka-category-6-oyatsu-cafe",
            "city": "fukuoka",
            "slug": "oyatsu-cafe",
            "category": "카페/디저트",
            "area": "텐진",
            "name": "로컬 카페·디저트 추천점(텐진)",
            "price": "¥400~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPhQYRghcuqOZx-6uu6-ynuo1f9xDKrZepvYhj5Cu8t9J9CIFfx0LH40akEcsLl8dPMsVGYQfdBst71Pi9kelBeEjxKVyFeXFvQNtHFKbpEL6rxA1zaZXjSdjgI6rABUYVsj9ctEXUG3zy5as8=s4800-w1200"
        },
        {
            "id": "fukuoka-category-6-izutsuya-cafe",
            "city": "fukuoka",
            "slug": "izutsuya-cafe",
            "category": "카페/디저트",
            "area": "하카타/캐널시티 인근",
            "name": "이즈츠야(전통 디저트류 판매점)",
            "price": "¥300~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPtXUAT0HggyQ--7AJzpFcelGk37th91S7ytWkSW5q0PdUYadw4irHH08PFRdW5B8kwz3sKjg4uLrjyRQtrwEhj1IGtM332x6zzouT7TQ5vxIwuH-LqZXGu78b-Uqn0n5l_mGEvgJbT8u3ZU7AIsa-Q=s4800-w1200"
        },
        {
            "id": "fukuoka-category-6-craft-coffee-tenjin",
            "city": "fukuoka",
            "slug": "craft-coffee-tenjin",
            "category": "카페/디저트",
            "area": "텐진",
            "name": "텐진 크래프트 커피 숍",
            "price": "¥400~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPhQYRghcuqOZx-6uu6-ynuo1f9xDKrZepvYhj5Cu8t9J9CIFfx0LH40akEcsLl8dPMsVGYQfdBst71Pi9kelBeEjxKVyFeXFvQNtHFKbpEL6rxA1zaZXjSdjgI6rABUYVsj9ctEXUG3zy5as8=s4800-w1200"
        }
    ],
    "타코야키": [
        {
            "id": "osaka-takoyaki-kukuru-dotonbori",
            "city": "osaka",
            "slug": "kukuru-dotonbori",
            "category": "타코야키",
            "area": "도톤보리",
            "name": "타코야끼 쿠쿠루 (도톤보리)",
            "price": "¥500~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFYfkrt0rlWTFWeG7UF4r4A8aBCEmUYoKviOEEjLsSckXW04OsUh5JwANPJiLJEMy384B46X3c32Xco8FYVDEX-rv29s1YzGjE=s4800-w1108"
        },
        {
            "id": "osaka-takoyaki-wanaka-dotonbori",
            "city": "osaka",
            "slug": "wanaka-dotonbori",
            "category": "타코야키",
            "area": "도톤보리",
            "name": "타코야끼 와나카 (도톤보리)",
            "price": "¥500~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNa3vO7-mCInyXzaBnqRKv1GeeyrrKTx0vp__gL9JYBpvoRiOyvVaLpxFkZTuxyGWOk89TnCVKrNmNmbyShAIS1usuzk83-uzVf9qZKRWkI3Lec4Um3_bk1AEJX-dTMvFg6SN6jeDL4-oWPo_4Wol86=s4800-w1200"
        },
        {
            "id": "osaka-takoyaki-aizuya-sennichimae",
            "city": "osaka",
            "slug": "aizuya-sennichimae",
            "category": "타코야키",
            "area": "센니치마에/난바",
            "name": "아이즈야 (센니치마에)",
            "price": "¥400~900",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEs1t943Bfs7SJ1lCDJ1AgovbfTmuOYmqFyoYKlDHNNQByQaB7T4TBQHxpgJsODC0BFIeSrQzDLGMT2pQEkw04eiVA9UPaMj1o=s4800-w1200"
        }
    ],
    "오코노미야키": [
        {
            "id": "osaka-okonomiyaki-mizuno-dotonbori",
            "city": "osaka",
            "slug": "mizuno-dotonbori",
            "category": "오코노미야키",
            "area": "도톤보리",
            "name": "미즈노 (오코노미야키, 도톤보리)",
            "price": "¥1,000~2,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqF2MsTZXAT8n3aTOGXLePSHW55p206G7o1RK9wIp2pJPjGa3H0THjml1p4SnFjZgE569fO1HMxbicgvnl5ojJs7ukNUXfRVWLo=s4800-w1200"
        },
        {
            "id": "osaka-okonomiyaki-chibo-dotonbori",
            "city": "osaka",
            "slug": "chibo-dotonbori",
            "category": "오코노미야키",
            "area": "도톤보리",
            "name": "치보 (Chibo, 도톤보리)",
            "price": "¥1,000~2,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqErW3NLr8HU9r0_hfYcHcJ2V-TwRtn2rV_RuOOrp_QswgULKYLzJ_Xq_xJnn2E3BNHKNsVbsJDk1jUdBUNaDTDJ-Gh5kLan2YM=s4800-w1200"
        },
        {
            "id": "osaka-okonomiyaki-kiji-umeda",
            "city": "osaka",
            "slug": "kiji-umeda",
            "category": "오코노미야키",
            "area": "우메다",
            "name": "키지 (오코노미야키, 우메다)",
            "price": "¥1,000~2,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMBnfUev34mYVAJRNM71JHXG9btf9BqWd5YDQU4P1lie0zU3u91w4oN57wm0Ac63myBh0UNvZhHDnOLTaMgagpK_XaXE5emXGW80pfRMiRMODu2vfvvzgJGILEXW5UFixZqyw5k3m630dNEuLl_PBfaXQ=s4800-w1200"
        }
    ],
    "라멘": [
        {
            "id": "osaka-ramen-ichiran-dotonbori",
            "city": "osaka",
            "slug": "ichiran-dotonbori",
            "category": "라멘",
            "area": "도톤보리",
            "name": "이치란 라멘 (도톤보리)",
            "price": "¥800~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOPbd5nCIZ5aAU1eRKAy8r_GxtFa0iQKdV5yiTRUfUuHWG3IiDQ4VEt_0d4RwTzvAm_GiC7kKH1wx0aw4qFpraj1gZ10XU3QPNp7eTnVLjWhC75JWc2-LQQlH3SuxqBR-BvTbDZHaPetQDByQ=s4800-w960"
        },
        {
            "id": "osaka-ramen-kinryu-dotonbori",
            "city": "osaka",
            "slug": "kinryu-dotonbori",
            "category": "라멘",
            "area": "도톤보리",
            "name": "킨류 라멘 (도톤보리)",
            "price": "¥700~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMu5wU37IYOJl4EaBKUnBqvW46GVXrBKbls3t-d50eXfiT1osu6Kwi92ePNXbSMBr1qLH1VDO3OF3S5-YLmUcG5R6AE1M0FwXUuMLjvnc-upYMRbFi5TzAigUFAzKGibNADKhchAhT5pC9l23IakgGaPA=s4800-w1200"
        },
        {
            "id": "osaka-ramen-ippudo-umeda",
            "city": "osaka",
            "slug": "ippudo-umeda",
            "category": "라멘",
            "area": "우메다",
            "name": "잇푸도 (우메다)",
            "price": "¥800~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFDofQnyA09RbQRzS5O6bUuw_HxgqoXRcx3JE1KawZigGAIEQ_ZchyWlMnHrez6hC_Pii7mFa7SJiS7t8hUzjVQ3d-NGN5Qzqo=s4800-w760"
        }
    ],
    "스시": [
        {
            "id": "osaka-sushi-endo-central-market",
            "city": "osaka",
            "slug": "endo-central-market",
            "category": "스시",
            "area": "오사카 중앙도매시장",
            "name": "엔도스시 (오사카 중앙도매시장)",
            "price": "¥1,500~3,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPFS_YcmBqHTxeWKqRuOYMcTHzatD4VSr_00ddzqJUQzE2kAnigQZ4U6NFeMJR3hbNOaPpyCcTXRuo6dQtCxromGxjKo550ThUeQjo1XI3IRLQPBoskxhK5qDBiq2N0_OGBOk4zDCknsjG6YANtEtSI=s4800-w1200"
        },
        {
            "id": "osaka-sushi-sushizanmai-dotonbori",
            "city": "osaka",
            "slug": "sushizanmai-dotonbori",
            "category": "스시",
            "area": "도톤보리",
            "name": "스시잔마이 (도톤보리)",
            "price": "¥1,000~3,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqG44k48Jw5yEnUw5mGLhHefZdwUS_HM75jfRiA_-aH2vC6BFYlKx_4FiJ0vyu4xj-lhg6ueMgVduG5lDdrBTWEl9BPLIqqK-b8=s4800-w1200"
        },
        {
            "id": "osaka-sushi-harukoma-tenjinbashisuji",
            "city": "osaka",
            "slug": "harukoma-tenjinbashisuji",
            "category": "스시",
            "area": "덴진바시스지",
            "name": "하루코마 스시 (덴진바시스지)",
            "price": "¥1,000~2,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNbkX6zJiAdz-_Ml2s8KXZV7qWc0Oy5NLzTzVTNoL-NMmxk4j0iu_T-c22OlLFfRAOQlCHiy22KlQzfU9lMxMyLSPXjc1GTl2Vnizelt9vSVvfhT9LoE-5trgSYY6P5l4OLeYJpnVuC09JV8A=s4800-w1200"
        }
    ],
    "쿠시카츠": [
        {
            "id": "osaka-kushikatsu-daruma-shinsekai",
            "city": "osaka",
            "slug": "daruma-shinsekai",
            "category": "쿠시카츠",
            "area": "신세카이/텐노지",
            "name": "쿠시카츠 다루마 (신세카이 본점)",
            "price": "¥600~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFiURfAEjTm-3Y34ZNKKj9blALxL3AIrYFO060EsHO6o_Itd5cOVbWPzEd1S-G7oMWYUMVYMT9MmSjUw9Cn_5b0A6SzocFjHpk=s4800-w681"
        },
        {
            "id": "osaka-kushikatsu-kushikatsu-tanaka-shinsaibashi",
            "city": "osaka",
            "slug": "kushikatsu-tanaka-shinsaibashi",
            "category": "쿠시카츠",
            "area": "신사이바시",
            "name": "쿠시카츠 타나카 (체인)",
            "price": "¥700~1,800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEgj8MPo3UmwfVOeeNZm0Bi4MZ0xzSvPiHBH_OuCFPVB1nxtkpwVT0z9ZmNIvyShLN-bwykjEehzqBby2L2ozfIqdIPpwWM-nI=s4800-w1200"
        },
        {
            "id": "osaka-kushikatsu-yokozuna-shinsekai",
            "city": "osaka",
            "slug": "yokozuna-shinsekai",
            "category": "쿠시카츠",
            "area": "신세카이",
            "name": "쿠시카츠 요코즈나 (신세카이)",
            "price": "¥600~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqG9_TL505Ub9YSuJT-EZwoxIw9rZ0DKH0Vbz92rLn-wOYgQUbj5Pt7mYOi7dhoBBwLMdCNp1SW62v-O-iPW7ySyLgmGSRuPWfA=s4800-w1200"
        }
    ],
    "시장·길거리 간식": [
        {
            "id": "osaka-category-6-kuromon-ichiba",
            "city": "osaka",
            "slug": "kuromon-ichiba",
            "category": "시장·길거리 간식",
            "area": "구로몬 시장/난바",
            "name": "구로몬 이치바 시장",
            "price": "¥300~2,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPfKPRrjdWPCY2uJfcLGIE9TChTm5knyhO3kYeKSVJ-Nd4NJk4BMenf7YFYFhAgkNqAdNwaGgLLLx1qwxAaagQ9xa6RSjNINvrm7bDW5w-DxQy6slkXbRtk2IUy_mKsYwtF9QPDlCzlR5HL=s4800-w1024"
        },
        {
            "id": "osaka-category-6-dotonbori-street-food",
            "city": "osaka",
            "slug": "dotonbori-street-food",
            "category": "시장·길거리 간식",
            "area": "도톤보리",
            "name": "도톤보리 길거리 음식 존",
            "price": "¥300~2,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHSsG3N7A-jMyiQjoGz3fBHFja3RHa-gZ_ZXgQb4V3Maq_eA2-oT8Ds2oKolzLwd80JTH80KWlvqW5rEL2po4rXklvZeu7IV7A=s4800-w1200"
        },
        {
            "id": "osaka-category-6-shinsekai-food-alley",
            "city": "osaka",
            "slug": "shinsekai-food-alley",
            "category": "시장·길거리 간식",
            "area": "신세카이",
            "name": "신세카이 먹거리 골목",
            "price": "¥300~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFiURfAEjTm-3Y34ZNKKj9blALxL3AIrYFO060EsHO6o_Itd5cOVbWPzEd1S-G7oMWYUMVYMT9MmSjUw9Cn_5b0A6SzocFjHpk=s4800-w681"
        }
    ],
    "야시장 간식": [
        {
            "id": "taipei-category-1-shilin-night-market",
            "city": "taipei",
            "slug": "shilin-night-market",
            "category": "야시장 간식",
            "area": "스린구",
            "name": "스린 야시장 (士林夜市)",
            "price": "NT$ 50~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP7pFHVHswSMOJoY4PLRWCO4RAXjpLHY1QWYGTb9nbkkfQf8yqT6mlwGVXPW_bLbgDemKtXJig4XNdzfT8JSkE-Zw8gknTWSwlF0HkIAMUSSLqE8uPFmMn2QlJzySPypYEdelt24vhBSEo2mQ=s4800-w1200"
        },
        {
            "id": "taipei-category-1-raohe-night-market",
            "city": "taipei",
            "slug": "raohe-night-market",
            "category": "야시장 간식",
            "area": "송산구",
            "name": "라오허 야시장 (饒河街夜市)",
            "price": "NT$ 50~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNbtg8K08FDxynxpx2OhlKZkHc7v36y00xcFIgSwRJ4rWlG0NOmAUXzcwwgWCeymmXyhj0zc1ED-Ch0-LGDzhG3lOVyOhDwD9WdiTYFR_o0WcARs87RkDCtiLlhwaAS1Tns-GNFSmCUrTxWnWE66Cpp=s4800-w1200"
        },
        {
            "id": "taipei-category-1-ningxia-night-market",
            "city": "taipei",
            "slug": "ningxia-night-market",
            "category": "야시장 간식",
            "area": "대동구",
            "name": "닝샤 야시장 (寧夏夜市)",
            "price": "NT$ 50~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNlAE5ZPPbB4I7Neds1uaDhen8EQ59N2lFCcFtb4p1FZ2NUiF2EbCBkER9y1qfAUbdtU-0P2EOOhkYQ6fAmF4JuLBS3Y8eiqrU4Y63U1mQF9Ei6KlPFMW1XfswC6FSzLkARcrxB2ZEkW7cL74U=s4800-w1200"
        },
        {
            "id": "taipei-category-1-hot-star-large-fried-chicken",
            "city": "taipei",
            "slug": "hot-star-large-fried-chicken",
            "category": "야시장 간식",
            "area": "스린구",
            "name": "핫스타 대왕치킨 (豪大大雞排)",
            "price": "NT$ 80~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPmY6lx6VXR9FIk11EUVZf3-QLcBGwK8I_fG-8yush5rsjCWYVLiqtE7_6q0tZ4rh8oBAySGQIktxGDaB6eWwqI2tiyny1LB52u-mIeQYD-BgxcTHgoFKJeZh0u5xljAHxiPoRYNPn6SN8khr5hrnxUTw=s4800-w1200"
        }
    ],
    "소롱포·딤섬": [
        {
            "id": "taipei-category-2-din-tai-fung-yongkang",
            "city": "taipei",
            "slug": "din-tai-fung-yongkang",
            "category": "소롱포·딤섬",
            "area": "대안구",
            "name": "딘타이펑(永康점, 鼎泰豐)",
            "price": "NT$ 300~800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNu_2MfIwRmrQlOKvH0TMypkZ52SIBuqTwI2LFd_H5_F0ESwaszSmNY1HRxvXBplrn3SzWI4J-2g4fSy8qcdrWqmbPnPeN8uTF16qySHZG4IAyAmtD-h4dZXhMH_Tn3pTSoXYsjgpvBDQDTxg=s4800-w1200"
        },
        {
            "id": "taipei-category-2-din-tai-fung-taipei-101",
            "city": "taipei",
            "slug": "din-tai-fung-taipei-101",
            "category": "소롱포·딤섬",
            "area": "신이구",
            "name": "딘타이펑(타이베이101점, 鼎泰豐)",
            "price": "NT$ 300~900",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZM8S9Q2-VCMbmhLT5_JGU0OfATLw3Snmr9B7zvNctcqphZ3L1sChBhHSDuIC_2fVk0-As_afr364vt-lZ8ulZLaoWq5gi9YlHaUdW07I2VuIrmYjVHK7aOiJB8pWQVImNPGDf02bUyjZIk0_Ce3zC9c9Q=s4800-w1200"
        },
        {
            "id": "taipei-category-2-dian-shui-lou",
            "city": "taipei",
            "slug": "dian-shui-lou",
            "category": "소롱포·딤섬",
            "area": "중산구",
            "name": "점수루(點水樓)",
            "price": "NT$ 300~800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNFcoXdEvU6b6zlhC1NZT_i9KODXYlGiMroT6SGSLarxLoOzsnAVId8bVHQWolYKhVV-MiI555e95uswmYQAyHDUn4H6oVtl_HcwLp2ntPFrTSR-UnzTxIkv2mQSfD75FomTeb4XShD-jTHxswPNAN_JQ=s4800-w1200"
        }
    ],
    "국수·면요리": [
        {
            "id": "taipei-category-3-ay-chung-flour-rice-noodle",
            "city": "taipei",
            "slug": "ay-chung-flour-rice-noodle",
            "category": "국수·면요리",
            "area": "시먼딩",
            "name": "아종면선 (阿宗麵線)",
            "price": "NT$ 60~150",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNyoZDbrGR9N4-juDapahLTX80Jpic1svRRu2pmhSFsUE7PPZ40--TycscKte8oG9fgGfmhWmmTKnB_X35FQs3mUSADOO_PfdbK01ciKGGBBHJSf5zorydTvlmvD6agHy6XFazH8GCAPnN8SzY=s4800-w1200"
        },
        {
            "id": "taipei-category-3-lin-dong-fang-beef-noodle",
            "city": "taipei",
            "slug": "lin-dong-fang-beef-noodle",
            "category": "국수·면요리",
            "area": "중산구",
            "name": "린둥팡(林東芳) 소고기면",
            "price": "NT$ 200~500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNPUom8LJr49-CVuv5PvdqrBJlEuGSW0fZtlvykggjO94_3dwVsWxbkIbWmr_gaPJTTUFHTuiRi0J_y4fiItAZk6iwG_wz5kknaPogxG-oBvVmYyYZf4k6Kh06SmeGzcr-9HMyUUkprfo4K=s4800-w1200"
        },
        {
            "id": "taipei-category-3-yong-kang-beef-noodle",
            "city": "taipei",
            "slug": "yong-kang-beef-noodle",
            "category": "국수·면요리",
            "area": "대안구",
            "name": "용캉 소고기면 (永康牛肉麵)",
            "price": "NT$ 200~600",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMn_x1US9RZeny9Y79505bAK730PNBEPj4yZJSJqxnpTurpqEYSx7LPDD-X6NWelvj5v8XdJaJZsZ962JZm33LqaWzeD6WfVxGOXH_2clYsl7UWMXbV622-yshU4lpdXK-hIckHbkxBnq9mJtg=s4800-w1200"
        }
    ],
    "루로우판·대만 덮밥": [
        {
            "id": "taipei-category-4-jin-feng-lu-rou-fan",
            "city": "taipei",
            "slug": "jin-feng-lu-rou-fan",
            "category": "루로우판·대만 덮밥",
            "area": "중정구",
            "name": "진펑 루로우판 (金峰魯肉飯)",
            "price": "NT$ 50~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPtho7FiS2BDAwf8pjEBY7qA-tLcbwC41XUtTPdmDus7tNju2KaCfpB7G7BdU7XchslVsvduqhSqZ3UYx4ByPCtgULz9A95PowaaqVHJMLHSp2DmnQqyM0HzJ5LM56MVdpnxRVnczJ5n4XhjiiyHOQB=s4800-w1200"
        },
        {
            "id": "taipei-category-4-formosa-chang",
            "city": "taipei",
            "slug": "formosa-chang",
            "category": "루로우판·대만 덮밥",
            "area": "여러지역",
            "name": "포모사창(鬍鬚張) – 체인",
            "price": "NT$ 60~250",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEX8SJdTAvop_pHltNTB9AvXjJp8AR6figUuAHMSL_NzPxLnB0z5pa0vUTEDoqXHSukdT3K-awNW28HPXkefMd9rQK6ugP7WVY=s4800-w935"
        },
        {
            "id": "taipei-category-4-lu-mama",
            "city": "taipei",
            "slug": "lu-mama",
            "category": "루로우판·대만 덮밥",
            "area": "대동구",
            "name": "루마마(지역 유명 루로우판 가게)",
            "price": "NT$ 50~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOTeFzbh8kVd_Nx90ijBOHcMsw6aAp_uqe5os6aZCfV_aNiZA83I-WvkHhLIaHeCLvamOQ0mBKcfpZ47su29Tub-6dBZ5HVyqrF7LoCb8bGZ8VAZc7jOzaCAO_JLIpRoSfAliXRsAcR9N4drQ=s4800-w1200"
        }
    ],
    "버블티·디저트": [
        {
            "id": "taipei-category-5-chun-shui-tang",
            "city": "taipei",
            "slug": "chun-shui-tang",
            "category": "버블티·디저트",
            "area": "중산구",
            "name": "춘수당 (春水堂) - 버블티 원조계열",
            "price": "NT$ 80~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMSiqKsc0zrn5Sz3L7vwCd7Bv0jlb5jKDMi5U8PPBMBdY3MEeG0a3fA1x1HmR0abxgxkH7KyYlPMRDZe5muR23KtaXRfpX0yf8MwATbP2Xa54B5fvn4_URmJKrGVahb6d9W-Coym4h9Mqy2pI4=s4800-w1200"
        },
        {
            "id": "taipei-category-5-ice-monster",
            "city": "taipei",
            "slug": "ice-monster",
            "category": "버블티·디저트",
            "area": "대안구",
            "name": "아이스 몬스터(冰館) - 망고 빙수",
            "price": "NT$ 150~500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNQ2BaPNDnGRYM8Vn2Zsq2tfec_3MZQe2fHwERn82gK2csHQZOtCR8xyHc4HwR2B3ZMGkb292VZgwFTIvWs2DAa8zUJKHtobADeJopt-MvDx05mIjwUAJR5JeOgKj7dY5WMEl1VdnKVQt0k5Q=s4800-w1200"
        },
        {
            "id": "taipei-category-5-meet-fresh",
            "city": "taipei",
            "slug": "meet-fresh",
            "category": "버블티·디저트",
            "area": "여러지역",
            "name": "미트프레시(鮮芋仙) - 전통 디저트 체인",
            "price": "NT$ 80~300",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNqh0J3dS6IPIuEV23zFAyXwK8rncFaTEZoX_x6jXudJO-_8agingVE_ZHALSGeN246Oi_2kgYk5_KlQ57oBB6Qev9NkBsnK3_fV7sFB5o3PhYFGg2pk4S4aShzKBPthYtvQd_X2xLRjAeQfavH8CvgNg=s4800-w1200"
        }
    ]
};

export const generatedTourPlaceCardsByCategory: CardsByCategory = {
    "사원 & 역사": [
        {
            "id": "bangkok-and-grand-palace",
            "city": "bangkok",
            "slug": "grand-palace",
            "category": "사원 & 역사",
            "area": "왕궁",
            "name": "왕궁 (Grand Palace / 와트 프라깨오 인근)",
            "price": "฿500~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPkIHSdc3FEWFN4oRVtcjnKcPVtb8hQQhGmVybF4d5Yfqlavd_VAtVl_Q9La9c96MsmJjbnvG3bZCOE8dKo8GBp35z-z1wTwSTTAWsMOXzQCneQzWwiVo06lx2_atSHEiowo1Nt9JRVTL3ahw=s4800-w1200"
        },
        {
            "id": "bangkok-and-wat-pho",
            "city": "bangkok",
            "slug": "wat-pho",
            "category": "사원 & 역사",
            "area": "왕궁 근처",
            "name": "왓 포 (Wat Pho, 누운 불상)",
            "price": "฿200~400",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZO3neceQQqIuHQbVdycKbrxr6ObV8-vPBTr8aZOz_GocNKqctiiHZxgTw-f7Xb8rqghd3Hce65RBdDwy62JuXuQlBsZIh8hssI3Ot3blgzYDN_XIjogTml899SjWwRXUO_sHWPDk73GsPqsYA=s4800-w1200"
        },
        {
            "id": "bangkok-and-wat-arun",
            "city": "bangkok",
            "slug": "wat-arun",
            "category": "사원 & 역사",
            "area": "차오프라야 강변",
            "name": "왓 아룬 (Wat Arun, 새벽사원)",
            "price": "฿50~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNSlwLpl_thh6WlkGKAdYYyAFussCRjrMrl90NollBefl_iTaqEyfSui_9-4Fqc_ttzCmAN5HQ0bItnPrkPoJ4lb7v6-cDJs3lohSCZxvOu_Bqpc0H7flpTWsJB6RDKPd8fj1UhcTzqStu0Lv4=s4800-w1089"
        },
        {
            "id": "bangkok-and-jim-thompson-house",
            "city": "bangkok",
            "slug": "jim-thompson-house",
            "category": "사원 & 역사",
            "area": "시암",
            "name": "짐 톰슨 하우스 (Jim Thompson House)",
            "price": "฿150~400",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZN55C1CxsMDz8-oiuocWfOGG-40n_POYo1sJ3L-GRks4zll80YfSZSnjkdb98SeG7cgsmv7SJQjYRNksfKM6zD2HavSwnwy9zXSyFN1XgGPkLKCAVH04GtWGe3ng3Yp2VLikV9LBpuXbBUzWQ=s4800-w1200"
        }
    ],
    "SNS명소": [
        {
            "id": "bangkok-sns-mahanakhon-skywalk",
            "city": "bangkok",
            "slug": "mahanakhon-skywalk",
            "category": "SNS명소",
            "area": "시내(차웽끄시/촹농시 인근)",
            "name": "마하나콘 스카이워크 (Mahanakhon Skywalk)",
            "price": "฿800~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMRntheTlMr5C-XYmTwRxBFxkD0wLFT_6MuemPmZpBzan9hpu49ZV-3t47u3ivzvI_gQCzR5ne71CsYFkLuOVrOXWYuo9Br8gnU0gN6CnBDWm-PbLZpdjgwtA6j1K5AO79nWN2yJsxIGYP-FQ=s4800-w1200"
        },
        {
            "id": "bangkok-sns-pak-khlong-talat",
            "city": "bangkok",
            "slug": "pak-khlong-talat",
            "category": "SNS명소",
            "area": "차오프라야/리버사이드 근처",
            "name": "팍클롱 탈랏 (꽃시장 - Pak Khlong Talat)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMZB54zor06tQThvoMEN-vV7UZBksNC6ckZ6TrRGdT0HdrRUI2qrqc0b9edCxrUSeMhDqOcvzmJjHDHF182GQi_haweAY32-2k3hwb8wOOVw6-j0jD70oFg66S9GQVqm1M-3oFiDOWpsqev=s4800-w1200"
        },
        {
            "id": "bangkok-sns-asiatique-the-riverfront",
            "city": "bangkok",
            "slug": "asiatique-the-riverfront",
            "category": "SNS명소",
            "area": "차오프라야 리버사이드",
            "name": "아시아티크 (Asiatique The Riverfront)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNxHAPEwCa5JLjFVvGkOI71a2qcbukIFycfdB7iK13L-z8p-ZXcIBvkk4Ap8FjS21dHLiXT9sho8_9VXeEHwkuDa5b9ejkkIK5vtnOkUCENwGM2yLhxgP-LL5bgL5GWxJ9JGcEeD4-w3Ot-S50=s4800-w1200"
        },
        {
            "id": "osaka-sns-dotonbori",
            "city": "osaka",
            "slug": "dotonbori",
            "category": "SNS명소",
            "area": "도톤보리",
            "name": "도톤보리 (글리코 사인 등)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMELQqxh3MYx8Oh5UNi7bHkjvPGql3el2pE4amtb_byEjROW1NvAxVlWlw22LpeObk7lvj05ogQ9aiphCJUnapwcV6zTEl2RpYLuWN8aFIIf57TKps80mXoNaeXtjsfvzBSi1heslfTJztPew=s4800-w1200"
        },
        {
            "id": "osaka-sns-umeda-sky-building",
            "city": "osaka",
            "slug": "umeda-sky-building",
            "category": "SNS명소",
            "area": "우메다",
            "name": "우메다 스카이 빌딩 (Floating Garden Observatory)",
            "price": "¥1,500~2,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMWkNvEDJriY04BuUG8C4sNpACstxYszdTy9J8BTk8RI5lXGzigdSCzfKFW4Gpy2nsLLX8UyIgoU-enKKt4Dm1niyQDFvvL7vl8yIB64bPKgXV2yyhF75fEKl73uFa__Er2YJcEeFcg4VVH5Q=s4800-w1080"
        },
        {
            "id": "osaka-sns-tsutenkaku",
            "city": "osaka",
            "slug": "tsutenkaku",
            "category": "SNS명소",
            "area": "신세카이",
            "name": "츠텐카쿠 타워 (Tsutenkaku)",
            "price": "¥700~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMFvSxp9UGl1_OdDdTzZ0zDsdnvUhglNVuMaDxMhcKcypSs8FW7zRZahNgfqS--ZyOdMpQbsD9ZD8Tw2vOV_t2LPZ1zPXJGY6gh2MoaCXXAPtmMSxRRaHFjBC8PV9vdbMizlzIkNP86_Rtr5ESLLUzbBg=s4800-w1200"
        }
    ],
    "시장 & 야시장": [
        {
            "id": "bangkok-and-chatuchak-weekend-market",
            "city": "bangkok",
            "slug": "chatuchak-weekend-market",
            "category": "시장 & 야시장",
            "area": "짜뚜짝",
            "name": "짜뚜짝 주말시장 (Chatuchak Weekend Market)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMlqdw2j3_wORmX6IFWI--1N2iqBkbnr4H6V3FYR5JG4E-ic8NCeFcXVhFdOoyUMhhrFnV-3xZRGitBiFxPIYFAFvI0WZtrdrPYWOLGuH59VzreLjHFJVW1TVuYZWcFbb983SccBDXEeP8b4MyvXPLI_w=s4800-w1200"
        },
        {
            "id": "bangkok-and-ratchada-train-night-market",
            "city": "bangkok",
            "slug": "ratchada-train-night-market",
            "category": "시장 & 야시장",
            "area": "라차다",
            "name": "랏차다 트레인 나이트 마켓",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEHtBdj4fO-Xx7il32EIvR_N0OzK9a_7pxn0-7uOOrqte53s_NqoEam9P6zbMSJdt6QAlZOg_gqtVxHrmBL9HoyGIQAQ0OIcoY=s4800-w960"
        },
        {
            "id": "bangkok-and-damnoen-saduak-floating-market",
            "city": "bangkok",
            "slug": "damnoen-saduak-floating-market",
            "category": "시장 & 야시장",
            "area": "담넌사두억(근교)",
            "name": "담넌사두억 수상시장 (Damnoen Saduak)",
            "price": "฿0~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZO7SOrCS33JMavAfzcupckJrVBhWbZWV7URhoRIFT3Xe6Zbbp-tE8XWZyiQh5fZV1O8N379VSsz3OXJ10DwZo85zAlvREoLKh8OqurCG15btt1R6-lGBPzGFet21VkOIgCJLmtge554Ixmvyus=s4800-w1200"
        },
        {
            "id": "bangkok-and-amphawa-floating-market",
            "city": "bangkok",
            "slug": "amphawa-floating-market",
            "category": "시장 & 야시장",
            "area": "암파와(근교)",
            "name": "암파와 수상시장 (Amphawa)",
            "price": "฿0~200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNeUFFTR5KAL7M6WTKyJ6UCnBH5edlPSxCDNoYSYh4hwCzErP18cz3DkRh32wroPGm_2C8IKhllKQZZ_BMpsPwc4z6PA2KDLHZc9ktbxf2crBdZR5OIhAudLCmMcWoiXw5g2eRy94spjTyW=s4800-w1200"
        }
    ],
    "근교 당일치기": [
        {
            "id": "bangkok-category-4-ayutthaya",
            "city": "bangkok",
            "slug": "ayutthaya",
            "category": "근교 당일치기",
            "area": "아유타야(근교)",
            "name": "아유타야 유적지 (Ayutthaya)",
            "price": "฿0~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNS4liU2aqCQAl72oxTPCDufEwEKRA-eacVYcFUz0Xz2SN7NZ2PUOGYNO1hslxYQAm7lOJKM9uC5_WmWDGT1T_Y1W1xDygi40t_H1IlVrTX_XwfOQhr_N54rQLf2kFZ7nPluhSKIfhtJqeUww=s4800-w1200"
        },
        {
            "id": "bangkok-category-4-amphawa",
            "city": "bangkok",
            "slug": "amphawa",
            "category": "근교 당일치기",
            "area": "암파와(근교)",
            "name": "암파와(Amphawa) 당일치기",
            "price": "฿0~800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNeUFFTR5KAL7M6WTKyJ6UCnBH5edlPSxCDNoYSYh4hwCzErP18cz3DkRh32wroPGm_2C8IKhllKQZZ_BMpsPwc4z6PA2KDLHZc9ktbxf2crBdZR5OIhAudLCmMcWoiXw5g2eRy94spjTyW=s4800-w1200"
        },
        {
            "id": "bangkok-category-4-kanchanaburi-erawan-falls",
            "city": "bangkok",
            "slug": "kanchanaburi-erawan-falls",
            "category": "근교 당일치기",
            "area": "깐짜나부리(근교)",
            "name": "깐짜나부리 & 에라완 폭포 (Kanchanaburi / Erawan)",
            "price": "฿0~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNyj5nnYbveXQHZIN1EEh2iM7v2EOjGVD16ivle2AtbHYgEa7-OOAnoY0RPyAIGk9tmQDAv-U8Ga3ieYZdsv7dnqg0Ub4jZ2m5y3wZxsHoSi9hzfkviWJ4ft8tU3Qn7vSZ4bb_MnKUCrQd6-A=s4800-w1200"
        }
    ],
    "역사/사찰": [
        {
            "id": "fukuoka-category-1-kushida-shrine",
            "city": "fukuoka",
            "slug": "kushida-shrine",
            "category": "역사/사찰",
            "area": "하카타",
            "name": "쿠시다 신사(櫛田神社)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNua9wp9d21-XfiJBAoTj0m1HBilOAY6h3pmj1kvImeM2fr4KxEpbVsLwJhiSl-VAnF1YGmXP-ZRcvYe1g9mHfsAuAqGEcMcsBBnS7HXWZHze3_jqitA8eL2yKzu7vOGGvyg1aoObrkzJTFbeE=s4800-w1200"
        },
        {
            "id": "fukuoka-category-1-tochoji-temple",
            "city": "fukuoka",
            "slug": "tochoji-temple",
            "category": "역사/사찰",
            "area": "하카타",
            "name": "도초지(東長寺)",
            "price": "무료~¥300(내부 관람 여부)",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPrpsamX3smhHD8uKTIuCYFWIth6xzOHRVLp0lN1GsoMwlckB2i7B5j-xzRM_6uQwRPuMPr3HTRprgNQyvEanJssS113-F2oTj3eeArN2Pg9PHDp3YSQ-yJqEv7MpCd4plXSK4_kXZ0u8Q2k7qgWYUpCQ=s4800-w1200"
        },
        {
            "id": "fukuoka-category-1-shofukuji-temple",
            "city": "fukuoka",
            "slug": "shofukuji-temple",
            "category": "역사/사찰",
            "area": "하카타",
            "name": "쇼후쿠지(일본 최초의 선사)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZO7UhBEy4c1rYA286ZGSTGY9A2FNBJHsrUdPNH59h-LfoqwG4TyRuOOdbmPpYv2BHp-eBlVVFMMsp4UFRNiNM7jEpBi2mZS1Gmxmht0STdW7KvzfTutfDiStd02-DXN4YegAg7MnOa-9vgrtVY=s4800-w1200"
        }
    ],
    "SNS 명소/풍경": [
        {
            "id": "fukuoka-sns-ohori-park",
            "city": "fukuoka",
            "slug": "ohori-park",
            "category": "SNS 명소/풍경",
            "area": "오호리 공원",
            "name": "오호리 공원(大濠公園)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOC9WaeDiEYICXM_3FeRr8_8vV-xUvDNgJ9agVRrDXz4eGr3LgnxbCpHYCZu0M3mdldGNQEGumHJTr7KxkHk7uVyjSGzSYpow3Gm7nMEcrI3bGM7jbjAFMGm0-gOC4MH8nw2zpC4GD2sAxA6g=s4800-w1200"
        },
        {
            "id": "fukuoka-sns-fukuoka-tower",
            "city": "fukuoka",
            "slug": "fukuoka-tower",
            "category": "SNS 명소/풍경",
            "area": "모모치 해변",
            "name": "후쿠오카 타워",
            "price": "¥800~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZODUxjG5_MF8l9KAyrZvor5ZbfyyNSp75s8kT9rFkEKc-2sDfOBJqxe-BRbdghag5jRhE1aEdrqqGJ17uhId2aCD8TxDBw55ECNlZgzMs15vpyGbfRF_U3FJ5Ke84DxTCOkWOjXYxlQziscpjG_EzWlAA=s4800-w1200"
        },
        {
            "id": "fukuoka-sns-canal-city-hakata",
            "city": "fukuoka",
            "slug": "canal-city-hakata",
            "category": "SNS 명소/풍경",
            "area": "하카타/텐진 인근",
            "name": "캐널시티 하카타(쇼핑·분수광장)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPtXUAT0HggyQ--7AJzpFcelGk37th91S7ytWkSW5q0PdUYadw4irHH08PFRdW5B8kwz3sKjg4uLrjyRQtrwEhj1IGtM332x6zzouT7TQ5vxIwuH-LqZXGu78b-Uqn0n5l_mGEvgJbT8u3ZU7AIsa-Q=s4800-w1200"
        }
    ],
    "근교/소도시(당일치기)": [
        {
            "id": "fukuoka-category-3-dazaifu-tenmangu",
            "city": "fukuoka",
            "slug": "dazaifu-tenmangu",
            "category": "근교/소도시(당일치기)",
            "area": "다자이후",
            "name": "다자이후 텐만구",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP7M-co5fMmRvIfROFz-PfGth0S13JJPS4xSt8ymXfF3JJokemnPaDoSYdu06rXt3GaKS6QWBaM3yGeBiF4P6k5GAPTFdpBUUN56YHD75RA7X8nJSW_AVzB7Nxwrf6c1cy3ty3bOrUBZ2qE1A=s4800-w1200"
        },
        {
            "id": "fukuoka-category-3-yanagawa-barges",
            "city": "fukuoka",
            "slug": "yanagawa-barges",
            "category": "근교/소도시(당일치기)",
            "area": "야나가와",
            "name": "야나가와 운하 배투어(드라곤보트 등)",
            "price": "¥1,000~3,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqG7R-yXXbD0SWukWGKxPKp3E7Xa5MksiOi8dmeLyJlovLZM9KfM2iD0LMtrxTpCgS2kdlVR_t12M2qe3z2JnL_mWFZ85DvMN34=s4800-w1200"
        },
        {
            "id": "fukuoka-category-3-itoshima-beaches",
            "city": "fukuoka",
            "slug": "itoshima-beaches",
            "category": "근교/소도시(당일치기)",
            "area": "이토시마",
            "name": "이토시마 해변·카페 지역",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNIgjTLSqE0vH4jX4uQwybjuBf2-jPrsmz9GqlIpquL8UQ4alVR7Cs-Qe5WEe-_NLQRqGHfIFejGQ24WgpRh3VGa8NZ2UdpFsX-AiCGYxFASaT4Z1YDtKOKLx_eOzgi7S_r6WgXd76H1TEkhA=s4800-w1200"
        }
    ],
    "박물관/문화시설": [
        {
            "id": "fukuoka-category-4-fukuoka-asian-art-museum",
            "city": "fukuoka",
            "slug": "fukuoka-asian-art-museum",
            "category": "박물관/문화시설",
            "area": "하카타/텐진",
            "name": "후쿠오카 아시아미술관",
            "price": "¥300~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqECccEv4vNg-2EHYx07z-Xm6aG0XAQy_fa_FaZoOZGkLadyd-CEnpR-8oglzz_50e0T17a-u8fvO7BLpywaLWdS_fNSooLgNQI=s4800-w1200"
        },
        {
            "id": "fukuoka-category-4-kyushu-national-museum",
            "city": "fukuoka",
            "slug": "kyushu-national-museum",
            "category": "박물관/문화시설",
            "area": "다자이후",
            "name": "규슈 국립박물관(다자이후)",
            "price": "¥300~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZN62EjgmzWL-A8J0HSNcVcc3QdS7B_WrJGWNjkNZmYXJ4Q9fNVF0XekxHuG5Ls4PEwm3-JkbRilTSM3qDhE70gdsJVwnT1V6zmBLMu9cEot_Hv8U1zM4PwOtxUFntmB0IbJ9yLsbzOYdj_X=s4800-w1200"
        },
        {
            "id": "fukuoka-category-4-fukuoka-city-museum",
            "city": "fukuoka",
            "slug": "fukuoka-city-museum",
            "category": "박물관/문화시설",
            "area": "하카타",
            "name": "후쿠오카시 박물관",
            "price": "¥200~¥1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHipQQ0RgwJIBlFnLZdeavy1UjfsyO0IE1UaPyHC909G5HnkmMbyb5_S7AoZ9FCKSAooV1kboDgBXBHNre79N-S5TOa_IQNee4=s4800-w1120"
        }
    ],
    "역사": [
        {
            "id": "osaka-category-1-osaka-castle",
            "city": "osaka",
            "slug": "osaka-castle",
            "category": "역사",
            "area": "오사카성 주변",
            "name": "오사카성 (Osaka Castle)",
            "price": "¥600~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOM9J40W7jRMItQedVYLOoFHRx1zUnUl7c2p-3AseX5lcH6nTsQ41syXgtaQrZmJxi9hV4xkV5GM9HvjuZcb4vjDG3K5LwgKo2x3u7A-iOw2BxQ2gZBZkM5SzF9AR4PO-zOrxrUOo32Kc8JKYFScpJmZg=s4800-w1200"
        },
        {
            "id": "osaka-category-1-shitennoji",
            "city": "osaka",
            "slug": "shitennoji",
            "category": "역사",
            "area": "텐노지",
            "name": "시텐노지 (Shitennoji Temple)",
            "price": "¥300~",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNhlm4X0FwdiBfIDiuPCrpHCe1zC7KohUgS_BqkqtUodQ4PfnIWDmpabIPf3gXUbv9QKTpg18Nk-wULEO3IZ6A2rPQ32Rx_9yPiPhUqwwiTfHCFUy0g6T71-1K8o0doDnOiXI2WgUSxFnEU=s4800-w1200"
        },
        {
            "id": "osaka-category-1-sumiyoshi-taisha",
            "city": "osaka",
            "slug": "sumiyoshi-taisha",
            "category": "역사",
            "area": "스미요시",
            "name": "스미요시타이샤 (Sumiyoshi Taisha)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPPPl1MJBybo4l1bhAw5K1r6phOccXiLE8geMbXOoPWXVn3q9YwPAX58wSv1hKHE0Gz1lI5tB5-to-qRCTb5HDZsHlIX1lGsfxsND9F8LIq5EXB_2re5Eg-7b59ruLTFQqDzJhDvKNRs-uB-CY=s4800-w1200"
        }
    ],
    "소도시": [
        {
            "id": "osaka-category-3-nara-park",
            "city": "osaka",
            "slug": "nara-park",
            "category": "소도시",
            "area": "나라",
            "name": "나라 공원·도다이지 (Nara Park / Todaiji)",
            "price": "¥500~1,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOTHJV-Tvq5iJdWB0N7mJkHKLlzNTsxR6ugLA3O2Cd24K4EPrHjC1syeqJjGqBAbLiO2GwmiFSBoZ89wPn84qumMD9fT5a1ZI8KASZAh8J2D_Krjl_l0gVaQYW74-PcKHnNWCiJOwQ4zaqALUGUBT3D8A=s4800-w1200"
        },
        {
            "id": "osaka-category-3-fushimi-inari",
            "city": "osaka",
            "slug": "fushimi-inari",
            "category": "소도시",
            "area": "교토",
            "name": "후시미 이나리 타이샤 (Fushimi Inari, 교토)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMcaQ55NX_nq6ODF4oPodM-2oOfsJWQgDnc2DnW5LDOT2YTUTSpgLzng-PLJ9QlUBaoWRRx7dquNiW73h7kCF-hQsevFhFok66gMNfKv6KF4J40YJ_0jDi0AXSdlVu1uEEWg9Q3SQCffpmQWQ=s4800-w1200"
        },
        {
            "id": "osaka-category-3-kobe-harborland",
            "city": "osaka",
            "slug": "kobe-harborland",
            "category": "소도시",
            "area": "고베",
            "name": "고베 하버랜드 (Kobe Harborland)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOYBF_eyRQq2_eyHgJNtT5VvCT_tGYcOaKjUCvJTt0eBV9lDPMzGsAzbLSZAef4owRBGCKHQ_A95S64ZiCrsrhxPEMTHnG4XsZzn2udMxQaO6bBAwIImPDNSvl4Z0Hc5GgGVE9psd1sbm5-5ko=s4800-w1200"
        }
    ],
    "자연·공원": [
        {
            "id": "osaka-category-4-minoo-park",
            "city": "osaka",
            "slug": "minoo-park",
            "category": "자연·공원",
            "area": "미노오",
            "name": "미노오 공원 (Minoo Park)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZO4d7A4e74ISEZkW3ImhO0M3ySTaZMwB-EYiuqN-CDp1_bgypvg4oiLmd8lSzrJ_-IgMbTUGlWBcm3WGbtVAs0Q7AQkYmuWrtihtaqJCo54RRB42rn-GMSg-hQ-T48Td-M45LnUBjmvdTAdrd8=s4800-w1200"
        },
        {
            "id": "osaka-category-4-banpaku-commemorative-park",
            "city": "osaka",
            "slug": "banpaku-commemorative-park",
            "category": "자연·공원",
            "area": "스이타",
            "name": "만국 박람회 기념공원 (Expo '70 Commemorative Park)",
            "price": "무료~¥250",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMqjCDfYvkC180lC3k43UvqVrQ98DjFqdOfC_0z7OVwIoEzyF-uIg4jRLyFSX5wzYJqcvL1BUTVSnDohbB5BH6BXli-GCIcHkIQ_kft5o5K7ohj18ugnJRn_A9X-Z8XXRFwIdT8evKdo6MmBDg=s4800-w1200"
        },
        {
            "id": "osaka-category-4-nakanoshima-rose-garden",
            "city": "osaka",
            "slug": "nakanoshima-rose-garden",
            "category": "자연·공원",
            "area": "나카노시마",
            "name": "나카노시마 장미정원 (Nakanoshima Rose Garden)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPBaqoZ2DNhHy2TCkJfyAesEE9F7h34WCMtsfKvQcQAR-gfb8OXnC0PhxLcgQYavaV6mLty7gCDBBwo5MvFph0nDmW3m7wZN0GAvqX47g4HI2z_slXaemQOF5joQurHgsBjbImpKT3J428knA=s4800-w1200"
        }
    ],
    "도심 전망·스카이라인": [
        {
            "id": "taipei-category-1-elephant-mountain",
            "city": "taipei",
            "slug": "elephant-mountain",
            "category": "도심 전망·스카이라인",
            "area": "신이구(등산로 접근)",
            "name": "상산(象山) 전망대",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP_scnm-qn2sIKd6jBZ9yhBe8zFooFU3m4q_qwxpW-SIRtaQsIcA7LLL0AYxjB8Vrbg7bQiGcRTKMkOXqsKzukEX3lOIK3mCc8-nfpCJiOx47HUqBQcaj617u_FETgDcKLd_6jCtVwa8RFD=s4800-w1200"
        },
        {
            "id": "taipei-category-1-taipei-101-observatory",
            "city": "taipei",
            "slug": "taipei-101-observatory",
            "category": "도심 전망·스카이라인",
            "area": "신이구",
            "name": "타이베이 101 전망대",
            "price": "NT$ 600~1500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP-sJSZQIMJKVurgkldvGoSmiq_-_YwjU0Wzp5_SzkcQa_so1xKH-oQx866ao_JmqGM590-Q5i8XUBMC68GT6cKa_hiVatnADJs5zYncvtZdN19PuSCQED3Nmx_DzL4It9jJ17w1NDcfZUBSVA=s4800-w1200"
        },
        {
            "id": "taipei-category-1-dadaocheng-wharf",
            "city": "taipei",
            "slug": "dadaocheng-wharf",
            "category": "도심 전망·스카이라인",
            "area": "다다오청/대동구",
            "name": "다다오청 부두(大稻埕碼頭) - 강변 산책",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZO0lc_VC1VUQ86UlwmrhfJGLzxDCxx1g0TXX57HqP8BtTskXCPcfNdw95mzXjkrPybhYv_rmP4u0P5U3gFBX68C_Nkq4VHnrqtbPs9oeg851hnHyCGQEM4eipachJaBXNVYDrZX5QLifauw69s=s4800-w1200"
        }
    ],
    "역사·사찰·박물관": [
        {
            "id": "taipei-category-2-longshan-temple",
            "city": "taipei",
            "slug": "longshan-temple",
            "category": "역사·사찰·박물관",
            "area": "완화구",
            "name": "룽산사(龍山寺)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPjIYQIfhABLEK03xrQmiV2xUL4fz2Ji6IoXDEn7pBjyR8yQvG05FM7A87AncDsvvdWb2FqNj0Zq1CwK2IzvpXSwkMHah629kGzXvSw050X8VsFGb5Q4M6KW4yoSMUp2Bt12CpgvCrExCJaLmQ=s4800-w1200"
        },
        {
            "id": "taipei-category-2-chiang-kai-shek-memorial-hall",
            "city": "taipei",
            "slug": "chiang-kai-shek-memorial-hall",
            "category": "역사·사찰·박물관",
            "area": "중정구",
            "name": "중정기념당 (中正紀念堂)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP35UHwM2Xp_bWdOLGMIGUrC5jYY9Jx52yFMpumznVD05XE1t9tSPjGKyBS4pBAsGggyKfvL5V8EBm1J1YQ8JqPSU-s_3NSeZwUQ71HB5qVNOm2OFRKczEkVo64o68u8qq2DneqPdWkvgeR0UylfzOuCQ=s4800-w1200"
        },
        {
            "id": "taipei-category-2-national-palace-museum",
            "city": "taipei",
            "slug": "national-palace-museum",
            "category": "역사·사찰·박물관",
            "area": "북부/베이토우 인근",
            "name": "국립고궁박물관 (National Palace Museum)",
            "price": "NT$ 250~350",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMrKv-NAUoAdf3N5LZX7g2TH6jysvaDiObSs4cuKu7wqmnpW_YNUmesYzcRI71sBWhoOY73rcQC7F1hULvIZcq-EkR7TqhJcDagY7sDele-SzzJ8s2-4p6WBpeJ5pl6MkzMhHoZppc94U9XFg=s4800-w1200"
        }
    ],
    "근교 자연·온천": [
        {
            "id": "taipei-category-3-beitou-hot-springs",
            "city": "taipei",
            "slug": "beitou-hot-springs",
            "category": "근교 자연·온천",
            "area": "베이토우구",
            "name": "베이터우 온천(北投溫泉) 지역",
            "price": "NT$ 0~1500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOsVl9nnD80VBw3xLMcUUrbVgt69Vj2jd0d2gu_VmIb6ohJGigLl5vp6syBs6WqPQkbOpvxtRkURv7yh2uH3mNYPRlJCPV0pxlTVzMCd8K6DsVMpXY15m9AB7_Xov6VL-oP1XnqGeYSGpaeMA=s4800-w1200"
        },
        {
            "id": "taipei-category-3-yangmingshan",
            "city": "taipei",
            "slug": "yangmingshan",
            "category": "근교 자연·온천",
            "area": "양명산 국립공원 인근",
            "name": "양명산 국립공원 (陽明山)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZMtULJbFH2X7h3MGx2fbJh0UEBij2KbUs07UZtJBJR2GyHM2c16tFxUgZdnspRsOSMnsz6qDqQhopwZXWivAowGexQSs7WQh4m2XzL5QKlxLyhoS-VzeRYwacfIhFUYoMwf3l27RVJxq66NPro=s4800-w1200"
        },
        {
            "id": "taipei-category-3-jiufen-day-trip",
            "city": "taipei",
            "slug": "jiufen-day-trip",
            "category": "근교 자연·온천",
            "area": "루이팡 구(근교)",
            "name": "지우펀(九份) - 근교 소도시",
            "price": "NT$ 0~500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOfvL_SrZZs4xdAn3RhMfGwQbUnUMMQrFP64PeHlfSsyjAma1co2nKqKS_5yLSUjWmlON53GlcrxzXOQ6Gg4EBnZwA7CLkue6gizaRglLWVyiEBKRuTGK1Dp4yAdogV2R6QRI_rVktWbPIh86Y=s4800-w1200"
        }
    ],
    "창조문화·예술·시장": [
        {
            "id": "taipei-category-4-huashan-1914-creative-park",
            "city": "taipei",
            "slug": "huashan-1914-creative-park",
            "category": "창조문화·예술·시장",
            "area": "중정구",
            "name": "화산1914창작문화원구 (Huashan 1914)",
            "price": "무료~NT$200(전시별)",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPBmcdec3RSCF6BOoIHH3vhkSDxpH752w3-id363kvea_tpMqWf3h8nw4_kD2790E3zFJRceQ0viQ99sgMUPCWf9zpMpiA0DlHzgj-D2I7bjZEDdOcVDgu0xIIQjyEeMYKINFCfUm84JO3MoLU=s4800-w1200"
        },
        {
            "id": "taipei-category-4-songshan-cultural-park",
            "city": "taipei",
            "slug": "songshan-cultural-park",
            "category": "창조문화·예술·시장",
            "area": "송산구",
            "name": "송산창의문화園區 (Songshan Cultural and Creative Park)",
            "price": "무료~NT$200(전시별)",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNY-AwQz8beKBibsd758sitO5Nnr05OOKGO6LOjjR8O0Wkjc5-0y_7BClrhCPjQ9qkF9XTQ4SRzc5CJ-0hhTAz8SseVfREeXFi-fDZO3870J_RHb68J7XTsFBDyf94ASuwt-Mrwf6_tjGJDkao=s4800-w1200"
        },
        {
            "id": "taipei-category-4-bopiliao-old-street",
            "city": "taipei",
            "slug": "bopiliao-old-street",
            "category": "창조문화·예술·시장",
            "area": "완화구",
            "name": "보피랴오 옛거리 (剝皮寮歷史街區)",
            "price": "무료",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqE0uxuK9EoOj_Dpo7yPkGL4hyhmIYZnmogy7OetUzPxl-NEFXkwuyydqL_PtGszxafYuZ35SKVgsBPFLrpAybZRi_ropDdUqME=s4800-w1200"
        }
    ]
};

export const generatedStayPlaceCardsByCategory: CardsByCategory = {
    "럭셔리 호텔": [
        {
            "id": "bangkok-category-1-mandarin-oriental-bangkok",
            "city": "bangkok",
            "slug": "mandarin-oriental-bangkok",
            "category": "럭셔리 호텔",
            "area": "차오프라야 리버사이드",
            "name": "Mandarin Oriental Bangkok (만다린 오리엔탈)",
            "price": "฿10,000~30,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFnT7XMj6SLV73IMpKvZpLA2Q2363kF-EI1smg2A_eMZAuXWYF9jegj7d_6cRuXhzBarT9aYSUvHZMU1KKcp-6azeFQek5qufk=s4800-w1200"
        },
        {
            "id": "bangkok-category-1-the-siam-bangkok",
            "city": "bangkok",
            "slug": "the-siam-bangkok",
            "category": "럭셔리 호텔",
            "area": "차오프라야 리버사이드",
            "name": "The Siam (더 시암)",
            "price": "฿12,000~40,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGuT0eQNVrawOPdMZpFIENDRVGAhhEGuL5SY4N58y-A-KOKRM1ioYDEn4b6mJfcTYbtEbZ7DBWECC32NfmSX_vC7BnkgB4b_nY=s4800-w1200"
        },
        {
            "id": "bangkok-category-1-banyan-tree-bangkok",
            "city": "bangkok",
            "slug": "banyan-tree-bangkok",
            "category": "럭셔리 호텔",
            "area": "사톤",
            "name": "Banyan Tree Bangkok (베니언 트리)",
            "price": "฿6,000~18,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFb01Tplh1myMrxK-INoIYiql26m7DzB1UjBlpJczo2QAq_sf9vTs3sL80N9RNtaIDzbYKrQQda4iuJ_zSrbZFVORnvmlyMsfo=s4800-w1200"
        }
    ],
    "비즈니스/중급 호텔": [
        {
            "id": "bangkok-category-2-novotel-bangkok-siam-square",
            "city": "bangkok",
            "slug": "novotel-bangkok-siam-square",
            "category": "비즈니스/중급 호텔",
            "area": "시암",
            "name": "Novotel Bangkok on Siam Square (노보텔 시암 스퀘어)",
            "price": "฿2,500~5,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHVQE0eN9Cac7K4mXbvD4TGz2vS8SVWSYoK4XrHqftkKumpWaF7fwYh5aPbTla7DGeb-zLZDCNyzh4AeY6tOhchvXs4NndnhGE=s4800-w1200"
        },
        {
            "id": "bangkok-category-2-eastin-grand-sathorn",
            "city": "bangkok",
            "slug": "eastin-grand-sathorn",
            "category": "비즈니스/중급 호텔",
            "area": "사톤",
            "name": "Eastin Grand Sathorn (이슨 그랜드 사톤)",
            "price": "฿1,800~4,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEPzMwGF4cm9I237J_MPi3qiDIDguXObKAjLdLVAfs6njZyFPogRI5wtIJ1F4Wy_KtZA74xQ_WU2Cvnsg9kYy4D4XDGIE6MyCs=s4800-w1200"
        },
        {
            "id": "bangkok-category-2-amari-watergate-bangkok",
            "city": "bangkok",
            "slug": "amari-watergate-bangkok",
            "category": "비즈니스/중급 호텔",
            "area": "프라툼완",
            "name": "Amari Watergate Bangkok (아마리 워터게이트)",
            "price": "฿2,000~5,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFzh1mLtRm_LmdMc2Yx4MmqyJqs5D5r3lp6PNuJVTN44NN9vrRIyQ0-DyvVdmv_qWBLG9zAN6exbiA69gorgYkXuxT5uvGOsOE=s4800-w1024"
        }
    ],
    "호스텔": [
        {
            "id": "bangkok-hostel-nappark-hostel",
            "city": "bangkok",
            "slug": "nappark-hostel",
            "category": "호스텔",
            "area": "카오산 로드/구 시가지",
            "name": "NapPark Hostel (냅파크 호스텔)",
            "price": "฿200~800",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP8QjBqbpbi5oo8j6H_ebGFGKRzE6DANv907dql1W4O6klP1DZVBgKYpWyXd30kcB-RCOV5KmVlM6HKELxVx4WN-PZgNazrHhA9t9i6Tc7mlwflrXV3ORoi6eu_haDcu8qwiaodL1iVBLvLpQ=s4800-w1200"
        },
        {
            "id": "bangkok-hostel-the-yard-hostel",
            "city": "bangkok",
            "slug": "the-yard-hostel",
            "category": "호스텔",
            "area": "아리",
            "name": "The Yard Hostel (더 야드 호스텔)",
            "price": "฿250~900",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGNTwjh5Zf8jCAK6UTluj9zC7p669AoeX4Nc9KB3RTKrUvxvQZwqAAOi2O5NLSt2cfkdKp2X6vkBaEZnMmL6UQUmiECc4aIzHk=s4800-w1200"
        },
        {
            "id": "bangkok-hostel-lub-d-bangkok-siam",
            "city": "bangkok",
            "slug": "lub-d-bangkok-siam",
            "category": "호스텔",
            "area": "시암",
            "name": "Lub d Bangkok Siam (럽디 시암)",
            "price": "฿300~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHdJ7Z8ZmTsoRoE7XssI-5RhJeFgd6oXG2cHR40zwBVMzX7BUAtL6ab8v2x0be8cxeLWHAmYbdZ8FR1sFmpQqDumeS0VLWhguA=s4800-w1200"
        },
        {
            "id": "fukuoka-hostel-the-millennials-fukuoka",
            "city": "fukuoka",
            "slug": "the-millennials-fukuoka",
            "category": "호스텔",
            "area": "텐진",
            "name": "더 밀레니얼스 후쿠오카(카우치/공유형 숙소)",
            "price": "¥2,500~¥8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFjPt9QgUrR5V_iT8GzNCXTibEJsSDG9GoThH7ZYogbP8Q2Q1j-5czE90OL1LMynVDuxKlzF2E9bgWgJjhEpWvMcxZGsIjuTWs=s4800-w1074"
        },
        {
            "id": "fukuoka-hostel-guest-house-hakata",
            "city": "fukuoka",
            "slug": "guest-house-hakata",
            "category": "호스텔",
            "area": "하카타",
            "name": "게스트하우스 하카타(지역 게스트하우스)",
            "price": "¥2,000~¥6,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPV5Cvh_LI34FlQecW8MKjNGC29Cy1_Sf7TFvEgEfG7LZPMwHhoifvJDGC8cRBhC-73BMXH1HyNTJgy2sWbFNIvO5HM8LpQFa32To31lkxcvldHc3MZeAung_FJOUMj38zEUjSKLxHIOM9R=s4800-w1200"
        },
        {
            "id": "fukuoka-hostel-hostel-hakatabed",
            "city": "fukuoka",
            "slug": "hostel-hakatabed",
            "category": "호스텔",
            "area": "텐진/하카타",
            "name": "호스텔 하카타베드(지역 추천 호스텔)",
            "price": "¥2,000~¥5,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFCpEvy6r7mFfUJy1S5t0lhWEi0i0IjwmhG8O7YjpE4I_hFSM0GSq6gzYkPoJqRUUaG5rPXa4-bi3yk3LXuesbczv1354Ipdjk=s4800-w1200"
        },
        {
            "id": "osaka-hostel-hostel-64-osaka",
            "city": "osaka",
            "slug": "hostel-64-osaka",
            "category": "호스텔",
            "area": "신사이바시/난바",
            "name": "Hostel 64 Osaka",
            "price": "¥2,500~6,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFWyLkpOdoXdVpl0HR5HRtDbTPgohf85fEhVySPp4BLvbZap3-vZkdU2gtNjVg5_hEBFMRSQDSTA9-80UBL-uCOni22ilnY4oI=s4800-w1200"
        },
        {
            "id": "osaka-hostel-j-hoppers-osaka",
            "city": "osaka",
            "slug": "j-hoppers-osaka",
            "category": "호스텔",
            "area": "텐노지/신세카이",
            "name": "J-Hoppers Osaka Guesthouse",
            "price": "¥2,000~6,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFpW97VZmQEyW05BJBv7dybQZhE3XJc0UgJ0PG9fvSUwaflOHoMK35_jfP0-CN5DTCtUFBARBMdD1PXdq0symzoNdLUPLkDZ_E=s4800-w1200"
        },
        {
            "id": "osaka-hostel-osaka-guesthouse-nest",
            "city": "osaka",
            "slug": "osaka-guesthouse-nest",
            "category": "호스텔",
            "area": "난바",
            "name": "Osaka Guesthouse Nest",
            "price": "¥2,000~5,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEcMMr52f4OzFeTLsVhMJkLI-UoOQgMpb_FL6Z1cQWaMzDEJZD_mE0DEPdWWw5JB3IjHqpRNVZFkiuhTz4GhNQnL-a2lKSsQt4=s4800-w1200"
        }
    ],
    "서비스드 아파트": [
        {
            "id": "bangkok-category-4-ascott-sathorn-bangkok",
            "city": "bangkok",
            "slug": "ascott-sathorn-bangkok",
            "category": "서비스드 아파트",
            "area": "사톤",
            "name": "Ascott Sathorn Bangkok (애스콧 사톤)",
            "price": "฿3,000~8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHYT-0le0keq8f2riE_eSYZ4F1LMleHghMWMGQSW98bjg7y-3CX_IAdGnatDK9DDaZGoyeKvGsOZOwfFFsSaE_mNadWF7RqgDE=s4800-w1200"
        },
        {
            "id": "bangkok-category-4-somerset-vista-bangkok",
            "city": "bangkok",
            "slug": "somerset-vista-bangkok",
            "category": "서비스드 아파트",
            "area": "수쿰윗",
            "name": "Somerset Vista Bangkok (썸머셋 비스타)",
            "price": "฿2,500~6,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHJHQd_Jc395BRN9LBbXhv8YNvIvDm0gH_pX12Jw3g4zOlrFo_zqSw6lionYshCrZ75PkFharXDb8Vus2-xB76N2frx6KbXKaM=s4800-w1200"
        },
        {
            "id": "bangkok-category-4-oakwood-premier-bangkok",
            "city": "bangkok",
            "slug": "oakwood-premier-bangkok",
            "category": "서비스드 아파트",
            "area": "프롬퐁/수쿰윗",
            "name": "Oakwood Premier (오크우드 프리미어)",
            "price": "฿3,000~8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEW61v4JB7zu--_SoAcDu_1wiPMu_COFskWg3wZoQDZxyuI3WJQzo3diQhVRqT2ZdmJdcTh66q2Fr4QoL8mnQBgPTjoEJqQ1Dw=s4800-w1200"
        }
    ],
    "호텔": [
        {
            "id": "fukuoka-hotel-grand-hyatt-fukuoka",
            "city": "fukuoka",
            "slug": "grand-hyatt-fukuoka",
            "category": "호텔",
            "area": "하카타/캐널시티 인근",
            "name": "그랜드 하얏트 후쿠오카",
            "price": "¥15,000~¥40,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqErsVWS8YfrFWpf3NS1ZU6iFoRhmU72cfm9wvXxIzBiXmZiTX0GjMlYzXy5Z0IeU7kLstFlRxwPqevDkzl_1af-7rEVHjeZz8s=s4800-w1200"
        },
        {
            "id": "fukuoka-hotel-hotel-okura-fukuoka",
            "city": "fukuoka",
            "slug": "hotel-okura-fukuoka",
            "category": "호텔",
            "area": "텐진",
            "name": "호텔 오쿠라 후쿠오카",
            "price": "¥12,000~¥35,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEZIp09y9cyKtShoB9Lh5RXIYgoQs1fxkkJs0KJFiFX4VWVDo_ky1YHlNwr0JoDT0o3Eg2FTejttXBAhCTmzs5OJrsoloBX4B4=s4800-w800"
        },
        {
            "id": "fukuoka-hotel-hotel-nikko-fukuoka",
            "city": "fukuoka",
            "slug": "hotel-nikko-fukuoka",
            "category": "호텔",
            "area": "하카타",
            "name": "호텔 닛코 후쿠오카",
            "price": "¥10,000~¥30,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFRvzYmVfkhtyb1Uob_3c7CFrVJs90am3v7BG7ekW58L90pmULrn4OPxFAiKnmZpgNKZ0yv7LN8jJrxvCRUYm8Tmq_xy2w8DBc=s4800-w1200"
        },
        {
            "id": "osaka-hotel-swissotel-nankai",
            "city": "osaka",
            "slug": "swissotel-nankai",
            "category": "호텔",
            "area": "난바",
            "name": "Swissôtel Nankai Osaka",
            "price": "¥15,000~40,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZPp1sahMhqnktIA6fvGqPPcmF38CEx2Eencc1pKa5fFSdOtEVvbv8zOMtJDpSsY9Y9-VB3Yb0t9bVEHMfIQTpV5Ac6o6fnF3ApF8Z4SiHqDuIeG1n69v79yrYaIv4D_BCU-slLJGDbG-oUIfQ=s4800-w1200"
        },
        {
            "id": "osaka-hotel-hotel-nikko-osaka",
            "city": "osaka",
            "slug": "hotel-nikko-osaka",
            "category": "호텔",
            "area": "신사이바시/도톤보리",
            "name": "Hotel Nikko Osaka",
            "price": "¥10,000~30,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqF_AWB8Y57CqY39wWf3N59BVTkkFauQ0mw81GXH6S6sBXViIYHQ-HrKzpioNRSKjrdTQ0g0JMEr9oWXjcPoHbFa98mkvsj-Vg=s4800-w1200"
        },
        {
            "id": "osaka-hotel-osaka-marriott-miyako",
            "city": "osaka",
            "slug": "osaka-marriott-miyako",
            "category": "호텔",
            "area": "아베노하루카스",
            "name": "Osaka Marriott Miyako Hotel",
            "price": "¥20,000~50,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHi_vwSnVrDow6I60JALP_ecALUnhJa-4qVo7OPvA2RoxawzvctQRSWlAb3Ykq9I63d7Vn-NlfpfO82fo-4K9Ye6ttRGOT1IBk=s4800-w480"
        },
        {
            "id": "taipei-hotel-w-taipei",
            "city": "taipei",
            "slug": "w-taipei",
            "category": "호텔",
            "area": "신이구",
            "name": "W 타이베이",
            "price": "NT$ 6,000~20,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHMkk1_7lgLXcQh534qwwO3yv6EDdvcqK2Yu0_aFXYdba-fAcYTfHLe1H2P5VAKj7mjSUOeuop2tRSXkRaG5-nCIaqy0hNkbek=s4800-w480"
        },
        {
            "id": "taipei-hotel-grand-hyatt-taipei",
            "city": "taipei",
            "slug": "grand-hyatt-taipei",
            "category": "호텔",
            "area": "신이구",
            "name": "그랜드 하얏트 타이베이",
            "price": "NT$ 6,000~18,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHSH3tH-jZJ5-bAX_LY6CGNjxn7Z5HwaFbfXzjrSuhzU00dmTivLirxucro7Qk84J7KLcV32MQC52FqDCLTj8ZI8iAvNrtL0-8=s4800-w1200"
        },
        {
            "id": "taipei-hotel-palais-de-chine-hotel",
            "city": "taipei",
            "slug": "palais-de-chine-hotel",
            "category": "호텔",
            "area": "중정구",
            "name": "팔레 드 차인 호텔 (Palais de Chine)",
            "price": "NT$ 4,000~12,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEh-gR6kDxfmu_5Z-dmnKx_QMrMiyJpV5Aoe4mzEZvkPRU_U1QeRp8ss1XD5X_uzBmFZWaR3mv7Y2DIOEmiIEL0vixn6fKM8Lg=s4800-w1200"
        }
    ],
    "료칸/전통숙소": [
        {
            "id": "fukuoka-category-3-miyako-ryokan",
            "city": "fukuoka",
            "slug": "miyako-ryokan",
            "category": "료칸/전통숙소",
            "area": "다자이후/근교",
            "name": "전통 료칸(다자이후 근교 추천 숙소)",
            "price": "¥12,000~¥30,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGEIL7kLBqbtnog8849_j7p7UR00OB4nKJitC7CBe1B2RubCdWZWKsi2hL4DTNWODfdp2rYsF-tbsB6TQvyQKkGJZdzwrP8XBw=s4800-w1200"
        },
        {
            "id": "fukuoka-category-3-urban-ryokan",
            "city": "fukuoka",
            "slug": "urban-ryokan",
            "category": "료칸/전통숙소",
            "area": "하카타/텐진 근교",
            "name": "도심형 료칸 스타일 숙소(전통체험 가능)",
            "price": "¥8,000~¥25,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOAa-q9CAdOOVmZlL9iW60pqNWH8j5m-QCeLaO_BBHx48Tee19_3qwKvjFC5OsNzktDTRX756VFzx-mFQxVfUP3JePLRFXDH6EhvsdeP_AVYYcuZUzsBD6Ey-Q4szzy0omtJzNPjYc-k4MdgA=s4800-w1200"
        },
        {
            "id": "fukuoka-category-3-yokan-inn",
            "city": "fukuoka",
            "slug": "yokan-inn",
            "category": "료칸/전통숙소",
            "area": "근교(이토시마 등)",
            "name": "온천·전통숙소(근교 추천 여관)",
            "price": "¥10,000~¥28,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHQCr0b6T-MnHucJabbmrD0PH9Io1crTvmZp6TaV3fD2LygHRPZDwQ6opbLpRmrFycrvXNXrONaShPSDJ2ZQiJj_i0dvCGWBX0=s4800-w1200"
        }
    ],
    "캡슐": [
        {
            "id": "fukuoka-capsule-budget-first-cabin-hakata",
            "city": "fukuoka",
            "slug": "first-cabin-hakata",
            "category": "캡슐",
            "area": "하카타",
            "name": "퍼스트 캐빈 하카타(캐빈형 저가 숙박)",
            "price": "¥3,000~¥8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEnLOsPlzhGQoQZo2HFSTIhu187E_KUSQJ9qgcLDz3tt40qfhl7vTD5h7ajUUtp8kc8eJI6NG7YZkpxcfIB35BraDGAyg4rcyg=s4800-w1199"
        },
        {
            "id": "fukuoka-capsule-budget-anshin-oyado-hakata",
            "city": "fukuoka",
            "slug": "anshin-oyado-hakata",
            "category": "캡슐",
            "area": "하카타/텐진",
            "name": "안신 오야도(캡슐 호텔 체인, 하카타 지점)",
            "price": "¥2,500~¥6,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOMCZkiOwTbR63cLCVFDF_SrZjPv2KPHRXIaXmCmqLbDRBMzPiwwHV834PoOl7yxF9GobLw62hSvqxt0klEyXRl2i-KB_QL11TFXmqCPSdSmKepbz7WavqCs8tEvGoxNQ3huK5IkibfD9xbxHo=s4800-w1200"
        },
        {
            "id": "fukuoka-capsule-budget-the-millennials-capsule",
            "city": "fukuoka",
            "slug": "the-millennials-capsule",
            "category": "캡슐",
            "area": "텐진",
            "name": "더 밀레니얼스(캡슐/공유형 룸 옵션)",
            "price": "¥3,000~¥9,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFjPt9QgUrR5V_iT8GzNCXTibEJsSDG9GoThH7ZYogbP8Q2Q1j-5czE90OL1LMynVDuxKlzF2E9bgWgJjhEpWvMcxZGsIjuTWs=s4800-w1074"
        },
        {
            "id": "osaka-category-4-nine-hours-namba",
            "city": "osaka",
            "slug": "nine-hours-namba",
            "category": "캡슐",
            "area": "난바",
            "name": "nine hours Namba (캡슐)",
            "price": "¥3,000~6,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNtAtKe85NORA8z9XDsN0r_OR7lfjem747FXadxbdSu3zPJBD7dk2vDBtI2R8t1oDFK_VsaAArzv8yrnPr_208WNn1eUPfEwkH5OlRXKsEuf-fv-rC8xu_eh-i84tCd1Dz9hVY502aZlwYy=s4800-w1200"
        },
        {
            "id": "osaka-category-4-anshin-oyado-premier-shinsaibashi",
            "city": "osaka",
            "slug": "anshin-oyado-premier-shinsaibashi",
            "category": "캡슐",
            "area": "신사이바시",
            "name": "Anshin Oyado Premier (캡슐/사우나 포함)",
            "price": "¥3,000~8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqG1tqYAHBBy1QxhULSBrAoB8r99iKZfNQZ2-XX_xA81f09DbZ9jo0qWb46bXAzE1t48gbB6Ep0cbGXDLGGCX4Nz-PhGCTc5J48=s4800-w1200"
        },
        {
            "id": "osaka-category-4-first-cabin-hanshin-umeda",
            "city": "osaka",
            "slug": "first-cabin-hanshin-umeda",
            "category": "캡슐",
            "area": "우메다",
            "name": "First Cabin Hanshin (캐빈 스타일)",
            "price": "¥4,000~8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqFH05B_qkDNJTSZ4Wei2FXNr79Ayzvgb2mnO7oR_dFCYiK2Tw884yMcarSFkMdKtyTRvUbQDEgCOBs3cMYTRXXhCJddgTGrjg0=s4800-w1200"
        }
    ],
    "료칸": [
        {
            "id": "osaka-category-3-yamatoya-honten",
            "city": "osaka",
            "slug": "yamatoya-honten",
            "category": "료칸",
            "area": "난바",
            "name": "야마토야 혼텐 (Yamatoya Honten)",
            "price": "¥8,000~20,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEh8Ao8xpg-rVRG3oSy2vKnhFetxqFnBwyxyrca4wVz-GjRrlduXk8A0RdL0wi2Zvr37TMixZDVquCqJbjv394_cxaEaj2VfmY=s4800-w1200"
        },
        {
            "id": "osaka-category-3-mimaru-osaka",
            "city": "osaka",
            "slug": "mimaru-osaka",
            "category": "료칸",
            "area": "난바/우메다",
            "name": "MIMARU Osaka (아파트형 숙소)",
            "price": "¥8,000~30,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEA9dhmhviUeg-4aP_ueQEs3tkH40v9F4vToGwCpJb1NdZTdMjc35I78YwGzDYyXwFUzNlLrkHI41ZEBPdIGNGN5ubUo2HvFGA=s4800-w1200"
        },
        {
            "id": "osaka-category-3-traditional-inn-osaka",
            "city": "osaka",
            "slug": "traditional-inn-osaka",
            "category": "료칸",
            "area": "혼마치/난바",
            "name": "도심 내 전통 여관(예시)",
            "price": "¥7,000~18,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHgFV3mJii5qYaU_FNrJMkCiG-fEKJuLqH1SZNR_kU8JEqJiBrSyjA1W9iTfojQv-a-7nDHrHN-AJdWSika3G8gqrWJVN-95DU=s4800-w1200"
        }
    ],
    "부티크 / 디자인 호텔": [
        {
            "id": "taipei-category-2-amba-ximending",
            "city": "taipei",
            "slug": "amba-ximending",
            "category": "부티크 / 디자인 호텔",
            "area": "시먼딩",
            "name": "암바 타이베이 시먼딩 (amba Ximending)",
            "price": "NT$ 2,500~6,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGkKMscqFs8-8lXqNEj97QG5cyA8UOAx0NfCb0LTL6ZV79ndUtOs7YdxNHVQvFyVMcUeRi5Crwn-Lh79PYJX9tHk8OovXzZj1o=s4800-w1200"
        },
        {
            "id": "taipei-category-2-hotel-proverbs-taipei",
            "city": "taipei",
            "slug": "hotel-proverbs-taipei",
            "category": "부티크 / 디자인 호텔",
            "area": "대안구",
            "name": "호텔 프로버브스 타이베이",
            "price": "NT$ 3,500~9,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqG8w7R6_NPkP8Z-JbWE9-tz6itamoDWHRDfAPsF6kR9zJS9nQoFHIsjYdf-NEfd2Q2fGWFxDPSSw4HmqJmOPulC25dDlYoBrwA=s4800-w1200"
        },
        {
            "id": "taipei-category-2-the-okura-prestige-taipei",
            "city": "taipei",
            "slug": "the-okura-prestige-taipei",
            "category": "부티크 / 디자인 호텔",
            "area": "중산구",
            "name": "오쿠라 프레스티지 타이베이",
            "price": "NT$ 6,000~15,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZP3S_yBVWtlPLTP64e7jZd3Um6rDDeikxNTval5LZMIJp3S2wOqj9bHNfsEchcPMOU9JaaaHZ2MzC0hZFpF8WSpmI9ip8Liemd8Vs08YA02OsgdWxGiey81adxj3aE608MrPTkCo-6NhEsj7hU=s4800-w1200"
        }
    ],
    "호스텔 / 게스트하우스": [
        {
            "id": "taipei-category-3-meander-taipei-hostel",
            "city": "taipei",
            "slug": "meander-taipei-hostel",
            "category": "호스텔 / 게스트하우스",
            "area": "시먼딩",
            "name": "미앤더 타이베이 호스텔",
            "price": "NT$ 400~1,500",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqGAig-LR9Iu7V2HatbYo_Po6yabvmJ1n-BqhRylknM32UqrHqWMOg_OQHcAQTFNZFTFF8zx6VkMHDOZ-3yhRI0XEL6JeDyozI8=s4800-w1200"
        },
        {
            "id": "taipei-category-3-flip-flop-hostel-garden",
            "city": "taipei",
            "slug": "flip-flop-hostel-garden",
            "category": "호스텔 / 게스트하우스",
            "area": "시먼딩",
            "name": "플립플롭 호스텔 - 가든",
            "price": "NT$ 300~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqEJuo_tcmWr-25NwD9HC8fZy01FG2tBmWxIEj5lWHqdDTkXCqysmv3RVdrXDgarB6pFSZPdWRMC_mAWyVGzmUcjL0BVgsLEeNI=s4800-w1200"
        },
        {
            "id": "taipei-category-3-star-hostel-taipei-main-station",
            "city": "taipei",
            "slug": "star-hostel-taipei-main-station",
            "category": "호스텔 / 게스트하우스",
            "area": "중정구",
            "name": "스타 호스텔(타이베이 메인스테이션 근처)",
            "price": "NT$ 300~1,200",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZO0ONnNE1USJhfIGyryYRZQ_OSFV7MF3iYPZVMep2-LzCuQl3tvmZpzz7xm-Wsybb7Oh25m6cFRSTzUhRf2SV84Yg1AMNEIXmmfchGCz3kRYnxKE_yiqwSmd5-w0cxXogPy-WDn-SjmSYmut2w=s4800-w1200"
        }
    ],
    "온천리조트·전통형 숙소 (근교)": [
        {
            "id": "taipei-category-4-grand-view-resort-beitou",
            "city": "taipei",
            "slug": "grand-view-resort-beitou",
            "category": "온천리조트·전통형 숙소 (근교)",
            "area": "베이토우구",
            "name": "그랜드뷰 리조트 베이토우(北投 온천 리조트)",
            "price": "NT$ 6,000~20,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/places/ANXAkqHW386ihuC02OW3nPsmMIeKdBJpRsVQFMCgUCqeaLtF3c7bwfx2cuoJ8Yezm_nmpSVmz7e7OCsGP79Vqj2sVu8zDpbr_FSWVRc=s4800-w1200"
        },
        {
            "id": "taipei-category-4-hotel-royal-beitou",
            "city": "taipei",
            "slug": "hotel-royal-beitou",
            "category": "온천리조트·전통형 숙소 (근교)",
            "area": "베이토우구",
            "name": "호텔 로열 베이토우(온천 호텔)",
            "price": "NT$ 4,000~15,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZNg-LBDd0VzN2u-BhcV_lMSKa4V7tt1tO5rdvwDeqgQF3rXGURlh4P3zEuRqNZdWU5zy8L_FeJv4AubngkB5WichSrlaqGlWQYIPxbbmNM7pWji78bcd62wV4b3dP3JC6DQZSWGhR0eUD4UE7PC_Rhy9Q=s4800-w1200"
        },
        {
            "id": "taipei-category-4-beitou-hot-spring-bnb",
            "city": "taipei",
            "slug": "beitou-hot-spring-bnb",
            "category": "온천리조트·전통형 숙소 (근교)",
            "area": "베이토우구",
            "name": "베이터우 온천 B&B(민박·전통 숙소)",
            "price": "NT$ 2,000~8,000",
            "rating": "-",
            "image": "https://lh3.googleusercontent.com/place-photos/AJRVUZOsVl9nnD80VBw3xLMcUUrbVgt69Vj2jd0d2gu_VmIb6ohJGigLl5vp6syBs6WqPQkbOpvxtRkURv7yh2uH3mNYPRlJCPV0pxlTVzMCd8K6DsVMpXY15m9AB7_Xov6VL-oP1XnqGeYSGpaeMA=s4800-w1200"
        }
    ]
};
